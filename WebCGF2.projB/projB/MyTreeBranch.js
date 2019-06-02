class MyTreeBranch extends CGFobject {
    constructor(scene, x, z, orientation) {
        super(scene);
        this.x = x;
        this.z = z;
        this.orientation = orientation;

        this.width = 1;
        this.radius = 0.035;

        this.initTexturesAndMaterials();

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

    initTexturesAndMaterials() {

        this.branchMaterial = new CGFappearance(this.scene);
        this.branchMaterial.setAmbient(0.68, 0.40, 0.20, 1);
        this.branchMaterial.setDiffuse(0.34, 0.20, 0.10, 1);
        this.branchMaterial.setSpecular(0, 0, 0, 1);
        this.branchMaterial.setShininess(10.0);

        this.branchTexture = new CGFtexture(this.scene, 'images/trunkTexture.png');
    }

    collidedWithBird(bird) {
        var totalDistance = Math.sqrt(Math.pow(this.x - bird.xPosition, 2) + Math.pow(this.z - bird.zPosition, 2));

        if(totalDistance < this.width / 2)
            return true;

        return false;
    }


    display() {
        this.branchMaterial.setTexture(this.branchTexture);
        this.branchMaterial.apply();

        this.scene.pushMatrix();

        if(this.currentState == this.states.NORMAL) {
            this.scene.translate(this.x, 3.8, this.z);
            this.scene.rotate(this.orientation, 0, 1, 0);
        }
        else if (this.currentState == this.states.IN_NEST) {
            this.scene.rotate(this.orientation, 0, 1, 0);
        }

        this.scene.translate(this.width / 2, this.radius / 2, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.scale(this.radius, this.width, this.radius);
        this.branch.display();
        this.scene.popMatrix();
    }
    
}