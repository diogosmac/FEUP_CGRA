class MyTreeBranch extends CGFobject {
    constructor(scene, x, z, orientation) {
        super(scene);
        this.x = x;
        this.z = z;
        this.orientation = orientation;

        this.width = 3.5;
        this.radius = 0.15;

        this.initTextures();

        this.branch = new MyCylinder(this.scene, 10);
    }

    initTextures() {
        this.branchTexture = new CGFtexture(this.scene, 'images/trunkTexture.png');
    }

    collidedWithBird(bird) {

    }


    display() {
        this.scene.diffuseMaterial.setTexture(this.branchTexture);
        this.scene.diffuseMaterial.apply();

        this.scene.pushMatrix();

        this.scene.translate(this.x, 0, this.z);

        this.scene.rotate(this.orientation, 0, 1, 0);

        this.scene.translate(1.75, 0.15, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.scale(this.radius, this.width, this.radius);
        this.branch.display();
        this.scene.popMatrix();
    }
    
}