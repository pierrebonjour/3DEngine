Engine._sceneAndCam = class{
    static main(E){
    	
    	Engine._remainsToBeLoaded.push(function(){if(Engine.log) console.log("Scene and Cam : scene and cam started");});
    	Engine._remainsToBeLoaded.push(function(){Engine._sceneAndCam.initBabylon(E)});
		Engine._remainsToBeLoaded.push("reload");
    }

    static initBabylon(E)
    {
    	if(Engine.log) console.log("SceneAndCam : initializing babylon");
    	E.BABYLON.engine = new BABYLON.Engine(E.BABYLON.canvas, true);
    	E.BABYLON.scene = new BABYLON.Scene(E.BABYLON.engine);
		E.BABYLON.scene.clearColor = new BABYLON.Color3(1, 1, 1);

		Engine._sceneAndCam.light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), E.BABYLON.scene);
		Engine._sceneAndCam.light.intensity = .5;

    }

    static basicSampleScene(E)
    {
		//console.log("Basic Sample Scene --> this is : "+this.__proto__.constructor.name);
		// Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
		var sphere = BABYLON.Mesh.CreateSphere("sphere1", 4, 2, E.BABYLON.scene,true);
		// Move the sphere upward 1/2 its height
		sphere.position.y = 1;
		// Let's try our built-in 'ground' shape. Params: name, width, depth, subdivisions, scene
		var ground = BABYLON.Mesh.CreateGround("ground1", 10, 10, 2, E.BABYLON.scene);

		E.BABYLON.scene.render();
    }

	static resizeCanvasAndContent(E,CanvasWidth,CanvasHeight)
	{
		if (E.BABYLON.camera !== undefined) {
			E.BABYLON.camera.fovMode = (CanvasWidth>CanvasHeight)?0:1;
		}
	}

	static Camera(E,x,y,z)
	{
		E.BABYLON.camera = new BABYLON.FreeCamera("cam", new BABYLON.Vector3(x, y, z), E.BABYLON.scene);
		
		E.BABYLON.camera.setTarget(new BABYLON.Vector3(0,0,0));
		E.BABYLON.camera.attachControl(E.BABYLON.canvas, false);

		E.BABYLON.camera.render = function()
		{
			E.BABYLON.scene.render();
		}
		return E.BABYLON.camera;
	}

}