/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.initMaterialsAndTextures();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        // this.prism = new MyPrism(this, 8);
        // this.pyramid = new MyPyramid(this, 5, 1);
        this.treeGroup = new MyTreeGroupPatch(this, 1.5, 0.25, 3, 0.75, this.treeTrunkTexture, this.leavesTexture);
        this.treeRow = new MyTreeRowPatch(this, 1.5, 0.25, 3, 0.75, this.treeTrunkTexture, this.leavesTexture);
        this.house = new MyHouse(this, 3.5,
                                this.brickTexture,
                                this.doorTexture,
                                this.balconyTexture,
                                this.roofTexture,
                                this.houseDetailTexture,
                                this.columnTexture,
                                this.welcomeMatTexture,
                                this.windowTexture);
        this.smallHouse = new MyHouse(this, 2,
                                this.brickTexture,
                                this.doorTexture,
                                this.balconyTexture,
                                this.roofTexture,
                                this.houseDetailTexture,
                                this.columnTexture,
                                this.welcomeMatTexture,
                                this.windowTexture);
        this.hill = new MyVoxelHill(this, 4, 2);
        this.complexTree = new MyComplexTree(this, 1.5, 0.25, 3, 0.75, this.treeTrunkTexture, this.leavesTexture);
        this.floor = new MyQuad(this);
        this.cubeMap = new MyCubeMap(this);
        this.pool = new MyPool(this, 2, this.waterTexture, this.floorTexture);
        this.fireplace = new MyFireplace(this, 0.75, this.fireplaceBaseTexture, this.logTexture, this.floorTexture, this.fireTexture);

        this.initObjectTextCoords();

        //Objects connected to MyInterface
        this.displayNormals = false;
        this.textsEnable = true;

        this.timeOfDay = 0; // indicates if its day or night
        this.times = {'Day': 0, 'Night (Moon)': 1, 'Night (Campfire)': 2};
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        // this.lights[0].disable();
        this.lights[0].enable();
        this.lights[0].setVisible(true);
        this.lights[0].update();

        this.lights[1].setPosition(-2, 3, 2, 1);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[1].disable();
        this.lights[1].setVisible(false);
        this.lights[1].update();

        // sunlight
        this.lights[2].setPosition(0, 15, 0, 1);
        this.lights[2].setDiffuse(1.0, 0.8, 0.7, 1.0);
        this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[2].enable();
        this.lights[2].setVisible(false);
        this.lights[2].update();

        // moonlight
        this.lights[3].setPosition(0, 15, 0, 1);
        this.lights[3].setDiffuse(0.2, 0.2, 0.2, 1.0);
        this.lights[3].setSpecular(0.8, 0.8, 0.8, 1.0);
        this.lights[3].setConstantAttenuation(0.3);
        this.lights[3].disable();
        this.lights[3].setVisible(false);
        this.lights[3].update();

        // fireplace light
        this.lights[4].setPosition(7.55, 1.5, 2.45, 1);
        this.lights[4].setDiffuse(1.0, 0.6, 0.3, 1.0);
        this.lights[4].setSpecular(1.0, 0.6, 0.3, 1.0);
        this.lights[4].setLinearAttenuation(0.1);
        this.lights[4].setQuadraticAttenuation(0.05);
        this.lights[4].disable();
        this.lights[4].setVisible(false);
        this.lights[4].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(50, 50, 50), vec3.fromValues(0, 0, 0));
    }
    initMaterialsAndTextures() {

        // Materials

        this.diffuseMaterial = new CGFappearance(this);
        this.diffuseMaterial.setAmbient(0.5, 0.5, 0.5, 1);
        this.diffuseMaterial.setDiffuse(0.7, 0.7, 0.7, 1);
        this.diffuseMaterial.setSpecular(0.2, 0.2, 0.2, 1);
        this.diffuseMaterial.setShininess(10.0);

        this.specularMaterial = new CGFappearance(this);
        this.specularMaterial.setAmbient(0.7, 0.7, 0.7, 1);
        this.specularMaterial.setDiffuse(0.4, 0.4, 0.4, 1);
        this.specularMaterial.setSpecular(1, 1, 1, 1);
        this.specularMaterial.setShininess(10.0);

        this.matteMaterial = new CGFappearance(this);
        this.matteMaterial.setAmbient(0.7, 0.7, 0.7, 1);
        this.matteMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
        this.matteMaterial.setSpecular(0, 0, 0, 1);
        this.matteMaterial.setShininess(1.0);

        // Textures

        // Trees
        this.treeTrunkTexture = new CGFtexture(this, 'images/trunkTexture.png');
        this.grassTexture = new CGFtexture(this, 'images/grassTexture.jpg');
        this.leavesTexture = new CGFtexture(this, 'images/pineNeedles.jpg');

        // Houses
        this.brickTexture = new CGFtexture(this, 'images/brickWall.jpg');
        this.doorTexture = new CGFtexture(this, 'images/door.jpg');
        this.balconyTexture = new CGFtexture(this, 'images/balconyFloor.jpg');
        this.roofTexture = new CGFtexture(this, 'images/roofTiles.jpg');
        this.houseDetailTexture = new CGFtexture(this, 'images/rodape.jpg');
        this.columnTexture = new CGFtexture(this, 'images/marbleColumn.jpg');
        this.welcomeMatTexture = new CGFtexture(this, 'images/welcomeMat.jpg');
        this.windowTexture = new CGFtexture(this, 'images/window.jpg');

        // Pools
        this.floorTexture = new CGFtexture(this, 'images/stoneTexture.jpg');
        this.waterTexture = new CGFtexture(this, 'images/poolWater.jpg');

        // Fireplaces
        this.fireplaceBaseTexture = new CGFtexture(this, 'images/fireplaceBase.jpg');
        this.fireTexture = new CGFtexture(this, 'images/fire.jpg');
        this.logTexture = new CGFtexture(this, 'images/treeLog.jpg');
    }

    initObjectTextCoords() {

        this.floor.texCoords = [
            0, 10,
            10, 10,
            0, 0,
            10, 0
        ];
        this.floor.updateTexCoordsGLBuffers();
    }

    updateTimeOfDay() {
        this.cubeMap.changeTimeOfDay();

        this.lights[2].disable();
        this.lights[3].disable();
        this.lights[4].disable();
        
        if (this.timeOfDay == 0) this.lights[2].enable();
        else if (this.timeOfDay == 1) this.lights[3].enable();
        else if (this.timeOfDay == 2) this.lights[4].enable();
        
        this.lights[2].update();
        this.lights[3].update();
        this.lights[4].update();
    }

    updateTextures() {
        this.enableTextures(this.textsEnable);
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        this.axis.display();

        //Apply default appearance
        // this.setDefaultAppearance();
        this.lights[1].update();
        this.lights[2].update();
        this.lights[3].update();
        this.lights[4].update();

        // ---- BEGIN Primitive drawing section

        this.pushMatrix();

        this.scale(0.5, 0.5, 0.5);

        // if (this.displayNormals) {
        //     // this.prism.enableNormalViz();
        //     this.treeGroup.enableNormalViz();
        //     this.treeRow.enableNormalViz();
        //     this.house.enableNormalViz();
        //     this.smallHouse.enableNormalViz();
        //     this.hill.enableNormalViz();
        //     this.complexTree.enableNormalViz();
        //     this.floor.enableNormalViz();
        //     this.cubeMap.enableNormalViz();
        //     this.pool.enableNormalViz();
        // }
        // else {
        //     // this.prism.disableNormalViz();
        //     this.treeGroup.disableNormalViz();
        //     this.treeRow.disableNormalViz();
        //     this.house.disableNormalViz();
        //     this.smallHouse.disableNormalViz();
        //     this.hill.disableNormalViz();
        //     this.complexTree.disableNormalViz();
        //     this.floor.disableNormalViz();
        //     this.cubeMap.disableNormalViz();
        //     this.pool.disableNormalViz();
        // }

        this.diffuseMaterial.setTexture(this.grassTexture);
        this.diffuseMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.diffuseMaterial.apply();

        this.pushMatrix();
        this.scale(300, 300, 300);
        this.rotate(-Math.PI / 2, 1, 0, 0);
        this.floor.display();
        this.rotate(Math.PI, 0, 1, 0);
        this.floor.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-35, 0, -12);
        this.scale(3.5, 3.5, 3.5);
        this.treeGroup.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-25, 0, -25);
        this.scale(5, 5, 5);
        this.treeRow.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(34, 0, 0);
        this.house.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-20, 0, 10);
        this.rotate(Math.PI/2, 0, 1, 0);
        this.smallHouse.display();
        this.popMatrix();

        
        this.hill.display();

        this.pushMatrix();
        this.translate(0, 8, 0);
        this.scale(3.5, 3.5, 3.5);
        this.complexTree.display();
        // it's a chris pine
        this.popMatrix();

        this.pushMatrix();
        this.cubeMap.cubeMapMaterial.apply();
        this.cubeMap.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(15, 0, 20);
        this.rotate(Math.PI / 2, 0, 1, 0);
        this.pool.display();
        this.popMatrix();

        if (this.timeOfDay == 2) {
            this.pushMatrix();
            this.translate(15, 0, 5);
            this.fireplace.display();
            this.popMatrix();
        }

        this.popMatrix();

        // ---- END Primitive drawing section
    }
}