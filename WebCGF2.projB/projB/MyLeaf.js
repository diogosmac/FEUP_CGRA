
class MyLeaf extends CGFobject {
    constructor(scene) {
        super(scene);

        this.length = 3;

        this.triangle = new MyTriangle(scene);
        this.init();
    }

    init() {
        this.texture = new CGFtexture(this.scene, "images/LeafTexture.png");
        
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.4, 0.9, 0.4, 1);
        this.material.setDiffuse(0.4, 0.9, 0.4, 1);
        this.material.setSpecular(0, 0, 0, 1);
        this.material.setShininess(10.0);
    }

    display() {
        this.material.setTexture(this.texture);
        this.material.apply();

        this.scene.pushMatrix();
        this.scene.scale(this.length, this.length, this.length);
        this.triangle.display();
        this.scene.popMatrix();
    }
}