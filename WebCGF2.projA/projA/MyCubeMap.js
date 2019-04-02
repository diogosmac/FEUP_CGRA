/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);
        this.quad = new MyQuad(this.scene);
        this.initMaterials();
    }
    
    initMaterials() {

        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.6, 0.6, 0.6, 1.0);
        this.material.setDiffuse(0.7, 0.7, 0.7, 1.0);
        this.material.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.material.setShininess(10.0);

        this.upTexture = new CGFtexture(this.scene, 'images/testCubeMap_up.png');
        this.frontTexture = new CGFtexture(this.scene, 'images/testCubeMap_front.png');
        this.leftTexture = new CGFtexture(this.scene, 'images/testCubeMap_left.png');
        this.backTexture = new CGFtexture(this.scene, 'images/testCubeMap_back.png');
        this.rightTexture = new CGFtexture(this.scene, 'images/testCubeMap_right.png');
        this.downTexture = new CGFtexture(this.scene, 'images/testCubeMap_down.png');
    }

    enableNormalViz() {
        this.quad.enableNormalViz();
    }
    
    disableNormalViz() {
        this.quad.disableNormalViz();
    }

    display() {

        this.material.setTexture(this.upTexture);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.material.apply();

        this.scene.pushMatrix();

        this.scene.scale(200, 200, 200);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);

        this.quad.display(); //face de cima

        this.scene.popMatrix();


        this.material.setTexture(this.frontTexture);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.material.apply();

        this.scene.pushMatrix();

        this.scene.scale(200, 200, 200);
        this.scene.translate(0, 0, -0.5);

        this.quad.display(); //face da frente

        this.scene.popMatrix();


        this.material.setTexture(this.leftTexture);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.material.apply();

        this.scene.pushMatrix();

        this.scene.scale(200, 200, 200);
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);

        this.quad.display(); //face da esquerda

        this.scene.popMatrix();
        
        
        this.material.setTexture(this.backTexture);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.material.apply();

        this.scene.pushMatrix();

        this.scene.scale(200, 200, 200);
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(Math.PI , 0, 1, 0);

        this.quad.display(); //face de trás

        this.scene.popMatrix();
        
        
        this.material.setTexture(this.rightTexture);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.material.apply();

        this.scene.pushMatrix();

        this.scene.scale(200, 200, 200);
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);

        this.quad.display(); //face da direita

        this.scene.popMatrix();
        
        
        this.material.setTexture(this.downTexture);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.material.apply();
        
        this.scene.pushMatrix();
    
        this.scene.scale(200, 200, 200);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);

        this.quad.display(); //face de baixo

        this.scene.popMatrix();

    }

}