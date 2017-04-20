Engine._loader = class{
    static main(E){
        Engine._remainsToBeLoaded.push(function(){if(Engine.log) console.log("Loader : loader started");});
        var waitForBabylon = new Object();
		Engine._remainsToBeLoaded.push(function(){Engine._armScript("Engine/babylon.js",waitForBabylon);});
		Engine._remainsToBeLoaded.push(waitForBabylon);  
        var waitForSceneAndCam = new Object();
        Engine._remainsToBeLoaded.push(function(){Engine._armScript("Engine/sceneAndCam.js",waitForSceneAndCam);});
        Engine._remainsToBeLoaded.push(waitForSceneAndCam);
        var waitForDomHandler = new Object();
        Engine._remainsToBeLoaded.push(function(){Engine._armScript("Engine/domHandler.js",waitForDomHandler);});
        Engine._remainsToBeLoaded.push(waitForDomHandler);  
        Engine._remainsToBeLoaded.push(function(){if(Engine.log) console.log("Loader : scripts loading complete");});

        Engine._remainsToBeLoaded.push(function(){if(Engine.log) console.log("Loader : stacking domHandler");});
        Engine._remainsToBeLoaded.push(function(){Engine._domHandler.main(E);});
        
        Engine._remainsToBeLoaded.push(function(){if(Engine.log) console.log("Loader : stacking sceneAndCam");});
        Engine._remainsToBeLoaded.push(function(){Engine._sceneAndCam.main(E);});

        Engine._remainsToBeLoaded.push("reload"); //to be launched at the end every time Engine is modified
											 //or even the array itself, since the call is made inside the push
											 //function and the array size is fixed inside the push function
    }

}