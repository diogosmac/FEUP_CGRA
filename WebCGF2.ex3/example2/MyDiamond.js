/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyDiamond extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			-1, 0, 0,	// 0
			0, -1, 0,	// 1
			0, 1, 0,	// 2
			1, 0, 0,	// 3
			
			-1, 0, 0,	// 4
			0, -1, 0,	// 5
			0, 1, 0, 	// 6
			1, 0, 0		// 7
		];

		// Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			1, 3, 2,
			6, 5, 4,
			5, 6, 7
		];

		this.normals = [];
		for (var i = 0; i < (this.vertices.length / 2); i += 3) {
			this.normals.push(0, 0, 1);
		}
		for (var i = (this.vertices.length / 2); i < this.vertices.length; i += 3) {
			this.normals.push(0, 0, -1);
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

