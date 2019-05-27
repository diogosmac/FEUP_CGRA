class MyTreeBranch extends CGFobject {
    constructor(scene, x, z, orientation) {
        super(scene);
        this.x = x;
        this.z = z;
        this.orientation = orientation;

        this.width = 3.5;
        this.radius = 0.1;

        this.initTextures();

        // if the bird is not holding the branch, the branch can be in its original position, with orientation;
        // if the bird is holding the branch, the branch should not be in its original position;
        // -----
        // if the branch is in the nest, it should only use, for display, its orientation
        this.states = { NORMAL : 0,
                        PICKED_UP : 1,
                        IN_NEST : 2
                      }

        this.currentState = this.states.NORMAL;

        this.branch = new MyCylinder(this.scene, 10);
    }

    initTextures() {
        this.branchTexture = new CGFtexture(this.scene, 'images/trunkTexture.png');
    }

    collidedWithBird(bird) {
        var totalDistance = Math.sqrt(Math.pow(this.x - bird.xPosition, 2) + Math.pow(this.z - bird.zPosition, 2));

        if(totalDistance < 1.5)
            return true;

        return false;
    }


    display() {
        this.scene.diffuseMaterial.setTexture(this.branchTexture);
        this.scene.diffuseMaterial.apply();

        this.scene.pushMatrix();

        if(this.currentState == this.states.NORMAL) {
            this.scene.translate(this.x, 3.7, this.z);
            this.scene.rotate(this.orientation, 0, 1, 0);
        }
        else if (this.currentState == this.states.IN_NEST) {
            this.scene.rotate(this.orientation, 0, 1, 0);
        }

        this.scene.translate(1.75, 0.15, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.scale(this.radius, this.width, this.radius);
        this.branch.display();
        this.scene.popMatrix();
    }
    
}