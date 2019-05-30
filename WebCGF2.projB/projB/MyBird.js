class MyBird extends CGFobject {

    constructor(scene, birdSize, initialX, initialY, initialZ) {
        super(scene);

        this.initMaterials();
        this.initTextures();

        this.scaleFactor = 1;

        this.heightOffset = 0;
        this.heightAmp = 0.2;

        this.time = 0;

        // bird's possible states
        this.states = { NORMAL : 0,
                        GOING_DOWN : 1,
                        GOING_UP : 2
                      }

        this.currentState = this.states.NORMAL;

        this.birdSize = birdSize;              

        this.orientation = 0; // angle related to the y axis
        this.velocity = 0;
        this.xPosition = this.initialX = initialX;
        this.yPosition = this.initialY = initialY;
        this.zPosition = this.initialZ = initialZ;

        // when the bird is going down and up, it travels twice its initial y distance
        // (once going down, once going up). Therefore, in order for this movement
        // to last 2 seconds, the fall velocity should be equal to the bird's initial
        // y position.
        this.fallVelocity = this.initialY - 4.5;

        this.innerWingAnimAngle = 0;
        this.innerWingAnimAmp = 0.8;

        this.outerWingAnimAngle = 20;
        this.outerWingAnimAmp = 0.5;

        this.tail = new MyCone(this.scene, 10, 1);
        this.body = new MyCylinder(this.scene, 10);
        this.neck = new MyCone(this.scene, 10, 1);
        this.head = new MySphere(this.scene, 20, 20, 0.5);
        this.beak = new MyPyramid(this.scene, 4, 1);
        this.eye = new MySphere(this.scene, 10, 10, 0.1);
        this.innerWing = new MyQuadWing(this.scene);
        this.outerWing = new MyTriangle(this.scene);

        // tree branch that the bird might be holding (null in the beggining)
        this.branch = null;

        this.adaptTextureCoordsWing();
    }

    initMaterials() {

        // "Normal" default material, for applying textures 
    
        this.defaultBirdMaterial = new CGFappearance(this.scene);
        this.defaultBirdMaterial.setAmbient(0.5, 0.5, 0.5, 1);
        this.defaultBirdMaterial.setDiffuse(0.7, 0.7, 0.7, 1);
        this.defaultBirdMaterial.setSpecular(0.2, 0.2, 0.2, 1);
        this.defaultBirdMaterial.setShininess(10.0);


        // Yellowish material for the beak

        this.beakMaterial = new CGFappearance(this.scene);
        this.beakMaterial.setAmbient(1.0, 0.6, 0.2, 1);
        this.beakMaterial.setDiffuse(1.0, 0.6, 0.2, 1);
        this.beakMaterial.setSpecular(0.2, 0.2, 0.2, 1);
        this.beakMaterial.setShininess(10.0);


        // Dark material for the eyes

        this.eyeMaterial = new CGFappearance(this.scene);
        this.eyeMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.eyeMaterial.setDiffuse(0.1, 0.1, 0.1, 1);
        this.eyeMaterial.setSpecular(0.5, 0.5, 0.5, 1);
        this.eyeMaterial.setShininess(10.0);
    }

    initTextures() {
        this.feathersTexture = new CGFtexture(this.scene, 'images/feathers2.jpg');
    }

    adaptTextureCoordsWing() {

        this.innerWing.texCoords = [
			0, 2,
			1, 1,
			0, 0,
            2, 0,

            0, 2,
			1, 1,
			0, 0,
			2, 0
		];

        this.outerWing.texCoords = [  
            0, 1.5,
			1.5, 1.5,
			0, -1,

			0, 1.5,
			1.5, 1.5,
			0, -1
        ];

        this.innerWing.updateTexCoordsGLBuffers();
        this.outerWing.updateTexCoordsGLBuffers();
    }

    changeState(state) {
        this.currentState = state;
    }

    update(t) {
        if(this.currentState == this.states.NORMAL)
            this.updateHeightOsc(t);
        else
            this.updateFall(t);
        
        this.updatePosition(t);
        this.updateWingsPosition(t);

    }

    updateHeightOsc(t) {
        this.heightOffset = this.heightAmp * Math.sin(2 * Math.PI * t / 1000 + Math.PI);
    }

    updateWingsPosition(t) {
        var freq = this.scene.speedFactor * (this.velocity + 1);
        
        this.innerWingAnimAngle = this.innerWingAnimAmp * Math.sin(2 * Math.PI * freq * (t / 1000));
        this.outerWingAnimAngle = (-this.outerWingAnimAmp * Math.sin(2 * Math.PI * freq * (t / 1000))) + (this.outerWingAnimAmp * 0.75);
    }
    
    updatePosition(t) {
        var timeDiff = t - this.scene.lastTime;
        var offset = (this.velocity * (timeDiff / 1000));
        this.xPosition += offset * Math.sin(this.orientation);
        this.zPosition += offset * Math.cos(this.orientation);
    }

    updateFall(t) {  
        var timeDiff = t - this.scene.lastTime;
        var offset = (this.fallVelocity * (timeDiff / 1000));
        
        if(this.currentState == this.states.GOING_DOWN)
            this.yPosition -= offset;
        else if(this.currentState == this.states.GOING_UP)
            this.yPosition += offset;

        if(this.currentState == this.states.GOING_DOWN && this.yPosition < 4.5) { // bird reached the ground
            this.currentState = this.states.GOING_UP;
            if(this.branch == null)
                this.scene.verifyBranchCollisions(this);
            else
                this.scene.verifyNestCollisions(this);
        }

        if(this.currentState == this.states.GOING_UP && this.yPosition >= this.initialY) { // finish movement
            this.yPosition = this.initialY;
            this.currentState = this.states.NORMAL;
        }
    }


    turn(v) {
        this.orientation += v;
    }

    accelerate(v) {
        this.velocity += v;

        if(this.velocity < 0)
            this.velocity = 0;
    }

    resetBird() {
        this.xPosition = this.initialX;
        this.yPosition = this.initialY;
        this.zPosition = this.initialZ;
        this.velocity = 0;
        this.orientation = 0;
    }

    display() {

        this.scene.pushMatrix();
        this.scene.translate(this.xPosition, this.yPosition + this.heightOffset, this.zPosition);
        this.scene.rotate(this.orientation, 0, 1, 0);
        
        this.scene.pushMatrix();
        this.scene.scale(this.birdSize * this.scaleFactor, this.birdSize * this.scaleFactor, this.birdSize * this.scaleFactor);

        this.defaultBirdMaterial.setTexture(this.feathersTexture);
        this.defaultBirdMaterial.apply();

        // Body

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1.5);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.4, 1.5, 0.4);
        this.body.display();
        this.scene.popMatrix();


        // Tail

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1.5);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.4, 1, 0.4);
        this.tail.display();
        this.scene.popMatrix();
        

        // Inner Wing #1

        this.defaultBirdMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.scene.pushMatrix();
        
        this.scene.rotate(this.innerWingAnimAngle, 0, 0, 1);

        this.scene.translate(0.75, 0, -0.7);
        this.scene.scale(0.9, 0.9, 0.75);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.innerWing.display();
        this.scene.popMatrix();


        // Inner Wing #2
        
        this.scene.pushMatrix();
        
        this.scene.rotate(-this.innerWingAnimAngle, 0, 0, 1);

        this.scene.translate(-0.75, 0, -0.7);
        this.scene.scale(0.9, 0.9, 0.75);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.innerWing.display();
        this.scene.popMatrix();


        // Outer Wing # 1

        this.scene.pushMatrix();
        
        this.scene.rotate(-this.innerWingAnimAngle, 0, 0, 1);

        this.scene.translate(-1.20, 0, -0.7);
     
        this.scene.rotate(this.outerWingAnimAngle, 0, 0, 1);
        
        this.scene.scale(0.8, 0.8, 0.26);
        this.scene.rotate(Math.PI / 4, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.outerWing.display();
        this.scene.popMatrix();


        // Outer Wing # 2

        this.scene.pushMatrix();
        
        this.scene.rotate(this.innerWingAnimAngle, 0, 0, 1);

        this.scene.translate(1.20, 0, -0.7);
        
        this.scene.rotate(-this.outerWingAnimAngle, 0, 0, 1);
        
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(0.8, 0.8, 0.26);
        this.scene.rotate(Math.PI / 4, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.outerWing.display();
        this.scene.popMatrix();


        // Neck
        
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.4, 0.8, 0.4);
        this.neck.display();
        this.scene.popMatrix();


        // Head

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.head.display();
        this.scene.popMatrix();


        // Eye #1

        this.eyeMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.3, 0.25, 0.8);
        this.eye.display();
        this.scene.popMatrix();


        // Eye #2
        
        this.scene.pushMatrix();
        this.scene.translate(-0.3, 0.25, 0.8);
        this.eye.display();
        this.scene.popMatrix();


        // Beak
        
        this.beakMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.9);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.2, 0.4, 0.2);
        this.beak.display();
        this.scene.popMatrix();


        this.scene.popMatrix();


        // Branch, that the bird is holding (if any)

        if(this.branch != null) {
            this.scene.pushMatrix();
            this.scene.translate(0, -0.15, 1.1 * this.birdSize * this.scaleFactor);
            this.branch.display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();

    }


}