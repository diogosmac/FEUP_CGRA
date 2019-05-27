class MyNest extends CGFobject {
    constructor(scene) {
        super(scene);

        this.initTextures();

        this.nest = new MyCylinder(this.scene, 10);

        this.branches = [];
    }

    initTextures() {
        this.nestTexture = new CGFtexture(this.scene, 'images/nestTexture.jpg');
    }

    display() {

        this.scene.diffuseMaterial.setTexture(this.nestTexture);
        this.scene.diffuseMaterial.apply();

        this.scene.pushMatrix();

        this.scene.scale(3, 1, 3);

        this.nest.display();
        this.scene.popMatrix();
    }
}