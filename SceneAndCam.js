class SceneAndCam{
    constructor(parent){
        this.parent = parent;
        //this.basicSampleScene();
        var thisSAC = this;
        this.parent._EngineLoader.executeOrStack(function(){thisSAC.basicSampleScene("from SAC");});
    }

    basicSampleScene(string)
    {
        console.log(string + ", this is : "+this.__proto__.constructor.name);
        /*
      var engine = new BABYLON.Engine(canvas, true);
      // -------------------------------------------------------------
      // Here begins a function that we will 'call' just after it's built
      var createScene = function () {
         // Now create a basic Babylon Scene object
         scene = new BABYLON.Scene(engine);
         // Change the scene background color to green.
         scene.clearColor = new BABYLON.Color3(0, 1, 0);
         // This creates and positions a free camera
         camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 10, 10), scene);
         // This targets the camera to scene origin
		 camera.setTarget(new BABYLON.Vector3(0,0,0));
         //camera.setTarget(BABYLON.Vector3.Zero());
         // This attaches the camera to the canvas
         camera.attachControl(canvas, false);
         // This creates a light, aiming 0,1,0 - to the sky.
         light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
         // Dim the light a small amount
         light.intensity = .5;
         // Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
         sphere = BABYLON.Mesh.CreateSphere("sphere1", 4, 2, scene,true);
         // Move the sphere upward 1/2 its height
         sphere.position.y = 1;
         // Let's try our built-in 'ground' shape. Params: name, width, depth, subdivisions, scene
         ground = BABYLON.Mesh.CreateGround("ground1", 10, 10, 2, scene);
		 
         // Leave this function
         return scene;
      }; // End of createScene function
      // -------------------------------------------------------------
      // Now, call the createScene function that you just finished creating
      scene2 = createScene();
      */
    }


}