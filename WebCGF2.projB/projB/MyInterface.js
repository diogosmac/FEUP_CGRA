/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        return true;
    }

    initKeys()
	{
		this.scene.gui = this;
		this.processKeyboard = function() {};
		this.activeKeys = {};
	};
    processKeyDown(event) 
    {
		this.activeKeys[event.code] = true;
	}
    processKeyUp(event) 
    {
		this.activeKeys[event.code] = false;
	}
    isKeyPressed(keyCode) 
    {
		return this.activeKeys[keyCode] || false;
	}
}