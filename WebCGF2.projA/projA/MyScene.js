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
        this.initMaterials();

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
        this.treeGroup = new MyTreeGroupPatch(this, 1.5, 0.25, 3, 0.75, "images/mineBottom.png", "images/mineTop.png");
        this.treeRow = new MyTreeRowPatch(this, 1.5, 0.25, 3, 0.75, "images/mineBottom.png", "images/mineTop.png");
        this.house = new MyHouse(this, 3.5);
        this.smallHouse = new MyHouse(this, 2);
        this.hill = new MyVoxelHill(this, 4, 2);
        this.complexTree = new MyComplexTree(this, 1.5, 0.25, 3, 0.75, "images/mineBottom.png", "images/mineTop.png");
        this.floor = new MyQuad(this);
        this.cubeMap = new MyCubeMap(this);
        // FALTAM AS TEXTURAS

        //Objects connected to MyInterface
        this.displayNormals = false;
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
        this.lights[1].enable();
        this.lights[1].setVisible(true);
        this.lights[1].update();

        this.lights[2].setPosition(3, 3, 2, 1);
        this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[2].enable();
        this.lights[2].setVisible(true);
        this.lights[2].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    initMaterials() {

        // this.prismTest = new CGFappearance(this);
        // this.prismTest.setAmbient(0.1, 0.1, 0.1, 1);
        // this.prismTest.setDiffuse(0.9, 0.9, 0.9, 1);
        // this.prismTest.setSpecular(0.1, 0.1, 0.1, 1);
        // this.prismTest.setShininess(10.0);
        // this.prismTest.loadTexture("images/tangram-lines.png");

        var standardMaterial = new CGFappearance(this);
        standardMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        standardMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
        standardMaterial.setSpecular(0.5, 0.5, 0.5, 1);
        standardMaterial.setShininess(10.0);
        standardMaterial.loadTexture("images/tangram-lines.png");

        var specularMaterial = new CGFappearance(this);
        specularMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        specularMaterial.setDiffuse(0.3, 0.3, 0.3, 1);
        specularMaterial.setSpecular(0.7, 0.7, 0.7, 1);
        specularMaterial.setShininess(10.0);
        specularMaterial.loadTexture("images/tangram-lines.png");

        var matteMaterial = new CGFappearance(this);
        matteMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        matteMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        matteMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        matteMaterial.setShininess(10.0);
        matteMaterial.loadTexture("images/tangram-lines.png");

        this.materials = [
            standardMaterial,
            specularMaterial,
            matteMaterial
        ];
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

        // ---- BEGIN Primitive drawing section

        this.pushMatrix();

        this.scale(0.5, 0.5, 0.5);

        if (this.displayNormals) {
            // this.prism.enableNormalViz();
            this.treeGroup.enableNormalViz();
            this.treeRow.enableNormalViz();
            this.house.enableNormalViz();
            this.smallHouse.enableNormalViz();
            this.hill.enableNormalViz();
        }
        else {
            // this.prism.disableNormalViz();
            this.treeGroup.disableNormalViz();
            this.treeRow.disableNormalViz();
            this.house.disableNormalViz();
            this.smallHouse.disableNormalViz();
            this.hill.disableNormalViz();
        }

        // this.pushMatrix();
        // this.translate(-3, 0, 1.75);
        // this.scale(2, 2, 2);
        // this.materials[2].apply();
        // this.prism.display();
        // this.popMatrix();

        // this.pushMatrix();
        // this.translate(6, 0, 0);
        // this.scale(4, 4, 4);
        // this.materials[1].apply();
        // this.pyramid.display(); 
        // this.popMatrix();


        this.pushMatrix();

        this.scale(100, 100, 100);
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

        this.cubeMap.display();

        this.popMatrix();

        // ---- END Primitive drawing section
    }
}