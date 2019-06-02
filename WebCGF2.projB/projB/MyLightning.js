
class MyLightning extends MyLSystem {
    constructor(scene, scale) {
        super(scene);

        this.animationStartTime = 0;
        this.depth = 0;
        this.shouldAnimate = false; // indicates if an animation is current taking place or not
        this.lightningScale = scale;
        this.x = 0;
        this.z = 0;
        
        this.lightningMaterial = new CGFappearance(scene);
        this.lightningMaterial.setAmbient(1.0, 1.0, 1.0, 1);
        this.lightningMaterial.setDiffuse(1.0, 1.0, 1.0, 1);
        this.lightningMaterial.setSpecular(1.0, 1.0, 1.0, 1);
        this.lightningMaterial.setShininess(10.0);

        this.scene.lights[1].setDiffuse(0.4, 0.4, 0.9, 1.0);

    }

    initGrammar() {
        this.grammar = {
            "F": new MyQuad(this.scene),
            "X": new MyQuad(this.scene)
        }
    }

    startAnimation(t) {

        this.animationStartTime = t;
        this.axiom = this.scene.lightningAxiom;
        this.iterate();
        this.depth = 0;
        this.shouldAnimate = true;

        this.x = Math.random() * 30 - 15;
        this.z = Math.random() * 30 - 15;

        this.scene.lights[1].setPosition(this.x, 20, this.z, 1);
        this.scene.lights[1].enable();
        this.scene.lights[1].update();

    }

    endAnimation() {
        this.scene.lights[1].disable();
        this.scene.lights[1].update();
        this.animationStartTime = 0;
        this.depth = 0;
        this.shouldAnimate = false;
    }

    update(t) {
        if(this.shouldAnimate) {
            
            // se chegou ao fim, shouldAnimate fica false
            if (t - this.animationStartTime > 1000) {
                this.endAnimation();
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

        this.scene.translate(this.x, 25, this.z);
        this.scene.scale(this.scale, this.scale, this.scale);
        this.scene.rotate(Math.PI, 1, 0, 0);

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
                        this.scene.pushMatrix();
                        this.scene.scale(0.5, this.lightningScale, 1);
                        this.scene.translate(0.5, 0.5, 0);
                        primitive.display();
                        // Para que os relâmpagos sejam visíveis dos dois lados
                        this.scene.rotate(Math.PI, 0, 1, 0);
                        primitive.display();
                        this.scene.popMatrix();
                        this.scene.translate(0, this.lightningScale, 0);
                    }
                    break;
            }
        }
        this.scene.popMatrix();
    }
}