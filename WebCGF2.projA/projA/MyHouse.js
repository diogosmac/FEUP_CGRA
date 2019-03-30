

class MyHouse extends CGFobject {

    constructor(scene, houseSize) {
        super(scene);
        // this.initTextures();

        this.houseSize = houseSize;

        this.cube = new MyUnitCubeQuad(this.scene); //will be used for the walls, porch, stairs, etc
        this.column = new MyPrism(this.scene, 6);
        this.roof = new MyPyramid(this.scene, 4, 1);
    }

    // initTextures() { //para guardar as texturas da casa

    // }

    enableNormalViz() {
        this.cube.enableNormalViz();
        this.column.enableNormalViz();
        this.roof.enableNormalViz();
    }
    
    disableNormalViz() {
        this.cube.disableNormalViz();
        this.column.disableNormalViz();
        this.roof.disableNormalViz();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(this.houseSize, this.houseSize, this.houseSize); //will scale all the house components

        //walls of the house (1st floor)
        this.scene.pushMatrix();
        this.scene.translate(-0.7, 0, -2);
        this.scene.scale(4, 2, 5);
        this.scene.translate(0, 0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

        //walls of the house (2nd floor)
        this.scene.pushMatrix();
        this.scene.translate(-0.7, 2, -3.25);
        this.scene.scale(4, 1.6, 2.5);
        this.scene.translate(0, 0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

        //stairs to the house (smaller step)
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
        this.scene.pushMatrix();
        this.scene.scale(2, 1, 1);
        this.scene.scale(1, 1/5, 1);
        this.scene.translate(0, 0.5, 0);
        this.scene.translate(0, 0, 1);
        this.cube.display();
        this.scene.popMatrix();

        //porch column
        this.scene.pushMatrix();
        this.scene.translate(-0.8, 1/5, 1.3);
        this.scene.scale(1/15, 1, 1/15);
        this.column.display();
        this.scene.popMatrix();

        //another porch column
        this.scene.pushMatrix();
        this.scene.translate(0.8, 1/5, 1.3);
        this.scene.scale(1/15, 1, 1/15);
        this.column.display();
        this.scene.popMatrix();

        //roof of the porch
        this.scene.pushMatrix();
        this.scene.translate(0, 6/5, 0);
        this.scene.scale(2, 1/5, 1);
        this.scene.translate(0, 0.5, 1);
        this.cube.display();
        this.scene.popMatrix();

        //column of the balcony (1 of 4)
        this.scene.pushMatrix();
        this.scene.translate(1, 2, 0.2);
        this.scene.scale(1/7, 1.3, 1/7);
        this.column.display();
        this.scene.popMatrix();

        //column of the balcony (2 of 4)
        this.scene.pushMatrix();
        this.scene.translate(-2.4, 2, 0.2);
        this.scene.scale(1/7, 1.3, 1/7);
        this.column.display();
        this.scene.popMatrix();

        //column of the balcony (3 of 4)
        this.scene.pushMatrix();
        this.scene.translate(-2.4, 2, -1.6);
        this.scene.scale(1/7, 1.3, 1/7);
        this.column.display();
        this.scene.popMatrix();

        //column of the balcony (4 of 4)
        this.scene.pushMatrix();
        this.scene.translate(1, 2, -1.6);
        this.scene.scale(1/7, 1.3, 1/7);
        this.column.display();
        this.scene.popMatrix();

        //roof of the balcony
        this.scene.pushMatrix();
        this.scene.translate(-0.7, 3.3, -0.75);
        this.scene.scale(4, 0.3, 2.5);
        this.scene.translate(0, 0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

        //roof of the house (FALTA ALINHAR)
        this.scene.pushMatrix();
        this.scene.translate(-0.7, 3.6, -2);
        this.scene.scale(2.8, 1, 3.6);
        this.scene.rotate(Math.PI / 4, 0, 1, 0);
        this.roof.display();
        this.scene.popMatrix();

        //little shed (walls)
        this.scene.pushMatrix();
        this.scene.translate(-4, 0, -2);
        this.scene.scale(1.5, 1.5, 1.5);
        this.scene.translate(0, 0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

        //little shed (roof) (FALTA ALINHAR O TELHADO)
        this.scene.pushMatrix();
        this.scene.translate(-4, 1.5, -2);
        this.scene.scale(1.5, 1.5, 1.5);
        this.scene.rotate(Math.PI / 4, 0, 1, 0);
        this.roof.display();
        this.scene.popMatrix();


        this.scene.popMatrix();
    }




}