

class MyCircle extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }

    initBuffers() {
    
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var deltaAng = 2 * Math.PI / this.slices; //angle diference between vertices

        var faceWidth = 1 / this.slices;

        for(var i = 0; i <= this.slices; i++, ang += deltaAng) {

            var cos = Math.cos(ang);
            var sin = Math.sin(ang);

            this.vertices.push(cos, 0, sin);

            //add normals for the newly created vertices
            this.normals.push(0, 1, 0);

        }

        for (var i = 0; i <= this.slices; i++, ang += deltaAng) {

            this.indices.push(this.slices + i, (i+1) % this.slices, i);

            var currentCoord = [
                1 - (i * faceWidth), 1,
                1 - (i * faceWidth), 0
            ];

            this.texCoords.push(...currentCoord);

        }

        this.vertices.push(0, 0, 0);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

}