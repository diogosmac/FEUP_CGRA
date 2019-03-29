

class MyHouse extends CGFobject {

    constructor(scene, houseSize) {
        super(scene);
        // this.initTextures();

        this.houseSize = houseSize;

        this.cube = new MyUnitCubeQuad(this.scene); //will be used for the walls, porch, stairs, etc
        this.column = new MyPrism(this.scene, 7);
        this.roof = new MyPyramid(this.scene, 4, 1);
        this.fence = new MyQuad(this.scene);
    }

    // initTextures() { //para guardar as texturas da casa

    // }

    enableNormalViz() {
        this.cube.enableNormalViz();
        this.column.enableNormalViz();
        this.roof.enableNormalViz();
        this.fence.enableNormalViz();
    }
    
    disableNormalViz() {
        this.cube.disableNormalViz();
        this.column.disableNormalViz();
        this.roof.enableNormalViz();
        this.fence.disableNormalViz();
    }

    display() {
        this.scene.scale(this.houseSize, this.houseSize, this.houseSize); //vai aumentar todas as componentes da casa

        //walls of the house
        this.scene.pushMatrix();
        this.scene.scale(1.5, 1, 1);
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
        this.scene.scale(1.5, 1, 1);
        this.scene.scale(1, 1/5, 1);
        this.scene.translate(0, 0.5, 0);
        this.scene.translate(0, 0, 1);
        this.cube.display();
        this.scene.popMatrix();

        //fazer colunas
    }




}