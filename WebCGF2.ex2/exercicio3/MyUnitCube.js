/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,
            -0.5, 0.5, -0.5,
            0.5, 0.5, -0.5,
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            -0.5, 0.5, 0.5,
            0.5, 0.5, 0.5
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            0, 3, 1, //definem a face
            0, 2, 3, //virada para baixo

            4, 7, 6, //definem a face
            4, 5, 7, //virada para cima

            0, 5, 4, //definem a face
            0, 1, 5, //perpendicular ao eixo do y, no lado negativo

            3, 6, 7, //definem a face
            3, 2, 6, //perpendicular ao eixo do y, no lado positivo

            1, 3, 5, //definem a face
            3, 7, 5, //perpendicular ao eixo do x, no lado positivo

            2, 4, 6, //definem a face
            0, 4, 2 //perpendicular ao eixo do x, no lado negativo
		];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}