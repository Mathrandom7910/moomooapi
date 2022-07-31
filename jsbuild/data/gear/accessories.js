export var AccessoryIds;
(function (AccessoryIds) {
    AccessoryIds[AccessoryIds["SNOWBALL"] = 12] = "SNOWBALL";
    AccessoryIds[AccessoryIds["TREE_CAPE"] = 9] = "TREE_CAPE";
    AccessoryIds[AccessoryIds["STONE_CAPE"] = 10] = "STONE_CAPE";
    AccessoryIds[AccessoryIds["COOKIE_CAPE"] = 3] = "COOKIE_CAPE";
    AccessoryIds[AccessoryIds["COW_CAPE"] = 8] = "COW_CAPE";
    AccessoryIds[AccessoryIds["MONKEY_TAIL"] = 11] = "MONKEY_TAIL";
    AccessoryIds[AccessoryIds["APPLE_BASKET"] = 17] = "APPLE_BASKET";
    AccessoryIds[AccessoryIds["WINTER_CAPE"] = 6] = "WINTER_CAPE";
    AccessoryIds[AccessoryIds["SKULL_CAPE"] = 4] = "SKULL_CAPE";
    AccessoryIds[AccessoryIds["DASH_CAPE"] = 5] = "DASH_CAPE";
    AccessoryIds[AccessoryIds["DRAGON_CAPE"] = 2] = "DRAGON_CAPE";
    AccessoryIds[AccessoryIds["SUPER_CAPE"] = 1] = "SUPER_CAPE";
    AccessoryIds[AccessoryIds["TROLL_CAPE"] = 7] = "TROLL_CAPE";
    AccessoryIds[AccessoryIds["THORNS"] = 14] = "THORNS";
    AccessoryIds[AccessoryIds["BLOCKADES"] = 15] = "BLOCKADES";
    AccessoryIds[AccessoryIds["DEVILS_TAIL"] = 20] = "DEVILS_TAIL";
    AccessoryIds[AccessoryIds["SAWBLADE"] = 16] = "SAWBLADE";
    AccessoryIds[AccessoryIds["ANGEL_WINGS"] = 13] = "ANGEL_WINGS";
    AccessoryIds[AccessoryIds["SHADOW_WINGS"] = 19] = "SHADOW_WINGS";
    AccessoryIds[AccessoryIds["BLOOD_WINGS"] = 18] = "BLOOD_WINGS";
    AccessoryIds[AccessoryIds["CORRUPT_X_WINGS"] = 21] = "CORRUPT_X_WINGS";
})(AccessoryIds || (AccessoryIds = {}));
export const accessories = [{
        id: 12,
        name: "Snowball",
        price: 1000,
        scale: 105,
        xOff: 18,
        desc: "no effect"
    }, {
        id: 9,
        name: "Tree Cape",
        price: 1000,
        scale: 90,
        desc: "no effect"
    }, {
        id: 10,
        name: "Stone Cape",
        price: 1000,
        scale: 90,
        desc: "no effect"
    }, {
        id: 3,
        name: "Cookie Cape",
        price: 1500,
        scale: 90,
        desc: "no effect"
    }, {
        id: 8,
        name: "Cow Cape",
        price: 2000,
        scale: 90,
        desc: "no effect"
    }, {
        id: 11,
        name: "Monkey Tail",
        price: 2000,
        scale: 97,
        xOff: 25,
        desc: "Super speed but reduced damage",
        spdMult: 1.35,
        dmgMultO: 0.2
    }, {
        id: 17,
        name: "Apple Basket",
        price: 3000,
        scale: 80,
        xOff: 12,
        desc: "slowly regenerates health over time",
        healthRegen: 1
    }, {
        id: 6,
        name: "Winter Cape",
        price: 3000,
        scale: 90,
        desc: "no effect"
    }, {
        id: 4,
        name: "Skull Cape",
        price: 4000,
        scale: 90,
        desc: "no effect"
    }, {
        id: 5,
        name: "Dash Cape",
        price: 5000,
        scale: 90,
        desc: "no effect"
    }, {
        id: 2,
        name: "Dragon Cape",
        price: 6000,
        scale: 90,
        desc: "no effect"
    }, {
        id: 1,
        name: "Super Cape",
        price: 8000,
        scale: 90,
        desc: "no effect"
    }, {
        id: 7,
        name: "Troll Cape",
        price: 8000,
        scale: 90,
        desc: "no effect"
    }, {
        id: 14,
        name: "Thorns",
        price: 10000,
        scale: 115,
        xOff: 20,
        desc: "no effect"
    }, {
        id: 15,
        name: "Blockades",
        price: 10000,
        scale: 95,
        xOff: 15,
        desc: "no effect"
    }, {
        id: 20,
        name: "Devils Tail",
        price: 10000,
        scale: 95,
        xOff: 20,
        desc: "no effect"
    }, {
        id: 16,
        name: "Sawblade",
        price: 12000,
        scale: 90,
        spin: true,
        xOff: 0,
        desc: "deal damage to players that damage you",
        dmg: 0.15
    }, {
        id: 13,
        name: "Angel Wings",
        price: 15000,
        scale: 138,
        xOff: 22,
        desc: "slowly regenerates health over time",
        healthRegen: 3
    }, {
        id: 19,
        name: "Shadow Wings",
        price: 15000,
        scale: 138,
        xOff: 22,
        desc: "increased movement speed",
        spdMult: 1.1
    }, {
        id: 18,
        name: "Blood Wings",
        price: 20000,
        scale: 178,
        xOff: 26,
        desc: "restores health when you deal damage",
        healD: 0.2
    }, {
        id: 21,
        name: "Corrupt X Wings",
        price: 20000,
        scale: 178,
        xOff: 26,
        desc: "deal damage to players that damage you",
        dmg: 0.25
    }];
//# sourceMappingURL=accessories.js.map