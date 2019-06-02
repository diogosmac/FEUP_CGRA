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
        this.house = new MyHouse(this, 3/5,
                                 this.brickTexture,
                                 this.doorTexture,
                                 this.balconyTexture,
                                 this.roofTexture,
                                 this.houseDetailTexture,
                                 this.columnTexture,
                                 this.welcomeMatTexture,
                                 this.windowTexture);

        this.bird = new MyBird(this, 0.52, 0, 4.5, 0);

        this.nest = new MyNest(this, -8, -8, 1, 8);

        this.numBranches = 5;

        this.branches = [];
    
        for(var i = 0; i < this.numBranches; i++) {
            var location = Math.floor(Math.random() * 2);
            var randomX, randomZ;

            if(location) {
                randomX = Math.floor(Math.random() * 6) + 9; // de 9 a 14
                randomZ = Math.floor(Math.random() * 22) - 10; // de -10 a 11
            }
            else {
                randomX = Math.floor(Math.random() * 7) + 3; // de 3 a 10
                randomZ = Math.floor(Math.random() * 7) + 5; // de 5 a 11
            }

            var randomOr = Math.floor(Math.random() * 360);

            this.branches.push(new MyTreeBranch(this, randomX, randomZ, randomOr));
        }


        // variables for the L system
        this.lightningAxiom = "X";
        this.lightningAngle = 25.0;
        this.lightningIterations = 3;
        this.lightningScaleFactor = 0.5;

        this.lightning = new MyLightning(this, 2.5);

        this.generateLightning = function () {
            this.lightning.generate(
                this.lightningAxiom,
                {
                    "F": ["FF"],
                    "X": [
                        "F[-X][X]F[-X]+FX", 
                        "F[/X][X]F[\\X]+X",
                        "F[X]XF+[\\X]",
                        "F[X[X]+F]",
                        "F[^X][X]F[&X]^X",
                    ]
                },
                this.lightningAngle,
                this.lightningIterations,
                this.lightningScaleFactor
            );
        }

        this.generateLightning(); // initial L system generation

        this.treeAxiom = "X";
        this.treeAngle = 35.0;
        this.treeIterations = 5;
        this.treeScaleFactor = 0.55;
        
        this.trees = [];

        for(var i = 0; i < 11; i++)
            this.trees.push(new MyLSPlant(this));

        this.generateTrees = function () {
            
            for(var i = 0; i < 11; i++) {
                this.trees[i].generate(
                    this.treeAxiom,
                    {
                        "F": ["FF"],
                        "X": [
                            "F[-X][X]F[-X]+X",
                            "F[-X][X]+X",
                            "F[+X]-X",
                            "F[/X][X]F[\\X]+X",
                            "F[\\X][X]/X",
                            "F[/X]\\X",
                            "F[^X][X]F[&X]^X",
                            "F[^X]&X",
                            "F[&X]^X"
                        ]
                    },
                    this.treeAngle,
                    this.treeIterations,
                    this.treeScaleFactor
                );
            }
        }

        this.generateTrees();

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
        this.camera = new CGFcamera(0.4, 0.1, 700, vec3.fromValues(45, 60, 45), vec3.fromValues(0, 0, 0));
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
            this.checkKeys(t);
            this.bird.update(t);
            this.lastTime = t;
        }
        this.lightning.update(t);
    }

    checkKeys(t) {
        if (this.gui.isKeyPressed("KeyW")) {
            this.bird.accelerate(this.speedFactor);
        }

        if (this.gui.isKeyPressed("KeyS")) {
            this.bird.accelerate(-this.speedFactor);
        }

        if(this.gui.isKeyPressed("KeyA")) {
            this.bird.turn(this.speedFactor / 5);
        }

        if(this.gui.isKeyPressed("KeyD")) {
            this.bird.turn(-this.speedFactor / 5);
        }

        if(this.gui.isKeyPressed("KeyR")) {
            this.bird.resetBird();
        }

        if(this.gui.isKeyPressed("KeyP")) {
            if(this.bird.currentState == this.bird.states.NORMAL)
                this.bird.changeState(this.bird.states.GOING_DOWN);
        }

        if(this.gui.isKeyPressed("KeyL")) {
            if (this.lightning.shouldAnimate == false) { 
                this.lightning.startAnimation(t);
            }
        }
    }

    verifyBranchCollisions(bird) {
        for(var i = 0; i < this.branches.length; i++) {
            if(this.branches[i].collidedWithBird(bird)) {
                if(this.bird.branch == null) {
                    this.branches[i].currentState = this.branches[i].states.PICKED_UP;
                    this.bird.branch = this.branches[i]; // passes the branch reference to the bird
                    this.branches.splice(i, 1);
                    return;
                }
            }
        }
    }

    verifyNestCollisions(bird) {
        if(this.nest.collidedWithBird(bird)) {
            this.bird.branch.currentState = this.bird.branch.states.IN_NEST;
            this.nest.branches.push(this.bird.branch); // passes the branch reference to the nest
            this.bird.branch = null;
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
        this.translate(-4, 3.8, 6.9);
        this.rotate(Math.PI, 0, 1, 0);
        this.house.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(0, 3.9, 0);
        this.nest.display();
        this.popMatrix();

        for(var i = 0; i < this.branches.length; i++)
            this.branches[i].display();


        this.cubeMap.cubeMapMaterial.apply();
        this.cubeMap.display();

        
        this.pushMatrix();
        this.translate(13, 3.8, 9);
        this.trees[0].display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-12, 3.8, 1);
        this.trees[1].display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(10, 3.8, -11);
        this.trees[2].display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-13, 3.8, 10);
        this.trees[3].display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-1, 3.8, -12);
        this.trees[4].display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(16, 3.8, -2);
        this.trees[5].display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-11, 3.8, -11);
        this.trees[6].display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-6, 3.8, 12);
        this.trees[7].display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-11, 3.8, -5);
        this.trees[8].display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(4.5, 3.8, -13);
        this.trees[9].display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(8, 3.8, 13);
        this.trees[10].display();
        this.popMatrix();

        this.pushMatrix();
        this.lightning.display();
        this.popMatrix();

        // ---- END Primitive drawing section

    }

}