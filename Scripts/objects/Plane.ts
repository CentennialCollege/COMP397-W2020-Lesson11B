module objects
{
    export class Plane extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalPosition:number;
        private _engineSound : createjs.AbstractSoundInstance;
        private _bulletSpawn: objects.Vector2;
        
        // PUBLIC PROPERTIES
        public get engineSound() : createjs.AbstractSoundInstance 
        {
            return this._engineSound;
        }

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.TEXTURE_ATLAS, "plane", 0, 0, true);

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void 
        {
            // left boundary
            if(this.position.x <= this.halfWidth)
            {
                this.position = new Vector2(this.halfWidth, this.position.y);
            }

            // right boundary

            if(this.position.x >= config.Game.SCREEN_WIDTH - this.halfWidth)
            {
                this.position = new Vector2(config.Game.SCREEN_WIDTH - this.halfWidth, this.position.y);
            }
        }        

        private _move(): void
        {
            let newPositionX = util.Mathf.Lerp(this.position.x, this.stage.mouseX, 0.05);
            this.position = new Vector2(newPositionX, this._verticalPosition);
            this._bulletSpawn = new Vector2(this.position.x, this.position.y - this.halfHeight - 10);
        }
        
        // PUBLIC METHODS
        public Start(): void 
        {
            this.type = enums.GameObjectType.PLANE;
            this._verticalPosition = 430; // locked to the bottom of the screen
            this._engineSound = createjs.Sound.play("engine");
            this._engineSound.loop = -1; // loop forever
            this._engineSound.volume = 0.1; // 10% volume
        }

        public Update(): void 
        {
            this._move();
            this._checkBounds();

           if(createjs.Ticker.getTicks() % 10 == 0)
           {
            this.FireBullet();
           }
            
        }

        public Reset(): void 
        {

        }

        public FireBullet()
        {
            let bullet = config.Game.BULLET_MANAGER.GetBullet();
            console.log(bullet);

            bullet.isActive = true;
            bullet.position = this._bulletSpawn;
        }

        
    }

}
