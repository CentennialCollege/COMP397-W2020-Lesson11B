"use strict";
//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
var Game = (function () {
    // variable declarations
    var canvas = document.getElementsByTagName('canvas')[0];
    var stage;
    var currentSceneState;
    var currentScene;
    var assets;
    var textureAtlas;
    var oceanAtlas;
    var assetManifest = [
        { id: "ocean", src: "./Assets/images/ocean.gif" },
        { id: "atlas", src: "./Assets/sprites/atlas.png" },
        { id: "engine", src: "./Assets/audio/engine.ogg" },
        { id: "yay", src: "./Assets/audio/yay.ogg" },
        { id: "thunder", src: "./Assets/audio/thunder.ogg" },
    ];
    var spriteData = {
        "images": {},
        "frames": [
            [0, 0, 16, 16],
            [16, 0, 150, 50],
            [0, 50, 226, 178],
            [0, 228, 62, 62],
            [62, 228, 65, 65],
            [127, 228, 62, 51],
            [189, 228, 62, 51],
            [0, 293, 62, 51],
            [62, 293, 150, 50],
            [0, 344, 150, 50]
        ],
        "animations": {
            "bullet": { "frames": [0] },
            "button": { "frames": [1] },
            "cloud": { "frames": [2] },
            "island": { "frames": [3] },
            "placeholder": { "frames": [4] },
            "plane": {
                "frames": [5, 6, 7],
                "speed": 0.5
            },
            "restartButton": { "frames": [8] },
            "startButton": { "frames": [9] }
        }
    };
    var oceanData = {
        "images": {},
        "frames": [
            [0, 0, 640, 1440],
        ],
        "animations": {
            "ocean": { "frames": [0] },
        }
    };
    function Preload() {
        assets = new createjs.LoadQueue(); // asset container
        config.Game.ASSETS = assets; // make a reference to the assets in the global config
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }
    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start() {
        console.log("%c Game Started!", "color: blue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        spriteData.images = [assets.getResult("atlas")];
        textureAtlas = new createjs.SpriteSheet(spriteData);
        config.Game.TEXTURE_ATLAS = textureAtlas;
        oceanData.images = [assets.getResult("ocean")];
        oceanAtlas = new createjs.SpriteSheet(oceanData);
        config.Game.OCEAN_ATLAS = oceanAtlas;
        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE_STATE = scenes.State.START;
    }
    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
    function Update() {
        if (currentSceneState != config.Game.SCENE_STATE) {
            Main();
        }
        currentScene.Update();
        stage.update();
    }
    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main() {
        console.log("%c Scene Switched...", "color: green; font-size: 16px;");
        // clean up
        if (currentSceneState != scenes.State.NO_SCENE) {
            currentScene.Clean();
            stage.removeAllChildren();
        }
        // switch to the new scene
        switch (config.Game.SCENE_STATE) {
            case scenes.State.START:
                console.log("switch to Start Scene");
                currentScene = new scenes.Start();
                break;
            case scenes.State.PLAY:
                console.log("switch to Play Scene");
                currentScene = new scenes.Play();
                break;
            case scenes.State.END:
                console.log("switch to End Scene");
                currentScene = new scenes.End();
                break;
        }
        config.Game.CURRENT_SCENE = currentScene;
        currentSceneState = config.Game.SCENE_STATE;
        stage.addChild(currentScene);
    }
    window.addEventListener('load', Preload);
})();
//# sourceMappingURL=game.js.map