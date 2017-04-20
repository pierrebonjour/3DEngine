class Engine {
	Camera(x,y,z){
		return Engine._sceneAndCam.Camera(this,x,y,z);
	}


	basicSampleScene(){
		var thisE = this;
		Engine._sceneAndCam.basicSampleScene(thisE);
		return this;
	}

	render(){
		var thisE = this;
		Engine._sceneAndCam.render(thisE);
	}
	
    constructor(startFunction,log){
    	Engine._startFunction = startFunction;
        Engine.log = log;
		this.BABYLON = class{}
        Engine._loaded = false;
        Engine._remainsToBeLoaded = [];
        Engine._toBeExecutedOnceEngineIsLoaded = [];
        if(Engine.log) console.log("Engine.js : logs activated");

        var waitForScriptLoader = new Object();
		Engine._remainsToBeLoaded.push(function(){Engine._armScript("Engine/loader.js",waitForScriptLoader);});
		Engine._remainsToBeLoaded.push(waitForScriptLoader);
		var thisE = this;
		Engine._remainsToBeLoaded.push(function(){Engine._loader.main(thisE);});
		//reload is necessary to leave the shoot function to modify the real Engine
		//(the Engine is a just copy of the engine inside the shoot function)
		//_scriptLoader will add on the real array, but not on the copy that shoot() has
		//_scriptLoader will add at the complete end of the real array, after reload
		Engine._remainsToBeLoaded.push("reload");
		Engine._shoot();
    }

    static _shoot(){
        //go through all the array
        //if it is a function : execute and delete
        //if it is an object and object.loaded then delete
        //else return
        var initialSize = Engine._remainsToBeLoaded.length;
        for (;initialSize>0;initialSize--){
        	//console.log(initialSize); //for debug
            var e = Engine._remainsToBeLoaded[0];
            if(typeof(e) === 'function'){
                (Engine._remainsToBeLoaded.shift())(); //delete the function from the array and execute it;
            }
            else if (e.loaded) Engine._remainsToBeLoaded.shift();
       		else if (e=="reload") //reload enables changes made on the local copy to be applied to the objects
            {
            	Engine._remainsToBeLoaded.shift();
            	
            	setTimeout(function(){Engine._shoot();},0);
            	return;
            }
            else return;
		}
		//here our scene is loaded (because we are single threaded)
		if (Engine.log) if(!Engine._loaded)console.log("Engine.js : Engine inner stack loading complete");
		Engine._loaded = true;
		//Now we stack all functions in the _toBeExecutedOnceEngineIsLoaded array
		var toBeExecutedSize = Engine._toBeExecutedOnceEngineIsLoaded.length;
		if(toBeExecutedSize>0)
		{
			for (;toBeExecutedSize>0;toBeExecutedSize--){
				//console.log(toBeExecutedSize); //for debug
				Engine._remainsToBeLoaded.push(Engine._toBeExecutedOnceEngineIsLoaded.shift());
			}
			if (Engine.log) console.log("Engine.js : Engine external stack loading complete");
			setTimeout(function(){Engine._shoot();},0);
			return;
		}
		if (!Engine._startFunctionAlreadyExecuted)
		{
			setTimeout(Engine._startFunction,0);
			Engine._startFunctionAlreadyExecuted = true;
		}
    }

	ExecuteOrStack(obj){
		if (Engine._loaded){
			Engine._remainsToBeLoaded.push(obj);
			Engine._shoot();
		} else{
			Engine._toBeExecutedOnceEngineIsLoaded.push(obj);
			console.log("Stack for after Engine load : "+obj);
		}
		
    	
    }

    static _armScript(src,ref){
    	if (Engine.log) console.log("Engine.js : loading script "+ src);
    	var script = document.createElement('script');
    	script.onload = function(){ref.loaded = true;Engine._shoot();};
		script.src = src;
		document.head.appendChild(script);
    }

}