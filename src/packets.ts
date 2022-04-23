// https://github.com/Illya9999/OasisProject/blob/master/src/utils/packetCodes.js
/*
    CLIENT: {
        START: "sp",
        CHAT: "ch",
        ATTACK :"c",
        PING: "pp",
        ANGLE: "2",
        SELECT_ITEM: "5",
        UPGRADE: "6",
        AUTO_ATK: "7",
        CLAN_CREATE: "8",
        LEAVE_CLAN: "9",
        CLAN_REQ_JOIN: "10",
        CLAN_ACC_JOIN: "11",
        CLAN_KICK: "12",
        ITEM_BUY: "13c",
        NOTIFY_CLAN: '14',
        MOVE: "33"
    },
    SERVER: {
		ANNOUNCE: 'ann',
        INIT_PLAYER: 'io-init',
        INIT_TRIBES: 'id',
        PLAYER_SET_ID: '1', //sent short after each spawn
        DISCONNECT: 'd',
        PLAYER_ADD: "2",
        PLAYER_UPDATE: "33",
        PLAYER_REMOVE: "4",
        LEADERBOAD: "5",
        LOAD_GAME_OBJ: "6",
        AI_UPDATE: "a",
        GATHER_ANIM: "7",
        MOOSTAFA_ANIM: "aa",
        WIGGLE: "8",
        WIGGLE_2: "sp",
        STAT_UPDATE: "9",
        UPDATE_HEALTH: "h",
        PLAYER_DIE: "11",
        BUILDING_DESTROYED: "12",
        PLAYER_LEFT: "13", //this probably tells the game that someone left and their items should be removed
        UPDATE_ITEM_COUNT: "14",
        UPDATE_AGE: "15",
        UPGRADES: "16",
        UPDATE_ACTION_BAR: "17",
        ADD_PROJECTILE: "18",
        UPDATE_PROJECTILES: "19",
        SERVER_RESTARTING: "20",
        CLAN_ADD: "ac",
        CLAN_DEL: "ad",
        JOIN_REQ: "an",
        PLAYER_SET_CLAN: "st",
        SET_CLAN_PLAYERS: "sa",
        MINIMAP_LOCATIONS: "mm",
        PLAYER_CHAT: "ch",
        UPDATE_STORE_ITEMS: "us",
        PING: "pp",
        DAMAGED_TEST: "t",
        GUILD_NOTIFY: "p"
    }
*/

export enum C2SPacketType {
    spawn = "sp",
    chat = "ch",
    attack ="c",
    ping = "pp",
    setAngle = "2",
    selectItem = "5",
    upgrade = "6",
    autoAttack = "7",
    createTribe = "8",
    leaveTribe = "9",
    requestJoinTribe = "10",
    acceptTribeRequest = "11",
    kickFromTribe = "12",
    buyFromShop = "13c",
    pingMap = "14",
    move = "33"
}

export type RawPacket = [C2SPacketType, [...any]]