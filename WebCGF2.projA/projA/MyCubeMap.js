/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);
            this.initBuffers();
            this.initMaterials();
	}
	initBuffers() {

            var side = 600;

		this.vertices = [ // cada vertice vai ter 3 normais porque vai estar em 3 faces com orientacoes diferentes
            
                  -(side/2), -(side/2), -(side/2), 
                  -(side/2), -(side/2), -(side/2),
                  -(side/2), -(side/2), -(side/2),
      
                  (side/2), -(side/2), -(side/2),  
                  (side/2), -(side/2), -(side/2),
                  (side/2), -(side/2), -(side/2),
      
                  -(side/2), (side/2), -(side/2),  
                  -(side/2), (side/2), -(side/2),
                  -(side/2), (side/2), -(side/2),
      
                  (side/2), (side/2), -(side/2),  
                  (side/2), (side/2), -(side/2),
                  (side/2), (side/2), -(side/2),
                  
                  -(side/2), -(side/2), (side/2),
                  -(side/2), -(side/2), (side/2),
                  -(side/2), -(side/2), (side/2),
      
                  (side/2), -(side/2), (side/2),
                  (side/2), -(side/2), (side/2),
                  (side/2), -(side/2), (side/2),
      
                  -(side/2), (side/2), (side/2),
                  -(side/2), (side/2), (side/2),
                  -(side/2), (side/2), (side/2),
      
                  (side/2), (side/2), (side/2),
                  (side/2), (side/2), (side/2),
                  (side/2), (side/2), (side/2)
		];

            this.normals = [

                  0, 0, 1,
                  0, 1, 0,
                  1, 0, 0, // 2

                  0, 0, 1,
                  0, 1, 0,
                  -1, 0, 0, // 5

                  0, 0, 1,
                  0, -1, 0,
                  1, 0, 0, // 8

                  0, 0, 1,
                  0, -1, 0,
                  -1, 0, 0, // 11

                  0, 0, -1,
                  0, 1, 0,
                  1, 0, 0, // 14

                  0, 0, -1,
                  0, 1, 0,
                  -1, 0, 0, // 17

                  0, 0, -1,
                  0, -1, 0,
                  1, 0, 0, // 20

                  0, 0, -1,
                  0, -1, 0,
                  -1, 0, 0, // 23
            ];

		// Counter-clockwise reference of vertices
		this.indices = [
                  0, 3, 6, // definem a face
                  6, 3, 9, // virada para baixo

                  12, 18, 15, // definem a face
                  15, 18, 21, // virada para cima

                  1, 16, 4, // definem a face
                  1, 13, 16, // perpendicular ao eixo do y, no lado negativo

                  7, 10, 22, // definem a face
                  7, 22, 19, // perpendicular ao eixo do y, no lado positivo

                  11, 5, 17, // definem a face
                  17, 23, 11, // perpendicular ao eixo do x, no lado positivo

                  2, 20, 14, // definem a face
                  8, 20, 2 // perpendicular ao eixo do x, no lado negativo
            ];

            var margin = 0.0005;

            this.texCoords = [
                  1/4 + margin,     2/3 - margin,     // 0
                  1/4 + margin,     2/3 - margin,     // 1
                  1/4 + margin,     2/3 - margin,     // 2

                  0,                2/3 - margin,     // 3
                  1/4 + margin,     1,                // 4
                  1,                2/3 - margin,     // 5
                  
                  1/4 + margin,     1/3 + margin,     // 6
                  1/4 + margin,     1/3 + margin,     // 7
                  1/4 + margin,     1/3 + margin,     // 8
                  
                  0,                1/3 + margin,     // 9
                  1/4 + margin,     0,                // 10
                  1,                1/3 + margin,     // 11
                  
                  1/2 - margin,     2/3 - margin,     // 12
                  1/2 - margin,     2/3 - margin,     // 13
                  1/2 - margin,     2/3 - margin,     // 14
                  
                  3/4,              2/3 - margin,     // 15
                  1/2 - margin,     1,                // 16
                  3/4,              2/3 - margin,     // 17
                  
                  1/2 - margin,     1/3 + margin,     // 18
                  1/2 - margin,     1/3 + margin,     // 19
                  1/2 - margin,     1/3 + margin,     // 20
                  
                  3/4,              1/3 + margin,     // 21
                  1/2 - margin,     0,                // 22
                  3/4,              1/3 + margin      // 23
            ]

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
      }
      initMaterials() {
            this.material = new CGFappearance(this.scene);
            this.material.setAmbient(0.6, 0.6, 0.6, 1.0);
            this.material.setDiffuse(0.7, 0.7, 0.7, 1.0);
            this.material.setSpecular(0.1, 0.1, 0.1, 1.0);
            this.material.setShininess(10.0);
            this.material.loadTexture('images/CubeMap.png');
            this.material.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
      }
}