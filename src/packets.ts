// adapted from https://github.com/Illya9999/OasisProject/blob/master/src/utils/packetCodes.js

/**
 * Enum containing each packet type which can be sent from the client to the server
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

/**
 * Enum containing each packet type which can be sent from the server to the client
 */

export enum S2CPacketType {
    announce = "ann",
    init = "io-init",
    initTribe = "id",
    setSid = "1", //sent short after each spawn
    kick = "d",
    addPlayer = "2",
    updatePlayers = "33",
    removePlayer = "4",
    updateLeaderBoard = "5",
    addObject = "6",
    updateAi = "a",
    playerSwing = "7",
    moostafaSwing = "aa",
    wiggle = "8",
    shootTurret = "sp",
    updateMats = "9",
    health = "h",
    death = "11",
    removeBuild = "12",
    removeObject = "13",
    setItemCount = "14",
    setAge = "15",
    listUpgrades = "16",
    setItemsBar = "17",
    addProjectile = "18",
    removeProjectile = "19",
    serverRestart = "20",
    addTribe = "ac",
    deleteTribe = "ad",
    requestJoin = "an",
    setTribe = "st",
    setTribeMembers = "sa",
    minimapLocation = "mm",
    chat = "ch",
    updateShop = "us",
    ping = "pp",
    dmgTest = "t",
    pingMap = "p"
}

export type RawPacket = [C2SPacketType | S2CPacketType, [...any[]]]
export type RawC2SPacket = [C2SPacketType, [...any[]]]
export type RawS2CPacket = [S2CPacketType, [...any[]]]