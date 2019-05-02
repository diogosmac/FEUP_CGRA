
class MyBranch extends CGFobject {
    constructor(scene) {
        super(scene);

        this.cilinder = new MyCylinder(this, 4);
        this.init();
    }

    init() {
        this.texture = new CGFtexture(this.scene, "textures/trunkTexture.jpg");
        
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.5, 0.5, 0.5, 1);
        this.material.setDiffuse(0.7, 0.7, 0.7, 1);
        this.material.setSpecular(0.2, 0.2, 0.2, 1);
        this.material.setShininess(10.0);
    }

    display() {
        // this.material.setTexture(this.texture);
        this.material.apply();
        this.cilinder.display();
    }
}