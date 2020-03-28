"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var Plane = /** @class */ (function (_super) {
        __extends(Plane, _super);
        // CONSTRUCTOR
        function Plane() {
            var _this = _super.call(this, config.Game.TEXTURE_ATLAS, "plane", 0, 0, true) || this;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Plane.prototype, "engineSound", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._engineSound;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Plane.prototype._checkBounds = function () {
            // left boundary
            if (this.position.x <= this.halfWidth) {
                this.position = new objects.Vector2(this.halfWidth, this.position.y);
            }
            // right boundary
            if (this.position.x >= config.Game.SCREEN_WIDTH - this.halfWidth) {
                this.position = new objects.Vector2(config.Game.SCREEN_WIDTH - this.halfWidth, this.position.y);
            }
        };
        Plane.prototype._move = function () {
            var newPositionX = util.Mathf.Lerp(this.position.x, this.stage.mouseX, 0.05);
            this.position = new objects.Vector2(newPositionX, this._verticalPosition);
            this._bulletSpawn = new objects.Vector2(this.position.x, this.position.y - 10);
        };
        // PUBLIC METHODS
        Plane.prototype.Start = function () {
            this.type = enums.GameObjectType.PLANE;
            this._verticalPosition = 430; // locked to the bottom of the screen
            this._engineSound = createjs.Sound.play("engine");
            this._engineSound.loop = -1; // loop forever
            this._engineSound.volume = 0.1; // 10% volume
        };
        Plane.prototype.Update = function () {
            this._move();
            this._checkBounds();
            this.FireBullet();
        };
        Plane.prototype.Reset = function () {
        };
        Plane.prototype.FireBullet = function () {
            var bullet = config.Game.BULLET_MANAGER.GetBullet();
            console.log(bullet);
            bullet.isActive = true;
            bullet.position = this._bulletSpawn;
        };
        return Plane;
    }(objects.GameObject));
    objects.Plane = Plane;
})(objects || (objects = {}));
//# sourceMappingURL=Plane.js.map