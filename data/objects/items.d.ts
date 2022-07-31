/**
 * Each item id contained in an enum
 */
export declare enum ItemIds {
    APPLE = 0,
    COOKIE = 1,
    CHEESE = 2,
    WOOD_WALL = 3,
    STONE_WALL = 4,
    CASTLE_WALL = 5,
    SPIKE = 6,
    GREATER_SPIKE = 7,
    POISON_SPIKE = 8,
    SPINNING_SPIKE = 9,
    WINDMILL = 10,
    FASTER_WINDMILL = 11,
    POWER_MILL = 12,
    MINE = 13,
    SAPPLING = 14,
    PIT_TRAP = 15,
    BOOST_PAD = 16,
    TURRET = 17,
    PLATFORM = 18,
    HEALING_PAD = 19,
    SPAWN_PAD = 20,
    BLOCKER = 21,
    TELEPORTER = 22
}
/**
 * Item interface declaring what every item should contain
 */
export interface Item {
    name: string;
    desc: string;
    req: [string, number] | [string, number, string, number];
    age?: number;
    scale: number;
    holdOffset: number;
    projDmg?: boolean;
    health?: number;
    placeOffset?: number;
    pre?: number;
    dmg?: number;
    spritePadding?: number;
    pDmg?: number;
    turnSpeed?: number;
    pps?: number;
    iconLineMult?: number;
    type?: number;
    trap?: boolean;
    colDiv?: number;
    ignoreCollision?: boolean;
    hideFromEnemy?: boolean;
    boostSpeed?: number;
    doUpdate?: boolean;
    projectile?: number;
    zIndex?: number;
    shootRange?: number;
    healCol?: number;
    shootRate?: number;
    spawnPoint?: boolean;
    blocker?: number;
    teleport?: boolean;
}
/**
 * List of game items
 */
export declare const itemList: Item[];
