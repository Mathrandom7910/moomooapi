export declare enum HatIds {
    SHAME = 45,
    MOO_CAP = 51,
    APPLE_CAP = 50,
    MOO_HEAD = 28,
    PIG_HEAD = 29,
    FLUFF_HEAD = 30,
    PANDOU_HEAD = 36,
    BEAR_HEAD = 37,
    MONKEY_HEAD = 38,
    POLAR_HEAD = 44,
    FEZ_HAT = 35,
    ENIGMA_HAT = 42,
    BLITZ_HAT = 43,
    BOB_XIII_HAT = 49,
    PUMPKIN = 57,
    BUMMLE_HAT = 8,
    STRAW_HAT = 2,
    WINTER_CAP = 15,
    COWBOY_HAT = 5,
    RANGER_HAT = 4,
    EXPLORER_HAT = 18,
    FLIPPER_HAT = 31,
    MARKSMAN_CAP = 1,
    BUSH_GEAR = 10,
    HALO = 48,
    SOLDIER_HELMET = 6,
    ANTI_VENOM_GEAR = 23,
    MEDIC_GEAR = 13,
    MINERS_HELMET = 9,
    MUSKETEER_HAT = 32,
    BULL_HELMET = 7,
    EMP_HELMET = 22,
    BOOSTER_HAT = 12,
    BARBARIAN_ARMOR = 26,
    PLAGUE_MASK = 21,
    BULL_MASK = 46,
    WINDMILL_HAT = 14,
    SPIKE_GEAR = 11,
    TURRET_GEAR = 53,
    SAMURAI_ARMOR = 20,
    DARK_KNIGHT = 58,
    SCAVENGER_GEAR = 27,
    TANK_GEAR = 40,
    THIEF_GEAR = 40,
    BLOODTHIRSTER = 55,
    Assassin_GEAR = 56
}
export interface Hat {
    id: number;
    name: string;
    dontSell?: boolean;
    price: number;
    scale: number;
    desc: string;
    coldM?: number;
    watrImm?: boolean;
    aMlt?: number;
    spdMult?: number;
    dmgMult?: number;
    poisonRes?: number;
    healthRegen?: number;
    extraGold?: number;
    projCost?: number;
    dmgMultO?: number;
    antiTurret?: number;
    dmgK?: number;
    poisonDmg?: number;
    poisonTime?: number;
    bullRepel?: number;
    topSprite?: boolean;
    pps?: number;
    dmg?: number;
    turret?: {
        proj: number;
        range: number;
        rate: number;
    };
    atkSpd?: number;
    healD?: number;
    kScrM?: number;
    bDmg?: number;
    goldSteal?: number;
    noEat?: boolean;
    invisTimer?: number;
}
export declare const hats: Hat[];
