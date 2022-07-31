import { Pos } from "@mathrandom7910/pos";

export class GameObject extends Pos {
    constructor(public id: number, x: number, y: number, public dir: number, public scale: number, public type: number, public buildType: number, public ownerSid: number) {
        super(x, y)
    }
}

/**
 * Reason an object was removed from the game
 */

export enum ObjectRemoveReason {
    PLAYERLEAVE,
    BUILDINGBREAK
}