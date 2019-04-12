class MyTree extends CGFobject {
    constructor(scene,
                trunkHeight,
                trunkRadius,
                treeTopHeight,
                treeTopRadius,
                trunkTexture,
                treeTopTexture) {
        super(scene);

        this.trunkHeight = trunkHeight;
        this.trunkRadius = trunkRadius;
        this.treeTopHeight = treeTopHeight;
        this.treeTopRadius = treeTopRadius;
        this.trunkTexture = trunkTexture;
        this.treeTopTexture = treeTopTexture;

        this.trunk = new MyCylinder(this.scene, 10);
        this.treeTop = new MyCone(this.scene, 10, 1);

    }
    enableNormalViz() {
        this.trunk.enableNormalViz();
        this.treeTop.enableNormalViz();
    }
    disableNormalViz() {
        this.trunk.disableNormalViz();
        this.treeTop.disableNormalViz();
    }
    display() {

        this.scene.pushMatrix();
        this.scene.scale(this.trunkRadius, this.trunkHeight, this.trunkRadius);

        this.scene.diffuseMaterial.setTexture(this.trunkTexture);
        this.scene.diffuseMaterial.apply();

        this.trunk.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, this.trunkHeight, 0);
        this.scene.scale(this.treeTopRadius, this.treeTopHeight, this.treeTopRadius);

        this.scene.diffuseMaterial.setTexture(this.treeTopTexture);
        this.scene.diffuseMaterial.apply();

        this.treeTop.display();
        this.scene.popMatrix();
    }

}