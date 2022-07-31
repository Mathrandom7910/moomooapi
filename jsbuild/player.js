import { ItemIds } from "./data/objects/items";
import { WeaponIds } from "./data/objects/weapons";
import { Pos } from "@mathrandom7910/pos";
/**
 * Player class containing information on a specific player
 */
export class Player {
    constructor() {
        this.x = -2;
        this.y = -2;
        this.sid = -2;
        this.id = "NULL";
        this.dir = 0;
        this.currentObject = -2;
        this.wep = -2;
        this.variant = -2;
        this.tribe = "NULL";
        this.isLeader = false;
        this.hat = -2;
        this.acc = -2;
        this.isSkull = false;
        this.zIndex = -1;
        this.health = 100;
        this.name = "NULL";
        this.chatMessage = null;
        this.messageTimeout = -1;
    }
    assign(dat) {
        this.x = dat.x;
        this.y = dat.y;
        this.sid = dat.sid;
        this.dir = dat.dir;
        this.currentObject = dat.currentObject;
        this.wep = dat.wep;
        this.variant = dat.variant;
        this.tribe = dat.tribe;
        this.isLeader = dat.isLeader;
        this.hat = dat.hat;
        this.acc = dat.acc;
        this.isSkull = dat.isSkull;
        this.zIndex = dat.zIndex;
    }
    getAsPos() {
        return new Pos(this.x, this.y);
    }
}
/**
 * Self player class with more data than that of the player class
 */
export class SelfPlayer extends Player {
    constructor() {
        super(...arguments);
        this.weapons = [WeaponIds.TOOL_HAMMER, undefined];
        //[0, 3, 6, 10];
        this.items = [ItemIds.APPLE, ItemIds.WOOD_WALL, ItemIds.SPIKE, ItemIds.WINDMILL, undefined, undefined, undefined, undefined];
    }
    getFoodType() {
        return this.items[0];
    }
    getWallType() {
        return this.items[1];
    }
    getSpikeType() {
        return this.items[2];
    }
    getMillType() {
        return this.items[3];
    }
    searchForId(id) {
        for (let i of this.items) {
            if (i == id)
                return i;
        }
        return null;
    }
    getSapplingType() {
        return this.searchForId(ItemIds.SAPPLING);
    }
    getMineType() {
        return this.searchForId(ItemIds.MINE);
    }
    getSpecialType() {
        return this.searchForId(ItemIds.TURRET) || this.searchForId(ItemIds.BLOCKER) || this.searchForId(ItemIds.HEALING_PAD) || this.searchForId(ItemIds.PLATFORM) || this.searchForId(ItemIds.TELEPORTER);
    }
    /**
     *
     * @returns The type of pad selected at age 4 (boost or trap)
     */
    getPadType() {
        return this.items[4] || null;
    }
    getPrimaryType() {
        return this.weapons[0];
    }
    getSecondaryType() {
        return this.weapons[1];
    }
}
//# sourceMappingURL=player.js.map