Engine._domHandler = class{
    static main(E){
        Engine._remainsToBeLoaded.push(function(){if(Engine.log) console.log("Dom handler : dom handler started");});
        var thisDH = this;
        var waitForBody = new Object();
        Engine._remainsToBeLoaded.push(function(){Engine._domHandler.armBody(waitForBody);});
        Engine._remainsToBeLoaded.push(waitForBody);
        Engine._remainsToBeLoaded.push(function(){if(Engine.log) console.log("Dom handler : document ready");});
        Engine._remainsToBeLoaded.push(function(){Engine._domHandler.replaceBody(E);});
        Engine._domHandler.addResizeEvents(E);
        Engine._remainsToBeLoaded.push("reload"); //to be launched at the end every time Engine is modified
											 //or even just the array since this function was called from
											 //the shoot function, inside which the array size is fixed !
    }

    static armBody(ref){
        window.onload = function(){ref.loaded = true;Engine._shoot();};
        //maybe the document has already loaded, in which case there wont be any trigger
        if (document.readyState === "complete") ref.loaded = true;
    }

    static replaceBody(E){
        var documentBody = document.createElement("body");
        documentBody.style.margin = 0;
        E.BABYLON.canvas = document.createElement("canvas");
        E.BABYLON.canvas.width = window.innerWidth;
        E.BABYLON.canvas.height = window.innerHeight;
        documentBody.appendChild(E.BABYLON.canvas);
        document.body = documentBody;
        Engine._remainsToBeLoaded.push(function(){if(Engine.log) console.log("Dom handler : body replaced");});
    }

    static addResizeEvents(E) {
        window.onresize = function() {
        	if(Engine.log) console.log("Dom handler : canvas size was modified");
        	E.BABYLON.canvas.width = window.innerWidth;
        	E.BABYLON.canvas.height = window.innerHeight;
        	Engine._sceneAndCam.resizeCanvasAndContent(E,E.BABYLON.canvas.width,E.BABYLON.canvas.height);
			
        };
        Engine._remainsToBeLoaded.push(function(){if(Engine.log) console.log("Dom handler : resize events added");});
    }

}