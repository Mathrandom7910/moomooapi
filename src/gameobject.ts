import { Posable } from "./player";

export interface IObject extends Posable {
    id: number,
    x: number,
    y: number,
    dir: number,
    scale: number,
    type: number,
    buildType: number,
    ownerSid: number
}

/**
 * Reason an object was removed from the game
 */

export enum ObjectRemoveReason {
    PLAYERLEAVE,
    BUILDINGBREAK
}