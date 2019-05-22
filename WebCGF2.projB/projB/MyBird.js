class MyBird extends CGFobject {

    constructor(scene, birdSize, initialX, initialY, initialZ) {
        super(scene);


        this.scaleFactor = 1;

        this.heightOffset = 0;
        this.heightAmp = 0.2;

        this.orientation = 0; // angle related to the y axis
        this.velocity = 0;
        this.xPosition = this.initialX = initialX;
        this.yPosition = this.initialY = initialY;
        this.zPosition = this.initialZ = initialZ;


        this.birdSize = birdSize;
        
        this.tail = new MyCone(this.scene, 10, 1);
        this.body = new MyCylinder(this.scene, 10);
        this.neck = new MyCone(this.scene, 10, 1);
        this.head = new MySphere(this.scene, 20, 20, 0.5);
        this.beak = new MyPyramid(this.scene, 4, 1);
        this.eye = new MySphere(this.scene, 10, 10, 0.1);
        this.innerWing = new MyQuadWing(this.scene);
        this.outerWing = new MyTriangle(this.scene);
    }

    update(t) {
        // this.updateHeightOsc(t);
        // this.updatePosition(t);
    }

    updateHeightOsc(t) {
        this.heightOffset = this.heightAmp * Math.sin(2 * Math.PI * t / 1000);
    }

    updatePosition(t) {
        var offset = (this.velocity * (t / 1000)) / 10000000;
        this.xPosition = offset * Math.cos(this.orientation);
        this.zPosition = offset * Math.sin(this.orientation);
        // console.log('velocity: ' + this.velocity);
        // console.log('orienation: ' + this.orientation);
        // console.log('x: ' + this.xPosition + '; y: ' + this.yPosition + '; z: ' + this.zPosition);
        // console.log('----');
    }

    turn(v) {
        this.orientation += v;
    }

    accelerate(v) {
        this.velocity += v;
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
        this.scene.scale(this.birdSize * this.scaleFactor, this.birdSize * this.scaleFactor, this.birdSize * this.scaleFactor);

        // Body

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.4, 1.5, 0.4);
        this.body.display();
        this.scene.popMatrix();


        // Tail

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.4, 1, 0.4);
        this.tail.display();
        this.scene.popMatrix();
        

        // Inner Wing #1

        this.scene.pushMatrix();
        this.scene.translate(0.75, 0, 0.8);
        this.scene.scale(0.9, 0.9, 0.75);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.innerWing.display();
        this.scene.popMatrix();


        // Inner Wing #2
        
        this.scene.pushMatrix();
        this.scene.translate(-0.75, 0, 0.8);
        this.scene.scale(0.9, 0.9, 0.75);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.innerWing.display();
        this.scene.popMatrix();


        // Outer Wing # 1

        this.scene.pushMatrix();
        this.scene.translate(-1.20, 0, 0.8);
        this.scene.scale(0.8, 0.8, 0.26);
        this.scene.rotate(Math.PI / 4, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.outerWing.display();
        this.scene.popMatrix();


        // Outer Wing # 2

        this.scene.pushMatrix();
        this.scene.translate(1.20, 0, 0.8);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(0.8, 0.8, 0.26);
        this.scene.rotate(Math.PI / 4, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.outerWing.display();
        this.scene.popMatrix();


        // Neck
        
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1.5);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.4, 0.8, 0.4);
        this.neck.display();
        this.scene.popMatrix();


        // Head

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 2);
        this.head.display();
        this.scene.popMatrix();


        // Eye #1

        this.scene.pushMatrix();
        this.scene.translate(0.3, 0.28, 2.3);
        this.eye.display();
        this.scene.popMatrix();


        // Eye #2
        
        this.scene.pushMatrix();
        this.scene.translate(-0.3, 0.28, 2.3);
        this.eye.display();
        this.scene.popMatrix();



        this.scene.popMatrix();
    }


}