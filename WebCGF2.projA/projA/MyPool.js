// NOTA: isto nao era um requisito do trabalho.
// Optamos por criar e acrescentar tambem este objeto
// a cena, de modo a podermos mostrar, de uma maneira mais clara,
// o material especular.

class MyPool extends CGFobject {

    constructor(scene, poolSize, waterTex, floorTex) {
        super(scene);

        this.poolSize = poolSize;
        this.waterTex = waterTex;
        this.floorTex = floorTex;

        this.floor = new MyUnitCubeQuad(this.scene, 'REPEAT');
        this.water = new MyQuad(this.scene);
    }

    enableNormalViz() {
        this.floor.enableNormalViz();
        this.water.enableNormalViz();
    }

    disableNormalViz() {
        this.floor.disableNormalViz();
        this.water.disableNormalViz();
    }

    display() {

        this.scene.pushMatrix();
        this.scene.scale(this.poolSize, this.poolSize, this.poolSize);

        // floors

        this.floor.setTextures(this.floorTex, this.floorTex, this.floorTex);
        this.scene.pushMatrix();
        this.scene.translate(3, 0, 0);
        this.scene.scale(1, 0.2, 10);
        this.scene.translate(0, 0.5, 0);
        this.floor.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-3, 0, 0);
        this.scene.scale(1, 0.2, 10);
        this.scene.translate(0, 0.5, 0);
        this.floor.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 4.5);
        this.scene.scale(5, 0.2, 1);
        this.scene.translate(0, 0.5, 0);
        this.floor.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -4.5);
        this.scene.scale(5, 0.2, 1);
        this.scene.translate(0, 0.5, 0);
        this.floor.display();
        this.scene.popMatrix();

        // water
        this.scene.specularMaterial.setTexture(this.waterTex);
        this.scene.specularMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0.05, 0);
        this.scene.scale(5, 1, 10);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.water.display();
        this.scene.popMatrix();


        this.scene.popMatrix();
    }

}