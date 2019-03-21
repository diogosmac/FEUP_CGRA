/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.quad = new MyQuad(this.scene);
        this.initMaterials();
    }
    initMaterials() {
        this.topMaterial = new CGFappearance(this.scene);   
        this.topMaterial.setAmbient(0.6, 0.6, 0.6, 1.0);
        this.topMaterial.setDiffuse(0.7, 0.7, 0.7, 1.0);
        this.topMaterial.setSpecular(0.1, 0.1, 0.1, 1.0); 
        this.topMaterial.setShininess(10.0);
        this.topMaterial.loadTexture('images/mineTop.png');

        this.sideMaterial = new CGFappearance(this.scene);
        this.sideMaterial.setAmbient(0.6, 0.6, 0.6, 1.0);
        this.sideMaterial.setDiffuse(0.7, 0.7, 0.7, 1.0);
        this.sideMaterial.setSpecular(0.1, 0.1, 0.1, 1.0); 
        this.sideMaterial.setShininess(10.0);
        this.sideMaterial.loadTexture('images/mineSide.png');

        this.bottomMaterial = new CGFappearance(this.scene);
        this.bottomMaterial.setAmbient(0.6, 0.6, 0.6, 1.0);
        this.bottomMaterial.setDiffuse(0.7, 0.7, 0.7, 1.0);
        this.bottomMaterial.setSpecular(0.1, 0.1, 0.1, 1.0); 
        this.bottomMaterial.setShininess(10.0);
        this.bottomMaterial.loadTexture('images/mineBottom.png');
    }
    display() {

        this.bottomMaterial.apply();

        if (this.scene.nearestFilter) {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        }

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        this.sideMaterial.apply();
        
        if (this.scene.nearestFilter) {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        }

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5); 
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(3 * Math.PI/2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        this.topMaterial.apply();

        if (this.scene.nearestFilter) {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        }

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();
    }
}