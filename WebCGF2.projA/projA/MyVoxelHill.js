

class MyVoxelHill extends CGFobject {

    constructor(scene, levels, hillSize) {
        super(scene);
        this.levels = levels;
        this.hillSize = hillSize;

        this.cube = new MyUnitCubeQuad(this.scene);
        // this.initTextures();
    }

    // initTextures() {
    //     this.sideTexture = new CGFtexture(this.scene, 'images/mineSide.png');
    //     this.topTexture = new CGFtexture(this.scene, 'images/mineTop.png');
    //     this.bottomTexture = new CGFtexture(this.scene, 'images/mineBottom.png');
    // }

    enableNormalViz() {
        this.cube.enableNormalViz();
    }
    
    disableNormalViz() {
        this.cube.disableNormalViz();
    }

    display() {

        this.scene.pushMatrix();
        this.scene.scale(this.hillSize, this.hillSize, this.hillSize);

        for (var i = 0; i < this.levels; i++) {
    	    var squareSide = 2*i + 1;

    	    // desenhar primeira fila
            for (var j = 0; j < squareSide; j++) {
    	        this.scene.pushMatrix();
    	        this.scene.translate(-i + j, this.levels - i - 0.5, -i);
    	        this.cube.display();
    	        this.scene.popMatrix();
    	    }

    	    // desenhar filas intermédias
    	    for (var j = 1; j < squareSide - 1; j++) {
    	    	this.scene.pushMatrix();
                this.scene.translate(-i, this.levels - i - 0.5, -i + j);
                this.cube.display();
    	    	this.scene.popMatrix();

    	    	this.scene.pushMatrix();
                this.scene.translate(i, this.levels - i - 0.5, -i + j);
                this.cube.display();
    	    	this.scene.popMatrix();
    	    }

    	    // desenhar última fila
    	    for (var j = 0; j < squareSide; j++) {
    	    	this.scene.pushMatrix();
    	    	this.scene.translate(-i + j, this.levels - i - 0.5, i);
    	    	this.cube.display();
    	    	this.scene.popMatrix();
    	    }

    	    // DONE!!
        }

        this.scene.popMatrix();
    }

}