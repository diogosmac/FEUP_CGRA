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

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);
        this.setUpdatePeriod(50);

        this.initMaterials();
        this.initTextures();

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new Plane(this, 32);
        this.cubeMap = new MyCubeMap(this);
        this.house = new MyHouse(this, 0.75,
                                 this.brickTexture,
                                 this.doorTexture,
                                 this.balconyTexture,
                                 this.roofTexture,
                                 this.houseDetailTexture,
                                 this.columnTexture,
                                 this.welcomeMatTexture,
                                 this.windowTexture);

        this.bird = new MyBird(this, 1);

        this.timeOfDay = 0;

        // this.defaultMaterial = new CGFappearance(this);
        // this.defaultMaterial.setAmbient(0.6, 0.6, 0.6, 1.0);
        // this.defaultMaterial.setDiffuse(0.7, 0.7, 0.7, 1.0);
        // this.defaultMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
        // this.defaultMaterial.setShininess(10.0);
        

        //Objects connected to MyInterface

        this.setUpdatePeriod(100);
    }

    initMaterials() {

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
    }

    initTextures() {
        
        // House
        this.brickTexture = new CGFtexture(this, 'images/brickWall.jpg');
        this.doorTexture = new CGFtexture(this, 'images/door.jpg');
        this.balconyTexture = new CGFtexture(this, 'images/balconyFloor.jpg');
        this.roofTexture = new CGFtexture(this, 'images/roofTiles.jpg');
        this.houseDetailTexture = new CGFtexture(this, 'images/rodape.jpg');
        this.columnTexture = new CGFtexture(this, 'images/marbleColumn.jpg');
        this.welcomeMatTexture = new CGFtexture(this, 'images/welcomeMat.jpg');
        this.windowTexture = new CGFtexture(this, 'images/window.jpg');

    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 700, vec3.fromValues(45, 45, 45), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    update(t){
        this.checkKeys();
    }

    checkKeys() {
        var text = "Keys pressed: ";
        var keysPressed = false;

        if (this.gui.isKeyPressed("KeyW")) {
            text += " W ";
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyS")) {
            text += " S ";
            keysPressed = true;
        }

        if (keysPressed)
            console.log(text);
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
        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        this.pushMatrix();
        this.translate(0, 10, 0);
        this.bird.display();
        this.popMatrix();

        this.pushMatrix();
        this.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scale(60, 60, 1);
        this.plane.display();
        this.popMatrix();

        this.pushMatrix();
        this.house.display();
        this.popMatrix();

        this.cubeMap.cubeMapMaterial.apply();
        this.cubeMap.display();
        // ---- END Primitive drawing section
    }
}