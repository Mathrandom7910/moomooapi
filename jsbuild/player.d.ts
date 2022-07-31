import { numu } from "./misc";
import { Pos } from "@mathrandom7910/pos";
export interface Posable {
    /**
     * Returns a position object which can be used to perform math calculations easily
     * @returns Position object
     */
    getAsPos(): Pos;
}
/**
 * Player interface containing info sent on every game tick
 */
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
export declare class Player extends Pos implements IPlayerDat, Posable {
    x: number;
    y: number;
    sid: number;
    id: string;
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
    health: number;
    name: string;
    chatMessage: string | null;
    messageTimeout: number;
    assign(dat: IPlayerDat): void;
    getAsPos(): Player;
}
export declare type WeaponsType = [number, numu];
export declare type ItemsType = [number, number, number, number, numu, numu, numu, numu];
/**
 * Self player class with more data than that of the player class
 */
export declare class SelfPlayer extends Player {
    weapons: WeaponsType;
    items: ItemsType;
    getFoodType(): number;
    getWallType(): number;
    getSpikeType(): number;
    getMillType(): number;
    searchForId(id: number): number | null;
    getSapplingType(): number | null;
    getMineType(): number | null;
    getSpecialType(): number | null;
    /**
     *
     * @returns The type of pad selected at age 4 (boost or trap)
     */
    getPadType(): number | null;
    getPrimaryType(): number;
    getSecondaryType(): numu;
}
