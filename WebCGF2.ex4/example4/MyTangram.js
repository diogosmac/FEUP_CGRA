/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);

        this.diamond = new MyDiamond(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangle = new MyTriangle(scene);
        this.smallTriangle1 = new MyTriangleSmall(scene);
        this.smallTriangle2 = new MyTriangleSmall(scene);
        this.bigTriangle1 = new MyTriangleBig(scene);
        this.bigTriangle2 = new MyTriangleBig(scene);

        this.initMaterials();

        // this.initBuffers();
	}
	initBuffers() { // not necessary
        this.vertices = [];
		this.indices = [];

        this.initGLBuffers();
    }
    initMaterials() {
        this.tangramMaterial = new CGFappearance(this.scene);   
        this.tangramMaterial.setAmbient(0.6, 0.6, 0.6, 1.0);
        this.tangramMaterial.setDiffuse(0.7, 0.7, 0.7, 1.0);
        this.tangramMaterial.setSpecular(0.1, 0.1, 0.1, 1.0); 
        this.tangramMaterial.setShininess(10.0);
        // this.tangramMaterial.loadTexture('images/tangram.png');
        this.tangramMaterial.loadTexture('images/tangram-lines.png');

        this.smallTriangle1.texCoords = [
            0, 0.5,
            0.25, 0.25,
            0, 0,

            0, 0.5,
            0.25, 0.25,
            0, 0,
        ];
        this.smallTriangle1.updateTexCoordsGLBuffers();

        this.smallTriangle2.texCoords = [
            0.75, 0.75,
            0.5, 0.5,
            0.25, 0.75,

            0.75, 0.75,
            0.5, 0.5,
            0.25, 0.75,
        ];
        this.smallTriangle2.updateTexCoordsGLBuffers();

        this.bigTriangle1.texCoords = [
            1, 0,
			0.5, 0.5,
			0, 0,

			1, 0,
			0.5, 0.5,
			0, 0,
        ];
        this.bigTriangle1.updateTexCoordsGLBuffers();
        
        this.bigTriangle2.texCoords = [
            1, 1,
			0.5, 0.5,
			1, 0,

			1, 1,
			0.5, 0.5,
			1, 0,
        ];
        this.bigTriangle2.updateTexCoordsGLBuffers();
        
    }
    display() {

        this.tangramMaterial.apply();

        this.scene.pushMatrix();

        this.scene.translate(0, 0, -0.001);

        this.scene.pushMatrix();

        var translateDiamond = [1.0, 0.0, 0.0, 0.0,
                                0.0, 1.0, 0.0, 0.0,
                                0.0, 0.0, 1.0, 0.0,
                                2.5, -1.5, 0.0, 1.0];

        this.scene.multMatrix(translateDiamond);

        this.diamond.display();

        this.scene.popMatrix();


        this.scene.pushMatrix();

        this.scene.translate(1.5, -0.5, 0);
        this.scene.rotate(- Math.PI / 2, 0, 0, 1);
        this.smallTriangle1.display();

        this.scene.popMatrix();


        this.scene.pushMatrix();

        this.scene.translate(1.5, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.translate(0, -2, 0);
        this.smallTriangle2.display();

        this.scene.popMatrix();


        this.scene.pushMatrix();

        this.scene.translate(-Math.sqrt(2) + 1.5, -2.5, 0);
        this.scene.rotate(- Math.PI / 4, 0, 0, 1);
        this.bigTriangle1.display();

        this.scene.popMatrix();


        this.scene.pushMatrix();

        this.scene.translate(-1.5, -(1 / 1.7) - 0.5, 0);
        this.bigTriangle2.display();

        this.scene.popMatrix();


        this.scene.pushMatrix();

        this.scene.translate(-Math.sqrt(2) - 1.5, 1.5 - (1 / 1.7), 0);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.triangle.display();

        this.scene.popMatrix();


        this.scene.pushMatrix();

        this.scene.translate(-1.5, 1.5 - (1 / 1.7), 0);
        this.scene.scale(-1, 1, 1);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.parallelogram.display();

        this.scene.popMatrix();

        this.scene.popMatrix();

    }
}

