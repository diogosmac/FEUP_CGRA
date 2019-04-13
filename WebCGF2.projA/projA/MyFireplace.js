// NOTA: isto nao era um requisito do trabalho.
// Optamos por criar e acrescentar tambem este objeto
// a cena, de modo a podermos mostrar, de uma maneira mais clara,
// o material especular.

class MyFireplace extends CGFobject {

    constructor(scene, size, baseTex, stickTex, rockTex, fireTex) {
        super(scene);

        this.size = size;
        this.baseTex = baseTex;
        this.stickTex = stickTex;
        this.rockTex = rockTex;
        this.fireTex = fireTex;

        this.base = new MyQuad(this.scene);
        this.rock = new MyUnitCubeQuad(this.scene, 'REPEAT');
        this.treeLog = new MyUnitCubeQuad(this.scene, 'REPEAT');
        this.flame = new MyCone(this.scene, 10, 1);
    }

    enableNormalViz() {
        this.base.enableNormalViz();
        this.rock.enableNormalViz();
        this.treeLog.enableNormalViz();
        this.flame.enableNormalViz();
    }

    disableNormalViz() {
        this.base.disableNormalViz();
        this.rock.disableNormalViz();
        this.treeLog.disableNormalViz();
        this.flame.disableNormalViz();
    }

    display() {

        this.scene.pushMatrix();

        this.scene.scale(this.size, this.size, this.size);

        this.scene.matteMaterial.setTexture(this.baseTex);
        this.scene.matteMaterial.apply();

        this.scene.pushMatrix();
        this.scene.scale(5, 1, 5);
        this.scene.translate(0, 0.001, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.base.display();
        this.scene.popMatrix();
        

        this.treeLog.setTextures(this.stickTex, this.stickTex, this.stickTex);
        this.scene.matteMaterial.apply();

        this.scene.pushMatrix();
        for (var i = 0; i < 6; i++) {
            this.scene.pushMatrix();
            this.scene.rotate((2*Math.PI/6) * (i + 1/2), 0, 1, 0);
            this.scene.scale(2.5, 0.5, 0.5);
            this.scene.translate(0, 0.5, 0);
            this.treeLog.display();            
            this.scene.popMatrix();
        }
        this.scene.popMatrix();

        this.rock.setTextures(this.rockTex, this.rockTex, this.rockTex);
        this.scene.matteMaterial.apply();

        this.scene.pushMatrix();
        for (var i = 0; i < 6; i++) {
            this.scene.pushMatrix();
            this.scene.rotate((2*Math.PI/6) * (i + 1/2), 0, 1, 0);
            this.scene.translate(1.75, 0, 0);
            this.scene.scale(1, 0.5, 1);
            this.scene.translate(0, 0.5, 0);
            this.rock.display();
            this.scene.popMatrix();
        }
        this.scene.translate(0, 0.5, 0);
        for (var i = 0; i < 6; i++) {
            this.scene.pushMatrix();
            this.scene.rotate((2*Math.PI/6) * i, 0, 1, 0);
            this.scene.translate(1.75, 0, 0);
            this.scene.scale(1, 0.5, 1);
            this.scene.translate(0, 0.5, 0);
            this.rock.display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();

        this.scene.diffuseMaterial.setTexture(this.fireTex);
        this.scene.diffuseMaterial.apply();

        this.scene.pushMatrix();
        for (var i = 1; i <= 3; i++) {
            this.scene.pushMatrix();
            this.scene.translate(0, 0.5, 0);
            this.flame.display();
            this.scene.rotate((2*Math.PI/3) * i, 0, 1, 0);
            this.scene.scale(0.67, 1.5, 0.67);
            this.scene.translate(0.5, 0, 0);
            this.flame.display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}