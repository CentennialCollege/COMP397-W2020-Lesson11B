"use strict";
var managers;
(function (managers) {
    var BulletManager = /** @class */ (function () {
        // TODO: bullet sound
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function BulletManager() {
            this._buildBulletPool();
        }
        // PRIVATE METHODS
        BulletManager.prototype._buildBulletPool = function () {
            this._bulletNumber = 50;
            // create an empty Bullet Container
            this._bulletPool = new Array();
            for (var count = 0; count < this._bulletNumber; count++) {
                var bullet = new objects.Bullet();
                this._bulletPool.push(bullet);
            }
        };
        // PUBLIC METHODS
        BulletManager.prototype.GetBullet = function () {
            var bullet = this._bulletPool.shift();
            this._bulletPool.push(bullet);
            return bullet;
        };
        BulletManager.prototype.ReturnBullet = function (bullet) {
            this._bulletPool.push(bullet);
        };
        BulletManager.prototype.AddBulletsToScene = function () {
            console.log("bullet manager: " + config.Game.CURRENT_SCENE);
            this._bulletPool.forEach(function (bullet) {
                config.Game.CURRENT_SCENE.addChild(bullet);
            });
        };
        // TODO: make bullet sound
        BulletManager.prototype.Update = function () {
            this._bulletPool.forEach(function (bullet) {
                bullet.Update();
            });
        };
        return BulletManager;
    }());
    managers.BulletManager = BulletManager;
})(managers || (managers = {}));
//# sourceMappingURL=BulletManager.js.map