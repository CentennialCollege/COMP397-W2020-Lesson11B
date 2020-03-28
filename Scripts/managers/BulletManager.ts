module managers
{
    export class BulletManager
    {
        // PRIVATE INSTANCE MEMBERS
        private _bulletNumber: number;
        private _bulletPool: Array<objects.Bullet>;

        // TODO: bullet sound

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            this._buildBulletPool();
        }

        // PRIVATE METHODS
        private _buildBulletPool():void
        {
            this._bulletNumber = 50;

            // create an empty Bullet Container
            this._bulletPool = new Array<objects.Bullet>();

            for (let count = 0; count < this._bulletNumber; count++) {
                
                let bullet = new objects.Bullet();
                this._bulletPool.push(bullet);
            }

            console.log(this._bulletPool);
        }

        // PUBLIC METHODS

        public GetBullet():objects.Bullet
        {
            return this._bulletPool.shift();
        }

        public ReturnBullet(bullet: objects.Bullet):void
        {
            this._bulletPool.push(bullet);
        }

        public AddBulletsToScene():void
        {
            this._bulletPool.forEach(bullet => {
               config.Game.CURRENT_SCENE.addChild(bullet);
            });
        }
        
        // TODO: make bullet sound
    
        public Update():void
        {
            this._bulletPool.forEach(bullet => {
                bullet.Update();
            });
        }
    }
}