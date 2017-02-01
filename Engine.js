//Put the resize function somewhere else !
//RÃ©fÃ©chir Ã  la possibilitÃ© de choisir la classe (sphere/cube/...) que j'appelle avec la mÃªme fonction rotate...
class Engine {
    constructor(log) {
        this.log = log;
        this.loaded = false;
        if(this.log) console.log("logs activated");
        this._EngineLoader = new EngineLoader(this);
		this._EngineLoader.shoot();
    }

	anyFunction() {

	}
    
}



class EngineLoader{
    constructor(parent){
        this.parent = parent;
        this.remainsToBeLoaded = [];
        //load what will be needed
        var thisEL = this;
        var waitForBabylon = new Object();
		this.remainsToBeLoaded.push(function(){thisEL.armScript("babylon.js",waitForBabylon);});
		this.remainsToBeLoaded.push(waitForBabylon);
        var waitForBody = new Object();
        this.remainsToBeLoaded.push(function(){thisEL.armBody(waitForBody);});
        this.remainsToBeLoaded.push(waitForBody);
        this.remainsToBeLoaded.push(function(){thisEL.replaceBody();});
        var waitForSceneAndCam = new Object();
        this.remainsToBeLoaded.push(function(){thisEL.armScript("SceneAndCam.js",waitForSceneAndCam);});
        this.remainsToBeLoaded.push(waitForSceneAndCam);
        this.remainsToBeLoaded.push(function(){if(thisEL.parent.log) console.log("scripts loading complete");});
        this.remainsToBeLoaded.push(function(){thisEL.parent._SceneAndCam = new SceneAndCam(parent);});
        //Here we need to leave the function for the changes to take place
        this.remainsToBeLoaded.push("reload");
        this.remainsToBeLoaded.push(function(){if(thisEL.parent.log) console.log("private classes loading complete");});
        //this.remainsToBeLoaded.push(function(){thisEL.parent._SceneAndCam.basicSampleScene("from EL");});
        //this.remainsToBeLoaded.push(function(){thisEL.addResizeEvents();});
    }

    executeOrStack(func)
    {
    	if (this.parent.loaded) func();
    	else {
    		this.remainsToBeLoaded.push(func);
    		this.shoot();
    	}
    }

    armBody(ref){
    	var thisEL = this;
        window.onload = function(){ref.loaded = true;thisEL.shoot();};
        //maybe the document has already loaded, in which case there wont be any trigger
        if (document.readyState === "complete") ref.loaded = true;
    }

    replaceBody(){
        var documentBody = document.createElement("body");
        documentBody.style.margin = 0;
        this.parent.canvas = document.createElement("canvas");
        this.parent.canvas.width = window.innerWidth;
        this.parent.canvas.height = window.innerHeight;
        documentBody.appendChild(this.parent.canvas);
        document.body = documentBody;
    }

    addResizeEvents() {
        var thisEL = this;
        window.onresize = function() {thisEL.resizeCanvasAndContent();};
    }

    armScript(src,ref){
    	var thisEL = this;
    	var script = document.createElement('script');
    	script.onload = function(){ref.loaded = true;thisEL.shoot();};
		script.src = src;
		document.head.appendChild(script);
    }

    resizeCanvasAndContent() {

    }

    shoot() {
        //go through all the array
        //if it is a funcion : execute and delete
        //if it is an object and object.loaded then delete
        //else return
        var initialSize = this.remainsToBeLoaded.length;
        for (;initialSize>0;initialSize--)
        {
        	//console.log(initialSize); //for debug
            var e = this.remainsToBeLoaded[0];
            if(typeof(e) === 'function')
            {
                (this.remainsToBeLoaded.shift())(); //delete the function from the array and execute it;
            }
            else if (e.loaded) this.remainsToBeLoaded.shift();
            else if (e=="reload") //reload enables changes made on the local copy to be applied to the objects
            {
            	this.remainsToBeLoaded.shift();
            	var thisEL = this;
            	setTimeout(function(){thisEL.shoot();},0);
            	return;
            }
            else return;
        }
	//here our scene is loaded (because we are single threaded)
	if (this.parent.log) if(!this.parent.loaded)console.log("Engine stack loading complete");
	this.parent.loaded = true;
    }


}
