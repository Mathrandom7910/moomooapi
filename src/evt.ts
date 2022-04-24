import { C2SPacketType, RawC2SPacket, RawPacket, RawS2CPacket, S2CPacketType } from "./packets";
import { IPlayerDat, Player } from "./player";

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

export class UpdatePlayersEvent extends Evt {
    constructor() {
        super("updateplayer");
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
    addPlayer: PlayerEvent
}

export class EventEmitter<Map> {
    private events: Eventable[] = [];

    on<K extends keyof Map>(type: K, cb: (event: Map[K]) => any) {
        this.events.push(new Eventable(type, cb));
    }

    once<K extends keyof Map>(type: K, cb: (event: Map[K]) => any) {
        this.events.push(new Eventable(type, cb, false));
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