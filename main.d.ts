import { EventEmitter, PlayerEvents } from "./events";
import { C2SPacketType, RawC2SPacket, S2CPacketType } from "./data/network/packets";
import { Player, SelfPlayer } from "./player";
import * as msgpack from "./msgpack";
import { Repeater, SkinColours } from "./misc";
import { ObjectRemoveReason, GameObject } from "./gameobject";
import { ItemIds } from "./data/objects/items";
import { WeaponIds } from "./data/objects/weapons";
import { HatIds } from "./data/gear/hats";
import { AccessoryIds } from "./data/gear/accessories";
import { Projectile } from "./projectiles";
import { Pos } from "@mathrandom7910/pos";
export declare const msgpack2: typeof msgpack;
/**
 * MooMoo API class, should be constructed BEFORE the websocket connection is open (before page load)
 */
export declare class MooMooAPI extends EventEmitter<PlayerEvents> {
    static SkinColours: typeof SkinColours;
    static C2SPacketType: typeof C2SPacketType;
    static S2CPacketType: typeof S2CPacketType;
    static ObjectRemoveReason: typeof ObjectRemoveReason;
    static ItemIds: typeof ItemIds;
    static WeaponIds: typeof WeaponIds;
    static Repeater: typeof Repeater;
    static msgpack: typeof msgpack;
    static HatIds: typeof HatIds;
    static AccessoryIds: typeof AccessoryIds;
    /**
     * The raw websocket to interact with the game
     */
    socket: WebSocket | null;
    /**
     * Current game player
     */
    player: SelfPlayer;
    /**
     * Array of players that have been onscreen
     */
    players: Player[];
    /**
     * Array of game objects that are sent to the client and still exist
     */
    gameObjects: GameObject[];
    /**
     * Boolean value if the player is alive or not
     */
    alive: boolean;
    hatsOwned: Record<number, boolean>;
    accessoriesOwned: Record<number, boolean>;
    projectiles: Projectile[];
    isAutoAtk: boolean;
    constructor(dynws?: boolean);
    private initSocket;
    /**
     * Returns a player from their id (string)
     * @param id The id of the player to search for
     * @returns The player if found, otherwise null
     */
    getPlayerById(id: string): Player | null;
    /**
     * Returns a player from their sid (number)
     * @param sid The sid of the player to search for
     * @returns The player if found, otherwise null
     */
    getPlayerBySid(sid: number): Player | null;
    /**
     * Sends a raw packet to the server
     * @param packet The packet to send
     */
    sendRaw(packet: RawC2SPacket): void;
    /**
     * Sends a basic packet to the server, allows easier formatting when dealing with data
     * @param t The type of packet to send to the server
     * @param payload Payload of the packet to send
     */
    sendBasic(t: C2SPacketType, ...payload: any): void;
    /**
     * Sends a packet that does not get picked up by the outgoing packet register, can help with preventing infinite (really big) loops
     * @param t The type of packet to send to the server
     * @param payload Payload of the packet to send
     */
    sendHidden(t: string, ...payload: any): void;
    /**
     * Spawn into the game with specified data, recommended to check if dead, as sending this packet multiple times while alive will result in a kick
     * @param name Name to spawn in game with, several names are blacklisted
     * @param skin Skin colour to spawn in game with
     * @param moreRes Whether or not to spawn with more resources
     */
    spawn(sname?: string, sskin?: SkinColours, moreRes?: boolean): void;
    /**
     * Helper method to set hand to an item or weapon
     * @param id Id of item or weapon to set to
     * @param isWeapon Boolean on wether or not it is switching to a weapon
     */
    setHand(id: ItemIds | WeaponIds, isWeapon: boolean): void;
    /**
     * Sets currently held item.
     * @param id Id of the item to set to
     */
    setItem(id: ItemIds): void;
    /**
     * Sets the currently held weapon
     * @param id Id of the weapon to set to
     */
    setWeapon(id: WeaponIds): void;
    /**
     * Begins or ends attacking
     * @param on Boolean value if should begin attacking, or stop attacking
     * @param direction Direction to attack in
     */
    attack(on: boolean, direction?: number | null): void;
    /**
     * Attacks only once when called
     * @param direction Direction to attack in
     */
    singleSwing(direction?: number | null): void;
    /**
     * Places an item
     * @param item Type of item to place
     * @param direction Direction of item to place
     */
    placeItem(item: ItemIds, direction?: number | null): void;
    toggleAutoAttack(): void;
    setGear(buy: boolean, id: HatIds | AccessoryIds, isAccessory: boolean): void;
    buyGear(id: HatIds | AccessoryIds, isAccessory: boolean): void;
    buyHat(id: HatIds): void;
    equipGear(id: HatIds | AccessoryIds, isAccessory: boolean): void;
    equipHat(id: HatIds): void;
    buyAccessory(id: AccessoryIds): void;
    equipAccessory(id: AccessoryIds): void;
    chat(text: string): void;
    removeProjectile(projectileSid: number): void;
    setDirection(dir: number): void;
    lookAt(pos: Pos): void;
}
