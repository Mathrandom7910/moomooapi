/**
 * Player interface containing info sent on every game tick
 */

import { ItemIds } from "./data/objects/items";
import { WeaponIds } from "./data/objects/weapons";
import { numu } from "./misc";

export interface IPlayerDat {
    x: number;
    y: number;
    sid: number;
    dir: number;
    currentObject: number;
    wep: number;
    variant: number;
    tribe: string;
    isLeader: boolean;
    hat: number;
    acc: number;
    isSkull: boolean;
    zIndex: number;
}

/**
 * Player class containing information on a specific player
 */

export class Player implements IPlayerDat{
    x: number = -2;
    y: number = -2;
    sid: number = -2;
    id: string = "NULL";
    dir: number = 0;
    currentObject: number = -2;
    wep: number = -2;
    variant: number = -2;
    tribe: string = "NULL";
    isLeader: boolean = false;
    hat: number = -2;
    acc: number = -2;
    isSkull: boolean = false;
    zIndex: number = -1;
    health: number = 100;
    name = "NULL";
    chatMessage: string | null = null;
    messageTimeout = -1;


    assign(dat: IPlayerDat) {
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
}



export type WeaponsType = [number, numu];
export type ItemsType = [number, number, number, number, numu, numu, numu, numu];

/**
 * Self player class with more data than that of the player class
 */

export class SelfPlayer extends Player {
    weapons: WeaponsType = [WeaponIds.TOOL_HAMMER, undefined];
    //[0, 3, 6, 10];
    items: ItemsType = [ItemIds.APPLE, ItemIds.WOOD_WALL, ItemIds.SPIKE, ItemIds.WINDMILL, undefined, undefined, undefined, undefined];

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

    searchForId(id: number) {
        for(let i of this.items) {
            if(i == id) return i;
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