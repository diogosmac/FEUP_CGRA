

class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }

    initBuffers() {
    
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var deltaAng = 2 * Math.PI / this.slices; //angle diference between vertices

        for(var i = 0; i < this.slices; i++, ang += deltaAng) {

            var cos = Math.cos(ang);
            var sin = Math.sin(ang);

            //define the two vertices of a vertical edge
            this.vertices.push(cos, 0, sin);
            this.vertices.push(cos, 1, sin);

            //add normals for the newly created vertices
            var normal = [cos, 0, sin];
            var normalSize = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]);
            normal[0] /= normalSize;
            normal[1] /= normalSize;
            normal[2] /= normalSize;
            this.normals.push(...normal);
            this.normals.push(...normal);


            //define a face
            this.indices.push(2*i, (2*i+1) % (this.slices * 2), (2*i+3) % (this.slices * 2));
            this.indices.push(2*i, (2*i+3) % (this.slices * 2), (2*i+2) % (this.slices * 2));
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

}