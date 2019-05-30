
class MyBranch extends CGFobject {
    constructor(scene) {
        super(scene);

        this.cilinder = new MyCylinder(scene, 4);
        this.init();
    }

    init() {
        this.texture = new CGFtexture(this.scene, "images/trunkTexture.png");
        
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.68, 0.40, 0.20, 1);
        this.material.setDiffuse(0.34, 0.20, 0.10, 1);
        this.material.setSpecular(0, 0, 0, 1);
        this.material.setShininess(10.0);
    }

    display() {
        this.material.setTexture(this.texture);
        this.material.apply();
        this.cilinder.display();
    }
}