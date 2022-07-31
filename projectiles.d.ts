import { Pos } from "@mathrandom7910/pos";
import { Posable } from "./player";
export declare enum ProjectileType {
    ARROW = 0,
    TURRET_BULLET = 1,
    CROSSBOW_ARROW = 2,
    REPEATER_ARROW = 3,
    UNKOWN_PROJECTILE = 4,
    MUSKET_BULLET = 5
}
export interface IProjectile {
    indx: number;
    layer: number;
    src?: string;
    dmg: number;
    scale: number;
    speed?: number;
    range?: number;
}
export declare const projectiles: IProjectile[];
export declare class Projectile implements Posable {
    x: number;
    y: number;
    dir: number;
    range: number;
    speed: number;
    projectileType: ProjectileType;
    layer: number;
    sid: number;
    constructor(x: number, y: number, dir: number, range: number, speed: number, projectileType: ProjectileType, layer: number, sid: number);
    getAsPos(): Pos;
}
