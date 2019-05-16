class MyBird extends CGFobject {

    constructor(scene, birdSize) {
        super(scene);

        // esfera para a cabeca, cone para o pescoço

        this.birdSize = birdSize;
        this.tail = new MyCone(this.scene, 10, 1);
        this.body = new MyCylinder(this.scene, 10);
        this.neck = new MyCone(this.scene, 6, 1);
        this.head = new MyUnitCubeQuad(this.scene);
        this.beak = new MyPyramid(this.scene, 4, 1);
        this.eye = new MyUnitCubeQuad(this.scene);
        this.innerWing = new MyQuadWing(this.scene);
        this.outerWing = new MyTriangle(this.scene);
    }


    display() {

        this.scene.pushMatrix();
        this.scene.scale(this.birdSize, this.birdSize, this.birdSize);
        this.scene.popMatrix();

        // Body

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.4, 1.5, 0.4);
        this.body.display();
        this.scene.popMatrix();


        // Tail

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.4, 1, 0.4);
        this.tail.display();
        this.scene.popMatrix();
        
        // Inner Wing #1
        this.scene.pushMatrix();
        this.scene.translate(10, 10, 0);
        this.innerWing.display();
        this.scene.popMatrix();

    }


}