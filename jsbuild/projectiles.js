import { Pos } from "@mathrandom7910/pos";
export var ProjectileType;
(function (ProjectileType) {
    ProjectileType[ProjectileType["ARROW"] = 0] = "ARROW";
    ProjectileType[ProjectileType["TURRET_BULLET"] = 1] = "TURRET_BULLET";
    ProjectileType[ProjectileType["CROSSBOW_ARROW"] = 2] = "CROSSBOW_ARROW";
    ProjectileType[ProjectileType["REPEATER_ARROW"] = 3] = "REPEATER_ARROW";
    ProjectileType[ProjectileType["UNKOWN_PROJECTILE"] = 4] = "UNKOWN_PROJECTILE";
    ProjectileType[ProjectileType["MUSKET_BULLET"] = 5] = "MUSKET_BULLET";
})(ProjectileType || (ProjectileType = {}));
export const projectiles = [{
        indx: 0,
        layer: 0,
        src: "arrow_1",
        dmg: 25,
        speed: 1.6,
        scale: 103,
        range: 1000
    }, {
        indx: 1,
        layer: 1,
        dmg: 25,
        scale: 20
    }, {
        indx: 0,
        layer: 0,
        src: "arrow_1",
        dmg: 35,
        speed: 2.5,
        scale: 103,
        range: 1200
    }, {
        indx: 0,
        layer: 0,
        src: "arrow_1",
        dmg: 30,
        speed: 2,
        scale: 103,
        range: 1200
    }, {
        indx: 1,
        layer: 1,
        dmg: 16,
        scale: 20
    }, {
        indx: 0,
        layer: 0,
        src: "bullet_1",
        dmg: 50,
        speed: 3.6,
        scale: 160,
        range: 1400
    }];
export class Projectile {
    constructor(x, y, dir, range, speed, projectileType, layer, sid) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.range = range;
        this.speed = speed;
        this.projectileType = projectileType;
        this.layer = layer;
        this.sid = sid;
    }
    getAsPos() {
        return new Pos(this.x, this.y);
    }
}
//# sourceMappingURL=projectiles.js.map