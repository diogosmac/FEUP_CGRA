class MyNest extends CGFobject {
    constructor(scene, x, z, diameter) {
        super(scene);

        this.initTextures();

        this.x = x;
        this.z = z;
        this.diameter = diameter;

        this.nest = new MyCylinder(this.scene, 10);

        this.branches = [];
    }

    initTextures() {
        this.nestTexture = new CGFtexture(this.scene, 'images/nestTexture.jpg');
    }

    collidedWithBird(bird) {
        var xLowerLimit = this.x - this.diameter + 0.3;
        var xUpperLimit = this.x + this.diameter - 0.3;
        var zLowerLimit = this.z - this.diameter + 0.3;
        var zUpperLimit = this.z + this.diameter - 0.3;

        if((xLowerLimit < bird.xPosition) && (xUpperLimit > bird.xPosition) &&
           (zLowerLimit < bird.zPosition) && (zUpperLimit > bird.zPosition))
           return true;

        return false;
    }

    display() {

        this.scene.diffuseMaterial.setTexture(this.nestTexture);
        this.scene.diffuseMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(this.x, 0, this.z);
        

        // Nest

        this.scene.pushMatrix();
        this.scene.scale(this.diameter, 1, this.diameter);
        this.nest.display();
        this.scene.popMatrix();


        // Branches that it might have

        for(var i = 0; i < this.branches.length; i++) {
            this.branches[i].display();
        }

        this.scene.popMatrix();
    }
}