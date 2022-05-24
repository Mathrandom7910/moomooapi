// adapted from https://github.com/Illya9999/OasisProject/blob/master/src/utils/packetCodes.js

/**
 * Enum containing each packet type which can be sent from the client to the server
 */

export enum C2SPacketType {
    SPAWN = "sp",
    CHAT = "ch",
    ATTACK ="c",
    PING = "pp",
    SET_ANGLE = "2",
    SELECT_ITEM = "5",
    UPGRADE = "6",
    AUTO_ATTACK = "7",
    CREATE_TRIBE = "8",
    LEAVE_TRIBE = "9",
    REQUEST_JOIN_TRIBE = "10",
    ACCEPT_TRIBE_REQUEST = "11",
    KICK_FROM_TRIBE = "12",
    BUY_FROM_SHOP = "13c",
    PING_MAP = "14",
    MOVE = "33"
}

/**
 * Enum containing each packet type which can be sent from the server to the client
 */

export enum S2CPacketType {
    ANNOUNCE = "ann",
    INIT = "io-init",
    INIT_TRIBES = "id",
    SET_SID = "1",
    KICK = "d",
    ADD_PLAYER = "2",
    UPDAE_PLAYERS = "33",
    REMOVE_PLAYER = "4",
    UPDATE_LEADER_BOARD = "5",
    ADD_OBJECT = "6",
    UPDATE_AIS = "a",
    PLAYER_SWING = "7",
    MOOSTAFA_SWING = "aa",
    WIGGLE = "8",
    SHOOT_TURRET = "sp",
    UPDATE_MATS = "9",
    HEALTH = "h",
    DEATH = "11",
    /**
     * Removes only one building by it's id.
     */
    REMOVE_OBJECT = "12",
    /**
     * Removes all buildings by player sid.
     */
    REMOVE_ALL_OBJECTS = "13",
    SET_ITEM_COUNT = "14",
    SET_AGE = "15",
    LIST_UPGRADES = "16",
    SET_ITEMS_BAR = "17",
    ADD_PROJECTILE = "18",
    REMOVE_PROJECTILE = "19",
    SERVER_RESTART = "20",
    ADD_TRIBE = "ac",
    DELETE_TRIBE = "ad",
    REQUEST_JOIN_TRIBE = "an",
    SET_TRIBE = "st",
    SET_TRIBE_MEMBERS = "sa",
    MINIMAP_LOCATIONS = "mm",
    CHAT = "ch",
    UPDATE_SHOP = "us",
    PING = "pp",
    DAMAGE_TEST = "t",
    PING_MAP = "p"
}

export type RawPacket = [C2SPacketType | S2CPacketType, [...any[]]]
export type RawC2SPacket = [C2SPacketType, [...any[]]]
export type RawS2CPacket = [S2CPacketType, [...any[]]]