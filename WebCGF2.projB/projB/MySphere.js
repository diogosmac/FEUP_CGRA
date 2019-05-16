class MySphere extends CGFobject {

    constructor(scene, slices, stacks, size) {
        super(scene);

        this.slices = slices;
        this.stacks = stacks;
        this.size = size;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.normals = [];
        this.indices = [];
        this.texCoords = [];

        var angHor = (2*Math.PI) / this.slices;
        var angVer = (2*Math.PI) / this.stacks;

        for (var stack = 0; stack <= this.stacks; stack++) {

            for (var slice = 0; slice <= this.slices; slice++) {

                var stackSin = Math.sin(stack * angVer);
                var stackCos = Math.cos(stack * angVer);
                var sliceSin = Math.sin(slice * angHor);
                var sliceCos = Math.cos(slice * angHor);

                this.vertices.push(
                    this.size * stackSin * sliceCos,
                    this.size * stackSin * sliceSin,
                    this.size * stackCos,
                );

                this.normals.push(
                    stackSin * sliceCos,
                    stackSin * sliceSin,
                    stackCos,
                );

                this.texCoords.push(
                    slice / this.slices, 
                    stack / this.stacks
                );

            }

        }

        for (var stack = 0; stack < this.stacks; stack++) {
            
            for (var slice = 0; slice < this.slices; slice++) {

                this.indices.push(
                    stack * (this.slices + 1) + slice,
                    (stack + 1) * (this.slices + 1) + slice,
                    (stack + 1) * (this.slices + 1) + slice + 1
                );

                this.indices.push(
                    stack * (this.slices + 1) + slice,
                    (stack + 1) * (this.slices + 1) + slice + 1,
                    stack * (this.slices + 1) + slice + 1
                );

            }

        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();

    }

}