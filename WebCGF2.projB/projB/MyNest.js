class MyNest extends CGFobject {
    constructor(scene, x, z, size, slices) {
        super(scene);

        this.initTexturesAndMaterials();

        this.x = x;
        this.z = z;
        this.size = size;
        this.slices = slices;
        this.rotAngle = 2 * Math.PI / this.slices;

        this.nest = new MyCylinder(this.scene, 8);
        this.base = new MyCircle(this.scene, this.slices);
        this.eeg = new MySphere(this.scene, 15, 15, 0.75);

        this.branches = [];
    }

    initTexturesAndMaterials() {

        this.nestMaterial = new CGFappearance(this.scene);
        this.nestMaterial.setAmbient(0.86, 0.81, 0.27, 1);
        this.nestMaterial.setDiffuse(0.43, 0.41, 0.14, 1);
        this.nestMaterial.setSpecular(0, 0, 0, 1);
        this.nestMaterial.setShininess(1.0);

        this.eegTexture = new CGFtexture(this.scene, 'images/egg.jpg');
        this.nestTexture = new CGFtexture(this.scene, 'images/nestTexture.jpg');
    }

    collidedWithBird(bird) {
        var xLowerLimit = this.x - this.size * 0.8;
        var xUpperLimit = this.x + this.size * 0.8;
        var zLowerLimit = this.z - this.size * 0.8;
        var zUpperLimit = this.z + this.size * 0.8;

        if((xLowerLimit < bird.xPosition) && (xUpperLimit > bird.xPosition) &&
           (zLowerLimit < bird.zPosition) && (zUpperLimit > bird.zPosition))
           return true;

        return false;
    }

    display() {

        this.scene.pushMatrix();
        this.scene.translate(this.x, 0, this.z);
        this.scene.pushMatrix();
        this.scene.scale(this.size, this.size, this.size);

        // Eggs

        this.scene.diffuseMaterial.setTexture(this.eegTexture);
        this.scene.diffuseMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(-0.7, 0.25, -0.2);
        this.scene.rotate(-Math.PI / 4, 0, 1, 1);
        this.scene.scale(0.3, 0.2, 0.2);
        this.eeg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.47, 0.25, -0.43);
        this.scene.rotate(-Math.PI / 4, 0, 1.5, 1);
        this.scene.scale(0.3, 0.2, 0.2);
        this.eeg.display();
        this.scene.popMatrix();

        // Nest

        this.nestMaterial.setTexture(this.nestTexture);
        this.nestMaterial.apply();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.base.display();
        this.scene.popMatrix();

        for (var i = 1; i <= this.slices; i++) {
            var ang = i * this.rotAngle;
            this.scene.pushMatrix();
            this.scene.translate(Math.sin(ang), 0, Math.cos(ang));
            this.scene.rotate(ang, 0, 1, 0);
            this.scene.rotate(Math.PI / 2, 0, 0, 1);
            this.scene.scale(this.size / 4, 8 / this.slices, this.size / 4);
            this.scene.translate(0, -0.5, 0);
            this.nest.display();
            this.scene.popMatrix();
        }
        
        this.scene.popMatrix();

        // Branches that it might have

        for(var i = 0; i < this.branches.length; i++) {
            this.branches[i].display();
        }

        this.scene.popMatrix();
    }
}