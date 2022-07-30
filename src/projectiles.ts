import { Pos } from "@mathrandom7910/pos";
import { Posable } from "./player";

export enum ProjectileType {
    ARROW,
    TURRET_BULLET,
    CROSSBOW_ARROW,
    REPEATER_ARROW,
    UNKOWN_PROJECTILE,
    MUSKET_BULLET
}

export interface IProjectile {
    indx: number,
    layer: number,
    src?: string,
    dmg: number,
    scale: number,
    speed?: number,
    range?: number
}

export const projectiles: IProjectile[] = 
    [{
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


export class Projectile implements Posable {
    constructor(public x: number, public y: number, public dir: number, public range: number, public speed: number, public projectileType: ProjectileType, public layer: number, public sid: number) {

    }

    getAsPos(): Pos {
        return new Pos(this.x, this.y);
    }
}