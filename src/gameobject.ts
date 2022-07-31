import { Pos } from "@mathrandom7910/pos";
import { Posable } from "./player";

export class GameObject extends Pos implements Posable {
    constructor(public id: number, x: number, y: number, public dir: number, public scale: number, public type: number, public buildType: number, public ownerSid: number) {
        super(x, y)
    }

    getAsPos(): GameObject {
        return this;
    }
}

/**
 * Reason an object was removed from the game
 */

export enum ObjectRemoveReason {
    PLAYERLEAVE,
    BUILDINGBREAK
}