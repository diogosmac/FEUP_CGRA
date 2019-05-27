class MyTerrain extends CGFobject {

    constructor(scene, width, height) {
        super(scene);

        this.initMaterialsAndTextures();
        this.initShaders();

        this.width = width;
        this.height = height;

        this.plane = new Plane(this.scene, 32);
    }

    initShaders() {
        this.heightShader = new CGFshader(this.scene.gl, "shaders/heightShader.vert", "shaders/heightShader.frag");
        this.heightShader.setUniformsValues({uSamplerHeightMap: 1});
        this.heightShader.setUniformsValues({uSamplerAltimetry: 2});
    }

    initMaterialsAndTextures() {
        // this.heightShader.setUniformsValues({uSampler: 0});
        this.terrainTexture = new CGFtexture(this.scene, "imagesProj/terrain.jpg");
        this.heightTexture = new CGFtexture(this.scene, "imagesProj/heightmapMod.jpg");
        this.altimetryTexture = new CGFtexture(this.scene, "imagesProj/altimetry.png");

        this.terrainMaterial = new CGFappearance(this.scene);
        this.terrainMaterial.setAmbient(0.6, 0.6, 0.6, 1.0);
        this.terrainMaterial.setDiffuse(0.7, 0.7, 0.7, 1.0);
        this.terrainMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.terrainMaterial.setShininess(10.0);
        this.terrainMaterial.setTexture(this.terrainTexture);
    }

    display() {

        // activate shader
		this.scene.setActiveShader(this.heightShader);

		// bind textures to texture units
        this.terrainMaterial.apply();
        this.heightTexture.bind(1);
        this.altimetryTexture.bind(2);
        
        // display plane
        this.scene.pushMatrix();
        this.scene.rotate(-0.5 * Math.PI, 1, 0, 0);
        this.scene.scale(this.width, this.height, 1);
        this.plane.display();
        this.scene.popMatrix();

        // restore default shader to draw rest of scene
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}