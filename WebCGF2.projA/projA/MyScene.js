/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.initMaterials();
        this.initArrays();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.prism = new MyPrism(this, 8);
        this.pyramid = new MyPyramid(this, 5, 1);
        this.treeGroup = new MyTreeGroupPatch(this, 1.5, 0.25, 3, 0.75, "images/mineBottom.png", "images/mineTop.png");
        this.treeRow = new MyTreeRowPatch(this, 1.5, 0.25, 3, 0.75, "images/mineBottom.png", "images/mineTop.png");
        // FALTAM AS TEXTURAS

        //Objects connected to MyInterface
        this.displayNormals = false;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    initMaterials() {
        this.prismTest = new CGFappearance(this);
        this.prismTest.setAmbient(0.1, 0.1, 0.1, 1);
        this.prismTest.setDiffuse(0.9, 0.9, 0.9, 1);
        this.prismTest.setSpecular(0.1, 0.1, 0.1, 1);
        this.prismTest.setShininess(10.0);
        this.prismTest.loadTexture("images/tangram-lines.png");
    }
    initArrays() {

    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        this.axis.display();

        //Apply default appearance
        // this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        this.pushMatrix();

        this.scale(0.5, 0.5, 0.5);

        if (this.displayNormals) {
            this.prism.enableNormalViz();
            this.treeGroup.enableNormalViz();
            this.treeRow.enableNormalViz();
        }
        else {
            this.prism.disableNormalViz();
            this.treeGroup.disableNormalViz();
            this.treeRow.disableNormalViz();
        }

        this.pushMatrix();
        this.translate(-3, 0, 1.75);
        this.scale(2, 2, 2);
        this.prismTest.apply();
        this.prism.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(6, 0, 0);
        this.scale(4, 4, 4);
        this.pyramid.display(); 
        this.popMatrix();

        this.pushMatrix();
        this.translate(0, 0, -4);
        this.treeGroup.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(0, 0, 4);
        this.treeRow.display();
        this.popMatrix();

        this.popMatrix();

        // ---- END Primitive drawing section
    }
}