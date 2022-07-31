/**
 * Weapon interface declaring what every weapon should contain
 */
export interface Weapon {
    id: number;
    type: number;
    name: string;
    desc: string;
    src: string;
    length: number;
    width: number;
    xOff: number;
    yOff: number;
    dmg?: number;
    range?: number;
    gather?: number;
    speed?: number;
    age?: number;
    spdMult?: number;
    pre?: number;
    iPad?: number;
    knock?: number;
    hitSlow?: number;
    req?: [string, number];
    projectile?: number;
    shield?: number;
    sDmg?: number;
    aboveHand?: boolean;
    armS?: number;
    steal?: number;
    rec?: number;
    hndS?: number;
    hndD?: number;
    hideProjectile?: boolean;
}
/**
 * Each weapon id contained in an enum
 */
export declare enum WeaponIds {
    TOOL_HAMMER = 0,
    HAND_AXE = 1,
    GREAT_AXE = 2,
    SHORT_SWORD = 3,
    KATANA = 4,
    POLE_ARM = 5,
    BAT = 6,
    DAGGERS = 7,
    STICK = 8,
    HUNTING_BOW = 9,
    GREAT_HAMMER = 10,
    WOODEN_SHIELD = 11,
    CROSSBOW = 12,
    REPEATER_CROSSBOW = 13,
    MC_GRABBY = 14,
    MUSKET = 15
}
/**
 * List of weapons in game
 */
export declare const weaponList: Weapon[];
