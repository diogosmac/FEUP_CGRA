class MyTreeBranch extends CGFobject {
    constructor(scene, x, z, orientation) {
        super(scene);
        this.x = x;
        this.z = z;
        this.orientation = orientation;

        this.width = 3.5;
        this.radius = 0.1;

        this.initTextures();

        // if the bird is not holding the branch, the branch can be in its original position, with orienatation;
        // if the bird is holding the branch, the branch should not be in its original position;
        this.birdHoldingIt = false;

        this.branch = new MyCylinder(this.scene, 10);
    }

    initTextures() {
        this.branchTexture = new CGFtexture(this.scene, 'images/trunkTexture.png');
    }

    collidedWithBird(bird) {
        var birdCenterX = bird.xPosition * Math.cos(bird.orientation);
        var birdCenterZ = (bird.zPosition + 1) * Math.sin(bird.orientation);

        var totalDistance = Math.sqrt(Math.pow(this.x - birdCenterX, 2) + Math.pow(this.z - birdCenterZ, 2));

        console.log(totalDistance);

        if(totalDistance < 5)
            return true;

        return false;
    }


    display() {
        this.scene.diffuseMaterial.setTexture(this.branchTexture);
        this.scene.diffuseMaterial.apply();

        this.scene.pushMatrix();

        if(!this.birdHoldingIt) {
            this.scene.translate(this.x, 0, this.z);
            this.scene.rotate(this.orientation, 0, 1, 0);
        }

        this.scene.translate(1.75, 0.15, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.scale(this.radius, this.width, this.radius);
        this.branch.display();
        this.scene.popMatrix();
    }
    
}