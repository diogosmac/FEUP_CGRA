/**
* MyPrism
* @constructor
*/
class MyPrism extends CGFobject {
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

        var faceWidth = 1 / this.slices;

        var ang = 0;
        var deltaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++, ang += deltaAng){

            var sinAng=Math.sin(ang);
            var sinAngPlusAlpha=Math.sin(ang+deltaAng);
            var cosAng=Math.cos(ang);
            var cosAngPlusAlpha=Math.cos(ang+deltaAng);

            this.vertices.push(cosAng, 1, -sinAng);
            this.vertices.push(cosAngPlusAlpha, 1, -sinAngPlusAlpha);
            this.vertices.push(cosAngPlusAlpha, 0, -sinAngPlusAlpha);
            this.vertices.push(cosAng, 0, -sinAng);

            var normal= [
                sinAngPlusAlpha-sinAng,
                0,
                cosAngPlusAlpha-cosAng
            ];

            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push((4*i), (4*i+1) , (4*i+2));
            this.indices.push((4*i) , (4*i+2) , (4*i+3))

            this.indices.push((4*i+2), (4*i+1), (4*i));
            this.indices.push((4*i+3), (4*i+2), (4*i));

            var currentCoord = [
                i * faceWidth, 0,
                (i + 1) * faceWidth, 0,
                (i + 1) * faceWidth, 1,
                i * faceWidth, 1,
            ];

            this.texCoords.push(...currentCoord);

        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
}


