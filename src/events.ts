import { Pos } from "@mathrandom7910/pos";
import { ObjectRemoveReason, IObject } from "./gameobject";
import { C2SPacketType, RawC2SPacket, RawPacket, RawS2CPacket, S2CPacketType } from "./packets";
import { IPlayerDat, Player, Posable } from "./player";
import { Projectile } from "./projectiles";

class Evt {
    constructor(public eventName: string) {
    }
}

interface Cancelable {
    isCanceled: boolean;
}

abstract class PacketEvent extends Evt{
    abstract type: C2SPacketType | S2CPacketType;
    payload: any[];
    constructor(public packet: RawPacket) {
        super("packet");
        this.payload = packet[1];
    }
}

/**
 * Event for receiving packets
 */

export class PacketReceiveEvent extends PacketEvent {
    type: S2CPacketType;
    constructor(pack: RawS2CPacket) {
        super(pack);
        this.type = pack[0];
    }
}

/**
 * Event for sending packets
 */

export class PacketSendEvent extends PacketEvent implements Cancelable {
    type: C2SPacketType;
    isCanceled = false;
    constructor(pack: RawC2SPacket) {
        super(pack);
        this.type = pack[0];
    }
}

/**
 * Base for the player events
 */

export class PlayerEvent extends Evt {
    constructor(public player: Player) {
        super("player");
    }
}

/**
 * Health event, used when a player's health changes
 */

export class HealthEvent extends Evt {
    constructor(public sid: number, public health: number) {
        super("health");
    }
}

/**
 * Update player event, called every 110 ms to update the players within range
 */

export class UpdatePlayerEvent extends Evt {
    constructor() {
        super("update_player");
    }
}

class BuildingEvent extends Evt {
    constructor(public building: IObject) {
        super("build");
    }
}

/**
 * Object add event called when building is placed.
 */

export class ObjectAddEvent extends BuildingEvent {
    constructor(building: IObject) {
        super(building);
    }
}

/**
 * Object remove event called when a building should be removed by the game
 */

export class ObjectRemoveEvent extends BuildingEvent implements Posable {
    constructor(building: IObject, public reason: ObjectRemoveReason) {
        super(building);
    }
    
    getAsPos(): Pos {
        return new Pos(this.building.x, this.building.y);
    }
}

/**
 * Chat event called when a player sends a chat message
 */

export class ChatEvent extends Evt {
    constructor(public sid: number, public message: string) {
        super("chat");
    }
}

export class DatalessEvent extends Evt {
    constructor() {
        super("dataless");
    }
}

export class ServerTickEvent extends Evt {
    constructor(public playerData: IPlayerDat[]) {
        super("server_tick")
    }
}

export class ProjectileAddEvent extends Evt {
    constructor(public projectile: Projectile) {
        super("projectile_add");
    }
}

export class ProjectileRemoveEvent extends Evt {
    constructor(public projectile: Projectile) {
        super("projectile_remove")
    }
}

class Eventable {
    constructor(public name: string | number | symbol, public cb: Function, public once = false) {
        
    }
}

/**
 * Interface of possible player events to be called
 */

export interface PlayerEvents {
    packetSend: PacketSendEvent,
    packetReceive: PacketReceiveEvent,
    health: HealthEvent,
    playerLeave: PlayerEvent,
    updatePlayer: IPlayerDat,
    addPlayer: PlayerEvent,
    addObject: ObjectAddEvent,
    removeObject: ObjectRemoveEvent,
    chat: ChatEvent,
    serverTick: ServerTickEvent,
    addProjectile: ProjectileAddEvent,
    removeProjectile: ProjectileRemoveEvent
}

export class EventEmitter<Map> {
    private events: Eventable[] = [];

    on<K extends keyof Map>(type: K, cb: (event: Map[K]) => any) {
        this.events.push(new Eventable(type, cb));
    }

    once<K extends keyof Map>(type: K, cb: (event: Map[K]) => any) {
        this.events.push(new Eventable(type, cb, true));
    }

    emit<K extends keyof Map>(type: K, arg: Map[K]) {
        this.events.filter(evt => {
            if(evt.name != type) return true;
            evt.cb(arg);
            return !evt.once;
        });
    }

    removeEvent<K extends keyof Map>(type: K) {
        this.events.forEach(e => {
            if(e.name == type){
                e.once = true;
            }
        });
    }
}