import { ObjectAddEvent as ObjectAddEvent, EventEmitter, HealthEvent, PacketReceiveEvent, PacketSendEvent, PlayerEvent, ObjectRemoveEvent, ChatEvent, ServerTickEvent, ProjectileAddEvent, ProjectileRemoveEvent } from "./events";
import { C2SPacketType, S2CPacketType } from "./data/network/packets";
import { Player, SelfPlayer } from "./player";
import * as msgpack from "./msgpack";
import { Repeater, SkinColours } from "./misc";
import { ObjectRemoveReason, GameObject } from "./gameobject";
import { ItemIds } from "./data/objects/items";
import { WeaponIds } from "./data/objects/weapons";
import { HatIds, hats } from "./data/gear/hats";
import { accessories, AccessoryIds } from "./data/gear/accessories";
import { Projectile } from "./projectiles";
var mLoc = msgpack;
export const msgpack2 = mLoc.msgpack;
var lastTime = Date.now();
/**
 * MooMoo API class, should be constructed BEFORE the websocket connection is open (before page load)
 */
export class MooMooAPI extends EventEmitter {
    constructor(dynws = false) {
        super();
        /**
         * The raw websocket to interact with the game
         */
        this.socket = null;
        /**
         * Current game player
         */
        this.player = new SelfPlayer();
        /**
         * Array of players that have been onscreen
         */
        this.players = [];
        /**
         * Array of game objects that are sent to the client and still exist
         */
        this.gameObjects = [];
        /**
         * Boolean value if the player is alive or not
         */
        this.alive = false;
        this.hatsOwned = {};
        this.accessoriesOwned = {};
        this.projectiles = [];
        this.isAutoAtk = false;
        const that = this;
        if (dynws) {
            Object.defineProperty(WebSocket.prototype, "hiddenSend", {
                value: WebSocket.prototype.send
            });
            Object.defineProperty(WebSocket.prototype, "send", {
                value: function (m) {
                    if (that.socket == null)
                        that.socket = this;
                    const packEv = new PacketSendEvent(msgpack2.decode(new Uint8Array(m)));
                    that.emit("packetSend", packEv);
                    if (packEv.isCanceled)
                        return;
                    if (packEv.type == C2SPacketType.SPAWN)
                        that.alive = true;
                    const t = this;
                    t.hiddenSend(m);
                }
            });
        }
        else {
            class WS extends WebSocket {
                hiddenSend(data) {
                    super.send(data);
                }
                constructor(url) {
                    super(url);
                    this.send = (m) => {
                        const packEv = new PacketSendEvent(msgpack2.decode(new Uint8Array(m)));
                        that.emit("packetSend", packEv);
                        if (packEv.isCanceled) {
                            return;
                        }
                        else if (packEv.type == C2SPacketType.SPAWN) {
                            that.alive = true;
                        }
                        else if (packEv.type == C2SPacketType.SET_ATTACK_STATE) {
                            if (packEv.payload[0]) {
                                that.isAutoAtk = !that.isAutoAtk;
                            }
                        }
                        this.hiddenSend(m);
                    };
                    that.socket = this;
                    that.initSocket();
                }
            }
            Object.defineProperty(window, "WebSocket", {
                value: WS
            });
        }
        hats.forEach(hat => {
            if (hat.price <= 0 && !hat.dontSell) {
                this.hatsOwned[hat.id] = true;
            }
        });
        // no free accessories, incase of highly improbably update
        accessories.forEach(acc => {
            if (acc.price <= 0) {
                this.accessoriesOwned[acc.id] = true;
            }
        });
    }
    static { this.SkinColours = SkinColours; }
    static { this.C2SPacketType = C2SPacketType; }
    static { this.S2CPacketType = S2CPacketType; }
    static { this.ObjectRemoveReason = ObjectRemoveReason; }
    static { this.ItemIds = ItemIds; }
    static { this.WeaponIds = WeaponIds; }
    static { this.Repeater = Repeater; }
    static { this.msgpack = msgpack2; }
    static { this.HatIds = HatIds; }
    static { this.AccessoryIds = AccessoryIds; }
    initSocket() {
        this.socket?.addEventListener("message", (m) => {
            const packEvt = new PacketReceiveEvent(msgpack2.decode(new Uint8Array(m.data)));
            this.emit("packetReceive", packEvt);
            //this.onPacketReceive(packEvt);
            const payload = packEvt.payload;
            const type = packEvt.type;
            switch (type) {
                case S2CPacketType.HEALTH:
                    const sid = payload[0];
                    this.emit("health", new HealthEvent(sid, payload[1]));
                    this.players[sid].health = payload[1];
                    break;
                case S2CPacketType.INIT:
                    this.player.id = payload[0];
                    break;
                case S2CPacketType.SET_SID:
                    this.players[payload[0]] = this.player;
                    this.player.sid = payload[0];
                    break;
                case S2CPacketType.UPDAE_PLAYERS:
                    var players = [];
                    const timeNow = Date.now();
                    for (const projectile of this.projectiles) {
                        projectile.range -= (timeNow - lastTime) * projectile.speed;
                        if (projectile.range <= 0) {
                            this.removeProjectile(projectile.sid);
                        }
                    }
                    for (let i = 0; i < payload[0].length; i += 13) {
                        const plinf = payload[0].slice(i, i + 13);
                        const thisPlayer = {
                            sid: plinf[0],
                            x: plinf[1],
                            y: plinf[2],
                            dir: plinf[3],
                            currentObject: plinf[4],
                            wep: plinf[5],
                            variant: plinf[6],
                            tribe: plinf[7],
                            isLeader: plinf[8],
                            hat: plinf[9],
                            acc: plinf[10],
                            isSkull: plinf[11],
                            zIndex: plinf[12]
                        };
                        if (!this.players[thisPlayer.sid]) {
                            console.warn("Ran into unpredicted circumstance current player cannot be found, IPlayerDat, this.players, IPlayerDat.sid", thisPlayer, this.players, thisPlayer.sid);
                            this.players[thisPlayer.sid] = new Player();
                        }
                        this.emit("updatePlayer", thisPlayer);
                        this.players[thisPlayer.sid].assign(thisPlayer);
                        players.push(thisPlayer);
                    }
                    this.emit("serverTick", new ServerTickEvent(players));
                    break;
                case S2CPacketType.REMOVE_PLAYER:
                    const player = this.getPlayerById(payload[0]);
                    if (player) {
                        this.emit("playerLeave", new PlayerEvent(player));
                        delete this.players[player.sid];
                    }
                    break;
                case S2CPacketType.ADD_PLAYER:
                    //   0            1   2      3      4     5  6    7   8   9
                    //['zTKfDDx58e', 1, 'name', 8491, 10519, 0, 100, 100, 35, 0]
                    const dataPayload = payload[0];
                    const aSid = dataPayload[1];
                    var aPlayer = this.player;
                    if (aSid != this.player.sid)
                        aPlayer = new Player();
                    aPlayer.sid = aSid;
                    aPlayer.id = dataPayload[0];
                    aPlayer.name = dataPayload[2];
                    aPlayer.x = dataPayload[3];
                    aPlayer.y = dataPayload[4];
                    this.players[aSid] = aPlayer;
                    this.emit("addPlayer", new PlayerEvent(aPlayer));
                    break;
                case S2CPacketType.ADD_OBJECT:
                    for (let i = 0; i < payload[0].length; i += 8) {
                        const binf = payload[0].slice(i, i + 8);
                        const thisBuild = new GameObject(binf[0], binf[1], binf[2], binf[3], binf[4], binf[5], binf[6], binf[7]);
                        this.gameObjects[thisBuild.id] = thisBuild;
                        this.emit("addObject", new ObjectAddEvent(thisBuild));
                    }
                    break;
                case S2CPacketType.REMOVE_OBJECT:
                    this.emit("removeObject", new ObjectRemoveEvent(this.gameObjects[payload[0]], ObjectRemoveReason.BUILDINGBREAK));
                    delete this.gameObjects[payload[0]];
                    break;
                case S2CPacketType.REMOVE_ALL_OBJECTS:
                    for (let i = 0; i < this.gameObjects.length; i++) {
                        const ind = this.gameObjects[i];
                        if (!ind)
                            continue;
                        if (ind.ownerSid == payload[0]) {
                            this.emit("removeObject", new ObjectRemoveEvent(this.gameObjects[i], ObjectRemoveReason.PLAYERLEAVE));
                            this.gameObjects.slice(i, 1);
                        }
                    }
                    break;
                case S2CPacketType.SET_ITEMS_BAR:
                    if (payload[0]) {
                        if (payload[1]) {
                            this.player.weapons = payload[0];
                        }
                        else {
                            this.player.items = payload[0];
                        }
                    }
                    break;
                case S2CPacketType.DEATH:
                    this.isAutoAtk = false;
                    this.player.weapons = [WeaponIds.TOOL_HAMMER, undefined];
                    this.player.items = [ItemIds.APPLE, ItemIds.WOOD_WALL, ItemIds.SPIKE, ItemIds.WINDMILL, undefined, undefined, undefined, undefined];
                    break;
                case S2CPacketType.CHAT:
                    const sidMsg = payload[0];
                    const playerMsg = this.getPlayerBySid(sidMsg);
                    if (playerMsg == null) {
                        return;
                    }
                    const msg = payload[1];
                    clearTimeout(playerMsg.messageTimeout);
                    playerMsg.chatMessage = msg;
                    playerMsg.messageTimeout = setTimeout(() => {
                        playerMsg.chatMessage = null;
                    }, 3000);
                    this.emit("chat", new ChatEvent(sidMsg, msg));
                    break;
                case S2CPacketType.UPDATE_SHOP:
                    /*function updateStoreItems(type, id, index) {
                      if (index) {
                          if (!type)
                              player.tails[id] = 1;
                          else
                              player.tailIndex = id;
                      } else {
                          if (!type)
                              player.skins[id] = 1;
                          else
                              player.skinIndex = id;
                      }
                      if (storeMenu.style.display == "block")
                          generateStoreList();
                  }*/
                    const isSetGear = payload[0];
                    if (isSetGear)
                        break;
                    const isAcc = payload[2];
                    const gearId = payload[1];
                    if (isAcc) {
                        this.accessoriesOwned[gearId] = true;
                    }
                    else {
                        this.hatsOwned[gearId] = true;
                    }
                    break;
                case S2CPacketType.ADD_PROJECTILE:
                    const projectile = new Projectile(payload[0], payload[1], payload[2], payload[3], payload[4], payload[5], payload[6], payload[7]);
                    this.emit("addProjectile", new ProjectileAddEvent(projectile));
                    this.projectiles.push(projectile);
                    break;
                case S2CPacketType.REMOVE_PROJECTILE:
                    this.removeProjectile(payload[0]);
                    break;
            }
        });
    }
    /**
     * Returns a player from their id (string)
     * @param id The id of the player to search for
     * @returns The player if found, otherwise null
     */
    getPlayerById(id) {
        for (let i of this.players) {
            if (i?.id == id)
                return i;
        }
        return null;
    }
    /**
     * Returns a player from their sid (number)
     * @param sid The sid of the player to search for
     * @returns The player if found, otherwise null
     */
    getPlayerBySid(sid) {
        for (let i of this.players) {
            if (i?.sid == sid)
                return i;
        }
        return null;
    }
    /**
     * Sends a raw packet to the server
     * @param packet The packet to send
     */
    sendRaw(packet) {
        this.socket?.send(msgpack2.encode(packet));
    }
    /**
     * Sends a basic packet to the server, allows easier formatting when dealing with data
     * @param t The type of packet to send to the server
     * @param payload Payload of the packet to send
     */
    sendBasic(t, ...payload) {
        this.sendRaw([t, payload]);
    }
    /**
     * Sends a packet that does not get picked up by the outgoing packet register, can help with preventing infinite (really big) loops
     * @param t The type of packet to send to the server
     * @param payload Payload of the packet to send
     */
    sendHidden(t, ...payload) {
        var sock = this.socket;
        sock?.hiddenSend(msgpack2.encode([t, payload]));
    }
    /**
     * Spawn into the game with specified data, recommended to check if dead, as sending this packet multiple times while alive will result in a kick
     * @param name Name to spawn in game with, several names are blacklisted
     * @param skin Skin colour to spawn in game with
     * @param moreRes Whether or not to spawn with more resources
     */
    spawn(sname = "moomooapi", sskin = SkinColours.RED, moreRes = true) {
        this.sendBasic(C2SPacketType.SPAWN, { name: sname, skin: sskin, moofoll: moreRes });
    }
    /**
     * Helper method to set hand to an item or weapon
     * @param id Id of item or weapon to set to
     * @param isWeapon Boolean on wether or not it is switching to a weapon
     */
    setHand(id, isWeapon) {
        this.sendBasic(C2SPacketType.SELECT_ITEM, id, isWeapon);
    }
    /**
     * Sets currently held item.
     * @param id Id of the item to set to
     */
    setItem(id) {
        this.setHand(id, false);
    }
    /**
     * Sets the currently held weapon
     * @param id Id of the weapon to set to
     */
    setWeapon(id) {
        this.setHand(id, true);
    }
    /**
     * Begins or ends attacking
     * @param on Boolean value if should begin attacking, or stop attacking
     * @param direction Direction to attack in
     */
    attack(on, direction = null) {
        this.sendBasic(C2SPacketType.ATTACK, on, direction);
    }
    /**
     * Attacks only once when called
     * @param direction Direction to attack in
     */
    singleSwing(direction = null) {
        this.attack(true, direction);
        this.attack(false);
    }
    /**
     * Places an item
     * @param item Type of item to place
     * @param direction Direction of item to place
     */
    placeItem(item, direction = null) {
        this.setItem(item);
        this.singleSwing(direction);
        this.setWeapon(this.player.wep);
    }
    toggleAutoAttack() {
        this.sendBasic(C2SPacketType.SET_ATTACK_STATE, 1);
    }
    setGear(buy, id, isAccessory) {
        this.sendBasic(C2SPacketType.BUY_AND_EQUIP, buy, id, isAccessory);
    }
    buyGear(id, isAccessory) {
        this.setGear(true, id, isAccessory);
    }
    buyHat(id) {
        this.buyGear(id, false);
    }
    equipGear(id, isAccessory) {
        this.setGear(false, id, isAccessory);
    }
    equipHat(id) {
        this.equipGear(id, false);
    }
    buyAccessory(id) {
        this.buyGear(id, true);
    }
    equipAccessory(id) {
        this.equipGear(id, true);
    }
    chat(text) {
        this.sendBasic(C2SPacketType.CHAT, text);
    }
    removeProjectile(projectileSid) {
        for (let i = 0; i < this.projectiles.length; i++) {
            if (this.projectiles[i].sid == projectileSid) {
                this.emit("removeProjectile", new ProjectileRemoveEvent(this.projectiles[i]));
                this.projectiles.splice(i, 1);
            }
        }
    }
    setDirection(dir) {
        this.sendBasic(C2SPacketType.SET_ANGLE, dir);
    }
    lookAt(pos) {
        this.setDirection(this.player.getAsPos().dirTo(pos));
    }
}
Object.defineProperty(window, "MooMooAPI", {
    value: MooMooAPI
});
//# sourceMappingURL=main.js.map