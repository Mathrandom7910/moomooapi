export interface Accessory {
    id: number;
    name: string;
    price: number;
    scale: number;
    xOff?: number;
    desc: string;
    spdMult?: number;
    dmgMultO?: number;
    healthRegen?: number;
    spin?: boolean;
    dmg?: number;
    healD?: number;
}
export declare enum AccessoryIds {
    SNOWBALL = 12,
    TREE_CAPE = 9,
    STONE_CAPE = 10,
    COOKIE_CAPE = 3,
    COW_CAPE = 8,
    MONKEY_TAIL = 11,
    APPLE_BASKET = 17,
    WINTER_CAPE = 6,
    SKULL_CAPE = 4,
    DASH_CAPE = 5,
    DRAGON_CAPE = 2,
    SUPER_CAPE = 1,
    TROLL_CAPE = 7,
    THORNS = 14,
    BLOCKADES = 15,
    DEVILS_TAIL = 20,
    SAWBLADE = 16,
    ANGEL_WINGS = 13,
    SHADOW_WINGS = 19,
    BLOOD_WINGS = 18,
    CORRUPT_X_WINGS = 21
}
export declare const accessories: Accessory[];
