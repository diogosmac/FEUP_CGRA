/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);

        this.diamond = new MyDiamond(scene);
        this.smallTriangle = new MyTriangleSmall(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangle = new MyTriangle(scene);
        this.bigTriangle = new MyTriangleBig(scene);

        this.displayYellow = true;
        this.displayPink = true;
        this.displayBlue = true;
        this.displayOrange = true;
        this.displayRed = true;
        this.displayPurple = true;
        this.displayGreen = true;

        // this.initBuffers();
	}
	initBuffers() { // not necessary
		this.vertices = [];
		this.indices = [];

        this.initGLBuffers();
    }
    display() {

        this.scene.pushMatrix();

        var translateDiamond = [1.0, 0.0, 0.0, 0.0,
                                0.0, 1.0, 0.0, 0.0,
                                0.0, 0.0, 1.0, 0.0,
                                2.5, -1.5, 0.0, 1.0];

        this.scene.multMatrix(translateDiamond);
        this.scene.setColor(0.1, 0.9, 0.1, 1.0); // green
        if (this.displayGreen)
            this.diamond.display();

        this.scene.popMatrix();


        this.scene.pushMatrix();

        this.scene.translate(1.5, -0.5, 0);
        this.scene.rotate(- Math.PI / 2, 0, 0, 1);
        this.scene.setColor(0.9, 0.1, 0.1, 1.0); // red
        if (this.displayRed)
            this.smallTriangle.display();

        this.scene.popMatrix();


        this.scene.pushMatrix();

        this.scene.translate(1.5, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.translate(0, -2, 0);
        this.scene.setColor(0.6, 0.2, 0.8, 1.0); // purple
        if (this.displayPurple)
            this.smallTriangle.display();

        this.scene.popMatrix();


        this.scene.pushMatrix();

        this.scene.translate(-Math.sqrt(2) + 1.5, -2.5, 0);
        this.scene.rotate(- Math.PI / 4, 0, 0, 1);
        this.scene.setColor(0.7, 0.4, 0.2, 1.0); // orange
        if (this.displayOrange)
            this.bigTriangle.display();

        this.scene.popMatrix();


        this.scene.pushMatrix();

        this.scene.translate(-1.5, -(1 / 1.7) - 0.5, 0);
        this.scene.setColor(0.0, 0.4, 1.0, 1.0); // blue
        if (this.displayBlue)
            this.bigTriangle.display();

        this.scene.popMatrix();


        this.scene.pushMatrix();

        this.scene.translate(-Math.sqrt(2) - 1.5, 1.5 - (1 / 1.7), 0);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.scene.setColor(1.0, 0.6, 1.0, 1.0); // pink
        if (this.displayPink)
            this.triangle.display();

        this.scene.popMatrix();


        this.scene.pushMatrix();

        this.scene.translate(-1.5, 1.5 - (1 / 1.7), 0);
        this.scene.scale(-1, 1, 1);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.setColor(0.8, 0.8, 0.2, 1.0); // yellow
        if (this.displayYellow)
            this.parallelogram.display();

        this.scene.popMatrix();

    }
}

