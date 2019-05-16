// class to be used for displaying the bird's wings

class MyQuadWing extends CGFobject {

    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0,	//0
			0.5, -0.5, 0,	//1
			-0.5, 0.5, 0,	//2
			0.5, 0.5, 0		//3
        
            -0.5, -0.5, 0,	//4
			0.5, -0.5, 0,	//5
			-0.5, 0.5, 0,	//6
			0.5, 0.5, 0		//7
        ];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
            1, 3, 2,
            
            4, 5, 6,
            5, 7, 6
		];


		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
        
            0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
        ];
		
		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

		this.texCoords = [
			0, 1,
			1, 1,
			0, 0,
            1, 0,

            0, 1,
			1, 1,
			0, 0,
			1, 0
		]
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}