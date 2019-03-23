
class MyTreeRowPatch extends CGFobject {
    constructor(scene,
                trunkHeight,
                trunkRadius,
                treeTopHeight,
                treeTopRadius,
                trunkTexture,
                treeTopTexture) {
        super(scene);

        this.tree = new MyTree(scene, trunkHeight, trunkRadius,
                              treeTopHeight, treeTopRadius,
                              trunkTexture, treeTopTexture);

        this.maxCircumference = Math.max(trunkRadius, treeTopRadius);

        this.scaleOffsets = [];
        // stores the different scaling sizes from
        // each tree in the patch, so that each of
        // them is different

        this.xPositions = [];
        // stores the x position of each tree, to
        // aid in speeding up the drawing process

        this.zPositions = [];
        // stores the z position of each tree, to
        // aid in speeding up the drawing process


        for (var i = 0; i < 6; i++) {

            var minScale = 0.75;
            var maxScale = 1.25;
 
            var scaleRange = (maxScale - minScale) * 100 + 1;
            var offset = minScale * 100;
 
            var scale = Math.floor(Math.random() * scaleRange + offset) / 100;
            // scale is a random value between minScale and maxScale,
            // and makes the trees' sizes deviate from
            // the values given as parameters
 
            this.scaleOffsets.push(scale);
 
            var range = ((maxScale - scale) * 2 * 100)/2;
            // range is an auxiliary value to help generate adequate
            // positions in x and z, for the trees not to overlap
            // with one another
            // example: for scale = 1.10 and maxScale = 1.25,
            // range = 16 (so random numbers belong to [0; 15])
 
            var xVal = Math.floor(Math.random() * range * 2 - range + 1) / 100;
            // x is a random value between negative and positive values
            // of (maxScale - scale), and makes the tree's position 
            // fluctuate inside the correspondent place in the 6x1 row
            // example: for scale = 1.10 and maxScale = 1.25,
            // x takes a value in [-0.15; 0.15]
                 
            var zVal = Math.floor(Math.random() * range * 6 - (range * 3) + 1) / 100;
            // z is a random value between negative and positive values
            // of 3*(maxScale - scale), and makes the tree's position 
            // fluctuate inside the correspondent place in the 6x1 row
            // example: for scale = 1.10 and maxScale = 1.25,
            // z takes a value in [-0.45; 0.45]
 
            var squareSide = this.maxCircumference * maxScale * 2;
            var treeX = (squareSide * i + xVal * this.maxCircumference);
            var treeZ = zVal * this.maxCircumference;
 
            this.xPositions.push(treeX);
            this.zPositions.push(treeZ);
 
            if (scale + Math.abs(xVal) > maxScale) {
                console.log("x error: tree number ", i);
            }

        }

    }
    
    enableNormalViz() {
        this.tree.enableNormalViz();
    }
    disableNormalViz() {
        this.tree.disableNormalViz();
    }

    display() {

        for (var i = 0; i < 6; i++) {
            this.scene.pushMatrix();

            var treeX = this.xPositions[i];
            var treeZ = this.zPositions[i];

            this.scene.translate(treeX, 0, treeZ);

            this.scene.scale(this.scaleOffsets[i],
                            this.scaleOffsets[i],
                            this.scaleOffsets[i]);

            this.tree.display();

            this.scene.popMatrix();
        }

    }

}