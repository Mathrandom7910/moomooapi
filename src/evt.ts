import { C2SPacketType, RawC2SPacket, RawPacket, RawS2CPacket, S2CPacketType } from "./packets";

export class Evt {
    constructor() {

    }
}

export interface Cancelable {
    isCanceled: boolean;
}

abstract class PacketEvt extends Evt{
    abstract type: C2SPacketType | S2CPacketType;
    payload: any[];
    constructor(public packet: RawPacket) {
        super();
      //  this.type = packet[0];
        this.payload = packet[1];
    }
}

export class PacketReceiveEvt extends PacketEvt {
    type: S2CPacketType;
    constructor(pack: RawS2CPacket) {
        super(pack);
        this.type = pack[0];
    }
}

export class PacketSendEvt extends PacketEvt implements Cancelable {
    type: C2SPacketType;
    isCanceled = false;
    constructor(pack: RawC2SPacket) {
        super(pack);
        this.type = pack[0];
    }
}

export class HealthEvent extends Evt {
    constructor(public sid: number, public health: number) {
        super();
    }
}

class Eventable {
    constructor(public name: string | number | symbol, public cb: Function, public once = false) {
        
    }
}

export interface PlayerEvents {
    packetSend: PacketSendEvt,
    packetReceive: PacketReceiveEvt,
    health: HealthEvent
}

export class EventEmitter<Map> {
    private events: Eventable[] = [];

    on<K extends keyof Map>(type: K, cb: (event: Map[K]) => any) {
        this.events.push(new Eventable(type, cb));
    }

    once<K extends keyof Map>(type: K, cb: Function) {
        this.events.push(new Eventable(type, cb, false));
    }

    protected emit<K extends keyof Map>(type: K, ...args: any[]) {
        this.events.filter(evt => {
            if(evt.name != type) return true;
            evt.cb(...args);
            return !evt.once;
        });
    }

    rmv<K extends keyof Map>(type: K) {
        this.events.forEach(e => {
            if(e.name == type){
                e.once = true;
            }
        })
    }
}