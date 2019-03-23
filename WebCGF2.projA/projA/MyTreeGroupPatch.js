
class MyTreeGroupPatch extends CGFobject {
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


        for (var z = 0; z < 3; z++) {

            for (var x = 0; x < 3; x++) {

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
                // fluctuate inside the correspondent "square" in the 3x3 grid
                // example: for scale = 1.10 and maxScale = 1.25,
                // x takes a value in [-0.15; 0.15]
                
                var zVal = Math.floor(Math.random() * range * 2 - range + 1) / 100;
                // z is a random value between negative and positive values
                // of (maxScale - scale), and makes the tree's position 
                // fluctuate inside the correspondent "square" in the 3x3 grid
                // example: for scale = 1.10 and maxScale = 1.25,
                // z takes a value in [-0.15; 0.15]

                var squareSide = this.maxCircumference * maxScale * 2;
                var treeX = (squareSide * x + xVal * this.maxCircumference);
                var treeZ = (squareSide * z + zVal * this.maxCircumference);

                this.xPositions.push(treeX);
                this.zPositions.push(treeZ);

                if (scale + Math.abs(xVal) > maxScale) {
                    console.log("x error: tree number ", z*3 + x);
                }
                if (scale + Math.abs(zVal) > maxScale) {
                    console.log("z error: tree number ", z*3 + x);
                }

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

        for (var z = 0; z < 3; z++) {

            for (var x = 0; x < 3; x++) {
            
                this.scene.pushMatrix();
                
                var index = 3*z + x;
                // index to access the buffers
                                
                var treeX = this.xPositions[index];
                var treeZ = this.zPositions[index];

                this.scene.translate(treeX, 0, treeZ);

                this.scene.scale(this.scaleOffsets[index], 
                                this.scaleOffsets[index], 
                                this.scaleOffsets[index]);

                this.tree.display();


                this.scene.popMatrix();
            }

        }

    }

}