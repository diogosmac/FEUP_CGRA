
class MyLightning extends MyLSystem {
    constructor(scene, scale) {
        super(scene);

        this.animationStartTime = 0;
        this.depth = 0;
        this.shouldAnimate = false; // indicates if an animation is current taking place or not
        this.lightningScale = scale;
        
        this.lightningMaterial = new CGFappearance(scene);
        this.lightningMaterial.setAmbient(1.0, 1.0, 1.0, 1);
        this.lightningMaterial.setDiffuse(1.0, 1.0, 1.0, 1);
        this.lightningMaterial.setSpecular(1.0, 1.0, 1.0, 1);
        this.lightningMaterial.setShininess(10.0);

    }

    initGrammar() {
        this.grammar = {
            "F": new MyQuad(this.scene),
            "X": new MyQuad(this.scene)
        }
    }

    startAnimation() {
        this.iterate();
        this.depth = 0;
        this.shouldAnimate = true;
    }


    update(t) {
        if(this.shouldAnimate) {
            console.log("Animating ...");
            if (this.animationStartTime == 0) {
                this.animationStartTime = t;
            }
            // se chegou ao fim, shouldAnimate fica false
            if (t - this.animationStartTime > 1000) {
                this.animationStartTime = 0;
                this.depth = 0;
                this.shouldAnimate = false;
                this.axiom = this.scene.lightningAxiom;
                console.log("Done!");
            }
            // se nao, continua a mostrar
            else {
                this.depth = this.axiom.length * ((t - this.animationStartTime) / 1000);
            }
        }
    }

    display() {

        this.lightningMaterial.apply();

        this.scene.pushMatrix();
        this.scene.scale(this.scale / 2, this.scale * this.lightningScale, this.scale);

        var i;

        // percorre a cadeia de caracteres
        // APENAS DA DISPLAY DOS PRIMEIROS 'DEPTH' CARACTERES!
        for (i=0; (i<this.axiom.length) && (i < this.depth); ++i){

            // verifica se sao caracteres especiais
            switch(this.axiom[i]){
                case "+":
                    // roda a esquerda
                    this.scene.rotate(this.angle, 0, 0, 1);
                    break;

                case "-":
                    // roda a direita
                    this.scene.rotate(-this.angle, 0, 0, 1);
                    break;

                case "\\":
                    // roda sentido positivo XX
                    this.scene.rotate(this.angle, 1, 0, 0);
                    break;

                case "/":
                    // roda sentido negativo XX
                    this.scene.rotate(-this.angle, 1, 0, 0);
                    break;

                case "^":
                    // roda sentido positivo YY
                    this.scene.rotate(this.angle, 0, 1, 0);
                    break;

                case "&":
                    // roda sentido negativo YY
                    this.scene.rotate(-this.angle, 0, 1, 0);
                    break;

                case "[":
                    // push
                    this.scene.pushMatrix();
                    break;

                case "]":
                    // pop
                    this.scene.popMatrix();
                    break;

                // processa primitiva definida na gramatica, se existir
                default:
                    var primitive=this.grammar[this.axiom[i]];

                    if ( primitive )
                    {
                        primitive.display();
                        this.scene.translate(0, 1, 0);
                    }
                    break;
            }
        }
        this.scene.popMatrix();
    }
}