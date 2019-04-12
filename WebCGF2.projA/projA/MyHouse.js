class MyHouse extends CGFobject {

    constructor(scene, houseSize, wallTex, doorTex, balconyTex, roofTex, porchTex, columnTex, welcomeMatTex, windowTex) {
        super(scene);
        // this.initTextures();

        this.houseSize = houseSize;
        this.wallTex = wallTex;
        this.doorTex = doorTex;
        this.balconyTex = balconyTex;
        this.roofTex = roofTex;
        this.porchTex = porchTex;
        this.columnTex = columnTex;
        this.welcomeMatTex = welcomeMatTex;
        this.windowTex = windowTex;

        this.cube = new MyUnitCubeQuad(this.scene, 'REPEAT'); //will be used for the walls, porch, stairs, etc
        this.bigColumn = new MyPrism(this.scene, 6);
        this.smallColumn = new MyCylinder(this.scene, 6);
        this.multiPurposeQuad = new MyQuad(this.scene);
        this.roof = new MyPyramid(this.scene, 4, 1);
        this.roof.adjustToRoof();
    }

    // initTextures() { //para guardar as texturas da casa

    // }

    enableNormalViz() {
        this.cube.enableNormalViz();
        this.bigColumn.enableNormalViz();
        this.smallColumn.enableNormalViz();
        this.roof.enableNormalViz();
        this.multiPurposeQuad.enableNormalViz();
    }
    
    disableNormalViz() {
        this.cube.disableNormalViz();
        this.bigColumn.disableNormalViz();
        this.smallColumn.disableNormalViz();
        this.roof.disableNormalViz();
        this.multiPurposeQuad.disableNormalViz();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(this.houseSize, this.houseSize, this.houseSize); //will scale all the house components

        //walls of the house (1st floor)
        this.cube.setTextures(this.wallTex, this.balconyTex, undefined);
        this.scene.pushMatrix();
        this.scene.translate(-0.7, 0, -2);
        this.scene.scale(4, 2, 5);
        this.scene.translate(0, 0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

        //window to the house
        this.scene.diffuseMaterial.setTexture(this.windowTex);
        this.scene.diffuseMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(-1.8, 1, 0.501);
        this.multiPurposeQuad.display();
        this.scene.popMatrix();

        //door of the house (1st floor)
        this.scene.diffuseMaterial.setTexture(this.doorTex);
        this.scene.diffuseMaterial.apply();
        this.scene.pushMatrix();
        this.scene.scale(0.45, 0.9, 1);
        this.scene.translate(0, 0.7, 0.51);
        this.multiPurposeQuad.display();
        this.scene.popMatrix();

        //welcome mat of the house
        this.scene.diffuseMaterial.setTexture(this.welcomeMatTex);
        this.scene.diffuseMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0.201, 0.8);
        this.scene.scale(0.7, 1, 0.5)
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.multiPurposeQuad.display();
        this.scene.popMatrix();

        //walls of the house (2nd floor)
        this.cube.setTextures(this.wallTex, this.balconyTex, undefined);
        this.scene.pushMatrix();
        this.scene.translate(-0.7, 2, -3.25);
        this.scene.scale(4, 1.6, 2.5);
        this.scene.translate(0, 0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

        //stairs to the house (smaller step)
        this.cube.setTextures(this.columnTex, this.porchTex, undefined);
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1.5 + 1/6);
        this.scene.scale(3/4, 1/10, 1/6);
        this.scene.translate(0, 0.5, 0.5);
        this.cube.display();
        this.scene.popMatrix();
        
        //stairs to the house (bigger step)
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1.5);
        this.scene.scale(3/4, 1/5, 1/6);
        this.scene.translate(0, 0.5, 0.5);
        this.cube.display();
        this.scene.popMatrix();

        //patio/porch of the house
        this.cube.setTextures(this.porchTex, undefined, undefined);
        this.scene.pushMatrix();
        this.scene.scale(2, 1, 1);
        this.scene.scale(1, 1/5, 1);
        this.scene.translate(0, 0.5, 0);
        this.scene.translate(0, 0, 1);
        this.cube.display();
        this.scene.popMatrix();

        //porch column
        this.scene.matteMaterial.setTexture(this.columnTex);
        this.scene.matteMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.8, 1/5, 1.3);
        this.scene.scale(1/15, 1, 1/15);
        this.smallColumn.display();
        this.scene.popMatrix();

        //another porch column
        this.scene.matteMaterial.setTexture(this.columnTex);
        this.scene.matteMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.8, 1/5, 1.3);
        this.scene.scale(1/15, 1, 1/15);
        this.smallColumn.display();
        this.scene.popMatrix();

        //ceiling over the porch
        this.cube.setTextures(this.porchTex, undefined, undefined);
        this.scene.pushMatrix();
        this.scene.translate(0, 6/5, 0);
        this.scene.scale(2.001, 1/5, 1.001);
        this.scene.translate(0, 0.5, 1);
        this.cube.display();
        this.scene.popMatrix();

        //roof of the porch
        this.scene.matteMaterial.setTexture(this.roofTex);
        this.scene.matteMaterial.apply();
        this.scene.pushMatrix();
        this.scene.scale(1.42, 1, 1.42);
        this.scene.translate(0, 0, 0.35);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.translate(0, 1.4, 0);
        this.scene.scale(1, 0.60, 1);
        this.roof.display();
        this.scene.popMatrix();

        //column of the balcony (1 of 4)
        this.scene.matteMaterial.setTexture(this.columnTex);
        this.scene.matteMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(1, 2, 0.2);
        this.scene.scale(1/7, 1.3, 1/7);
        this.bigColumn.display();
        this.scene.popMatrix();

        //column of the balcony (2 of 4)
        this.scene.pushMatrix();
        this.scene.translate(-2.4, 2, 0.2);
        this.scene.scale(1/7, 1.3, 1/7);
        this.bigColumn.display();
        this.scene.popMatrix();

        //column of the balcony (3 of 4)
        this.scene.pushMatrix();
        this.scene.translate(-2.4, 2, -1.6);
        this.scene.scale(1/7, 1.3, 1/7);
        this.bigColumn.display();
        this.scene.popMatrix();

        //column of the balcony (4 of 4)
        this.scene.pushMatrix();
        this.scene.translate(1, 2, -1.6);
        this.scene.scale(1/7, 1.3, 1/7);
        this.bigColumn.display();
        this.scene.popMatrix();

        //roof of the balcony
        this.scene.pushMatrix();
        this.scene.translate(-0.7, 3.3, -2);
        this.scene.scale(4.001, 0.3, 5.001);
        this.scene.translate(0, 0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

        //roof of the house
        this.scene.matteMaterial.setTexture(this.roofTex);
        this.scene.matteMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.7, 3.6, -2);
        this.scene.scale(2.83, 1, 3.53);
        this.scene.rotate(Math.PI / 4, 0, 1, 0);
        this.roof.display();
        this.scene.popMatrix();

        //little shed (walls)
        this.cube.setTextures(this.wallTex, this.balconyTex, undefined);
        this.scene.pushMatrix();
        this.scene.translate(-4, 0, -2);
        this.scene.scale(1.5, 1.5, 1.5);
        this.scene.translate(0, 0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

        //little shed (roof)
        this.scene.matteMaterial.setTexture(this.roofTex);
        this.scene.matteMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(-4, 1.5, -2);
        this.scene.scale(1.07, 1.07, 1.07);
        this.scene.rotate(Math.PI / 4, 0, 1, 0);
        this.roof.display();
        this.scene.popMatrix();


        this.scene.popMatrix();
    }
}