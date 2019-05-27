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
        this.terrain = new MyTerrain(this, 60, 60);
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

        this.bird = new MyBird(this, 1, 0, 10, 0);
        this.nest = new MyNest(this);

        this.numBranches = 5;

        this.branches = [];

        for(var i = 0; i < this.numBranches; i++) {
            var randomX = Math.floor(Math.random() * 20) - 10;
            var randomZ = Math.floor(Math.random() * 20) - 10;
            var randomOr = Math.floor(Math.random() * 360);

            this.branches.push(new MyTreeBranch(this, randomX, randomZ, randomOr));
        }


        this.timeOfDay = 0;

        // Objects connected to MyInterface

        this.setUpdatePeriod(80);

        this.speedFactor = 1;
        this.lastTime = 0;

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

    update(t) {
        if (this.lastTime == 0) {
            this.lastTime = t;
        }
        else {
            this.checkKeys();
            this.bird.update(t);
            this.lastTime = t;
        }
    }

    checkKeys() {
        if (this.gui.isKeyPressed("KeyW")) {
            this.bird.accelerate(this.speedFactor);
        }

        if (this.gui.isKeyPressed("KeyS")) {
            this.bird.accelerate(-this.speedFactor);
        }

        if(this.gui.isKeyPressed("KeyA")) {
            this.bird.turn(this.speedFactor / 10);
        }

        if(this.gui.isKeyPressed("KeyD")) {
            this.bird.turn(-this.speedFactor / 10);
        }

        if(this.gui.isKeyPressed("KeyR")) {
            this.bird.resetBird();
        }

        if(this.gui.isKeyPressed("KeyP")) {
            // this.bird.time = 0;
            if(this.bird.currentState == this.bird.states.NORMAL)
                this.bird.changeState(this.bird.states.GOING_DOWN);
            // this.bird.updateFall();
        }

    }

    verifyBranchCollisions(bird) {
        for(var i = 0; i < this.branches.length; i++) {
            if(this.branches[i].collidedWithBird(bird)) {
                if(this.bird.branch == null) {
                    this.branches[i].birdHoldingIt = true;
                    this.bird.branch = this.branches[i]; // passes the branch reference to the bird
                    this.branches.splice(i, 1);
                    return;
                }
            }
        }
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

        this.terrain.display();

        this.pushMatrix();
        this.bird.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(2, 3.8, 8);
        this.rotate(Math.PI, 0, 1, 0);
        this.house.display();
        this.popMatrix();

        this.nest.display();

        for(var i = 0; i < this.branches.length; i++)
            this.branches[i].display();


        this.cubeMap.cubeMapMaterial.apply();
        this.cubeMap.display();
        // ---- END Primitive drawing section

    }

}