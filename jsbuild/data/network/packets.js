// adapted from https://github.com/Illya9999/OasisProject/blob/master/src/utils/packetCodes.js
/**
 * Enum containing each packet type which can be sent from the client to the server
 */
export var C2SPacketType;
(function (C2SPacketType) {
    /**
    * Packet sent to request a respawn
    *
    * `["sp", [{name: nameString, moofol: followBool, skin: skinNumber}]]`
     */
    C2SPacketType["SPAWN"] = "sp";
    /**
     * Packet sent to send a message to players nearby
     *
     * `["ch", [chatString]]`
     */
    C2SPacketType["CHAT"] = "ch";
    /**
     * Packet sent to start/stop attacking
     *
     * `["c", [startStopBoolean, radicalDirectionNumber]]`
     */
    C2SPacketType["ATTACK"] = "c";
    /**
     * Packet sent to test the player's ping
     *
     * `["pp", []]`
     */
    C2SPacketType["PING"] = "pp";
    /**
     * Packet sent to set the player's direction on the server
     *
     * `["2", [radicalDirectionNumber]]`
     */
    C2SPacketType["SET_ANGLE"] = "2";
    C2SPacketType["SELECT_ITEM"] = "5";
    C2SPacketType["UPGRADE"] = "6";
    C2SPacketType["SET_ATTACK_STATE"] = "7";
    C2SPacketType["CREATE_TRIBE"] = "8";
    C2SPacketType["LEAVE_TRIBE"] = "9";
    C2SPacketType["REQUEST_JOIN_TRIBE"] = "10";
    C2SPacketType["ACCEPT_TRIBE_REQUEST"] = "11";
    C2SPacketType["KICK_FROM_TRIBE"] = "12";
    C2SPacketType["BUY_AND_EQUIP"] = "13c";
    C2SPacketType["PING_MAP"] = "14";
    C2SPacketType["MOVE"] = "33";
})(C2SPacketType || (C2SPacketType = {}));
/**
 * Enum containing each packet type which can be sent from the server to the client
 */
export var S2CPacketType;
(function (S2CPacketType) {
    S2CPacketType["ANNOUNCE"] = "ann";
    S2CPacketType["INIT"] = "io-init";
    S2CPacketType["INIT_TRIBES"] = "id";
    S2CPacketType["SET_SID"] = "1";
    S2CPacketType["KICK"] = "d";
    S2CPacketType["ADD_PLAYER"] = "2";
    S2CPacketType["UPDAE_PLAYERS"] = "33";
    S2CPacketType["REMOVE_PLAYER"] = "4";
    S2CPacketType["UPDATE_LEADER_BOARD"] = "5";
    S2CPacketType["ADD_OBJECT"] = "6";
    S2CPacketType["UPDATE_AIS"] = "a";
    S2CPacketType["PLAYER_SWING"] = "7";
    S2CPacketType["MOOSTAFA_SWING"] = "aa";
    S2CPacketType["WIGGLE"] = "8";
    S2CPacketType["SHOOT_TURRET"] = "sp";
    S2CPacketType["UPDATE_MATS"] = "9";
    S2CPacketType["HEALTH"] = "h";
    S2CPacketType["DEATH"] = "11";
    /**
     * Removes only one building by it's id.
     */
    S2CPacketType["REMOVE_OBJECT"] = "12";
    /**
     * Removes all buildings by player sid.
     */
    S2CPacketType["REMOVE_ALL_OBJECTS"] = "13";
    S2CPacketType["SET_ITEM_COUNT"] = "14";
    S2CPacketType["SET_AGE"] = "15";
    S2CPacketType["LIST_UPGRADES"] = "16";
    S2CPacketType["SET_ITEMS_BAR"] = "17";
    S2CPacketType["ADD_PROJECTILE"] = "18";
    S2CPacketType["REMOVE_PROJECTILE"] = "19";
    S2CPacketType["SERVER_RESTART"] = "20";
    S2CPacketType["ADD_TRIBE"] = "ac";
    S2CPacketType["DELETE_TRIBE"] = "ad";
    S2CPacketType["REQUEST_JOIN_TRIBE"] = "an";
    S2CPacketType["SET_TRIBE"] = "st";
    S2CPacketType["SET_TRIBE_MEMBERS"] = "sa";
    S2CPacketType["MINIMAP_LOCATIONS"] = "mm";
    S2CPacketType["CHAT"] = "ch";
    S2CPacketType["UPDATE_SHOP"] = "us";
    S2CPacketType["PING"] = "pp";
    S2CPacketType["DAMAGE_TEST"] = "t";
    S2CPacketType["PING_MAP"] = "p";
})(S2CPacketType || (S2CPacketType = {}));
//# sourceMappingURL=packets.js.map