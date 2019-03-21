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

        this.initMaterials();

        // this.initBuffers();
	}
	initBuffers() { // not necessary
        this.vertices = [];
		this.indices = [];

        this.initGLBuffers();
    }
    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.smallTriangle.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.triangle.enableNormalViz();
        this.bigTriangle.enableNormalViz();
    }
    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.smallTriangle.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.triangle.disableNormalViz();
        this.bigTriangle.disableNormalViz();
    }
    initMaterials() {
        this.diamondMaterial = new CGFappearance(this.scene);
        this.diamondMaterial.setAmbient(0.03, 0.23, 0.03, 1.0);
        this.diamondMaterial.setDiffuse(0.03, 0.23, 0.03, 1.0);
        this.diamondMaterial.setSpecular(0.1, 0.9, 0.1, 1.0);
        this.diamondMaterial.setShininess(10.0);
        
        this.parallelogramMaterial = new CGFappearance(this.scene);
        this.parallelogramMaterial.setAmbient(0.2, 0.2, 0.1, 1.0);
        this.parallelogramMaterial.setDiffuse(0.2, 0.2, 0.1, 1.0);
        this.parallelogramMaterial.setSpecular(0.8, 0.8, 0.2, 1.0);
        this.parallelogramMaterial.setShininess(10.0);
        
        this.smallTriangleOneMaterial = new CGFappearance(this.scene);
        this.smallTriangleOneMaterial.setAmbient(0.23, 0.03, 0.03, 1.0);
        this.smallTriangleOneMaterial.setDiffuse(0.23, 0.03, 0.03, 1.0);
        this.smallTriangleOneMaterial.setSpecular(0.9, 0.1, 0.1, 1.0);
        this.smallTriangleOneMaterial.setShininess(10.0);
        
        this.smallTriangleTwoMaterial = new CGFappearance(this.scene);
        this.smallTriangleTwoMaterial.setAmbient(0.15, 0.05, 0.2, 1.0);
        this.smallTriangleTwoMaterial.setDiffuse(0.15, 0.05, 0.2, 1.0);
        this.smallTriangleTwoMaterial.setSpecular(0.6, 0.2, 0.8, 1.0);
        this.smallTriangleTwoMaterial.setShininess(10.0);

        this.triangleMaterial = new CGFappearance(this.scene);
        this.triangleMaterial.setAmbient(0.25, 0.15, 0.25, 1.0);
        this.triangleMaterial.setDiffuse(0.25, 0.15, 0.25, 1.0);
        this.triangleMaterial.setSpecular(1.0, 0.6, 1.0, 1.0);
        this.triangleMaterial.setShininess(10.0);
        
        this.bigTriangleOneMaterial = new CGFappearance(this.scene);
        this.bigTriangleOneMaterial.setAmbient(0.0, 0.1, 0.25, 1.0);
        this.bigTriangleOneMaterial.setDiffuse(0.0, 0.1, 0.25, 1.0);
        this.bigTriangleOneMaterial.setSpecular(0.0, 0.4, 1.0, 1.0);
        this.bigTriangleOneMaterial.setShininess(10.0);
        
        this.bigTriangleTwoMaterial = new CGFappearance(this.scene);
        this.bigTriangleTwoMaterial.setAmbient(0.35, 0.1, 0.05, 1.0);
        this.bigTriangleTwoMaterial.setDiffuse(0.35, 0.1, 0.05, 1.0);
        this.bigTriangleTwoMaterial.setSpecular(0.7, 0.4, 0.2, 1.0);
        this.bigTriangleTwoMaterial.setShininess(10.0);
    }
    display() {

        this.scene.pushMatrix();

        var translateDiamond = [1.0, 0.0, 0.0, 0.0,
                                0.0, 1.0, 0.0, 0.0,
                                0.0, 0.0, 1.0, 0.0,
                                2.5, -1.5, 0.0, 1.0];

        this.scene.multMatrix(translateDiamond);
        // this.scene.setColor(0.1, 0.9, 0.1, 1.0); // green
        // this.diamondMaterial.apply();
        this.scene.customMaterial.apply();
        if (this.displayGreen)
            this.diamond.display();

        this.scene.popMatrix();


        this.scene.pushMatrix();

        this.scene.translate(1.5, -0.5, 0);
        this.scene.rotate(- Math.PI / 2, 0, 0, 1);
        // this.scene.setColor(0.9, 0.1, 0.1, 1.0); // red
        this.smallTriangleOneMaterial.apply();
        if (this.displayRed)
            this.smallTriangle.display();

        this.scene.popMatrix();


        this.scene.pushMatrix();

        this.scene.translate(1.5, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.translate(0, -2, 0);
        // this.scene.setColor(0.6, 0.2, 0.8, 1.0); // purple
        this.smallTriangleTwoMaterial.apply();
        if (this.displayPurple)
            this.smallTriangle.display();

        this.scene.popMatrix();


        this.scene.pushMatrix();

        this.scene.translate(-Math.sqrt(2) + 1.5, -2.5, 0);
        this.scene.rotate(- Math.PI / 4, 0, 0, 1);
        // this.scene.setColor(0.7, 0.4, 0.2, 1.0); // orange
        this.bigTriangleTwoMaterial.apply();
        if (this.displayOrange)
            this.bigTriangle.display();

        this.scene.popMatrix();


        this.scene.pushMatrix();

        this.scene.translate(-1.5, -(1 / 1.7) - 0.5, 0);
        // this.scene.setColor(0.0, 0.4, 1.0, 1.0); // blue
        this.bigTriangleOneMaterial.apply();
        if (this.displayBlue)
            this.bigTriangle.display();

        this.scene.popMatrix();


        this.scene.pushMatrix();

        this.scene.translate(-Math.sqrt(2) - 1.5, 1.5 - (1 / 1.7), 0);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        // this.scene.setColor(1.0, 0.6, 1.0, 1.0); // pink
        this.triangleMaterial.apply();
        if (this.displayPink)
            this.triangle.display();

        this.scene.popMatrix();


        this.scene.pushMatrix();

        this.scene.translate(-1.5, 1.5 - (1 / 1.7), 0);
        this.scene.scale(-1, 1, 1);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        // this.scene.setColor(0.8, 0.8, 0.2, 1.0); // yellow
        this.parallelogramMaterial.apply();
        if (this.displayYellow)
            this.parallelogram.display();

        this.scene.popMatrix();

    }
}

