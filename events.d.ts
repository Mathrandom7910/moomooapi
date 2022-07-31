import { Pos } from "@mathrandom7910/pos";
import { ObjectRemoveReason, GameObject } from "./gameobject";
import { C2SPacketType, RawC2SPacket, RawPacket, RawS2CPacket, S2CPacketType } from "./data/network/packets";
import { IPlayerDat, Player, Posable } from "./player";
import { Projectile } from "./projectiles";
declare class Evt {
    eventName: string;
    constructor(eventName: string);
}
interface Cancelable {
    isCanceled: boolean;
}
declare abstract class PacketEvent extends Evt {
    packet: RawPacket;
    abstract type: C2SPacketType | S2CPacketType;
    payload: any[];
    constructor(packet: RawPacket);
}
/**
 * Event for receiving packets
 */
export declare class PacketReceiveEvent extends PacketEvent {
    type: S2CPacketType;
    constructor(pack: RawS2CPacket);
}
/**
 * Event for sending packets
 */
export declare class PacketSendEvent extends PacketEvent implements Cancelable {
    type: C2SPacketType;
    isCanceled: boolean;
    constructor(pack: RawC2SPacket);
}
/**
 * Base for the player events
 */
export declare class PlayerEvent extends Evt {
    player: Player;
    constructor(player: Player);
}
/**
 * Health event, used when a player's health changes
 */
export declare class HealthEvent extends Evt {
    sid: number;
    health: number;
    constructor(sid: number, health: number);
}
/**
 * Update player event, called every 110 ms to update the players within range
 */
export declare class UpdatePlayerEvent extends Evt {
    constructor();
}
declare class BuildingEvent extends Evt {
    building: GameObject;
    constructor(building: GameObject);
}
/**
 * Object add event called when building is placed.
 */
export declare class ObjectAddEvent extends BuildingEvent {
    constructor(building: GameObject);
}
/**
 * Object remove event called when a building should be removed by the game
 */
export declare class ObjectRemoveEvent extends BuildingEvent implements Posable {
    reason: ObjectRemoveReason;
    constructor(building: GameObject, reason: ObjectRemoveReason);
    getAsPos(): Pos;
}
/**
 * Chat event called when a player sends a chat message
 */
export declare class ChatEvent extends Evt {
    sid: number;
    message: string;
    constructor(sid: number, message: string);
}
export declare class DatalessEvent extends Evt {
    constructor();
}
export declare class ServerTickEvent extends Evt {
    playerData: IPlayerDat[];
    constructor(playerData: IPlayerDat[]);
}
export declare class ProjectileAddEvent extends Evt {
    projectile: Projectile;
    constructor(projectile: Projectile);
}
export declare class ProjectileRemoveEvent extends Evt {
    projectile: Projectile;
    constructor(projectile: Projectile);
}
/**
 * Interface of possible player events to be called
 */
export interface PlayerEvents {
    packetSend: PacketSendEvent;
    packetReceive: PacketReceiveEvent;
    health: HealthEvent;
    playerLeave: PlayerEvent;
    updatePlayer: IPlayerDat;
    addPlayer: PlayerEvent;
    addObject: ObjectAddEvent;
    removeObject: ObjectRemoveEvent;
    chat: ChatEvent;
    serverTick: ServerTickEvent;
    addProjectile: ProjectileAddEvent;
    removeProjectile: ProjectileRemoveEvent;
}
export declare class EventEmitter<Map> {
    private events;
    on<K extends keyof Map>(type: K, cb: (event: Map[K]) => any): void;
    once<K extends keyof Map>(type: K, cb: (event: Map[K]) => any): void;
    emit<K extends keyof Map>(type: K, arg: Map[K]): void;
    removeEvent<K extends keyof Map>(type: K): void;
}
export {};
