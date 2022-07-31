import { Pos } from "@mathrandom7910/pos";
import { Posable } from "./player";
export declare class GameObject extends Pos implements Posable {
    id: number;
    dir: number;
    scale: number;
    type: number;
    buildType: number;
    ownerSid: number;
    constructor(id: number, x: number, y: number, dir: number, scale: number, type: number, buildType: number, ownerSid: number);
    getAsPos(): GameObject;
}
/**
 * Reason an object was removed from the game
 */
export declare enum ObjectRemoveReason {
    PLAYERLEAVE = 0,
    BUILDINGBREAK = 1
}
