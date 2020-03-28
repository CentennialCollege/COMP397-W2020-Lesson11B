module config
{
    export class Game
    {
        public static SCREEN_WIDTH:number = 640;
        public static SCREEN_HEIGHT:number = 480;
        public static SCENE_STATE: scenes.State;
        public static CURRENT_SCENE: objects.Scene;
        public static ASSETS: createjs.LoadQueue;
        public static FPS: number = 60; // 60 Frames per second
        public static CLOUD_NUM: number = 4;
        public static LIVES: number = 5;
        public static SCORE: number = 0;
        public static HIGH_SCORE: number = 0;
        public static SCORE_BOARD: managers.ScoreBoard;
        public static TEXTURE_ATLAS: createjs.SpriteSheet;
        public static OCEAN_ATLAS: createjs.SpriteSheet;
        public static BULLET_MANAGER: managers.BulletManager;
    }
}