export class Evt {
    constructor() {

    }
}

export interface Cancelable {
    isCanceled: boolean;
}

class PacketEvt extends Evt{
    type: string;
    payload: any[];
    constructor(public packet: any[]) {
        super();
        this.type = packet[0];
        this.payload = packet[1];
    }
}

export class PacketReceiveEvt extends PacketEvt {
    constructor(pack: any[]) {
        super(pack);
    }
}

export class PacketSendEvt extends PacketEvt implements Cancelable {
    isCanceled = false;
    constructor(pack: any[]) {
        super(pack);
    }
}

class Eventable {
    constructor(public name: string | number | symbol, public cb: Function, public once = false) {
        
    }
}

export interface PlayerEvents {
    packetSend: PacketSendEvt,
    packetReceive: PacketReceiveEvt
}

export class EventEmitter<Map> {
    events: Eventable[] = [];

    on<K extends keyof Map>(type: K, cb: (event: Map[K]) => any) {
        this.events.push(new Eventable(type, cb));
    }

    once(type: string, cb: Function) {
        this.events.push(new Eventable(type, cb, false));
    }

    emit(type: string, ...args: any[]) {
        this.events.filter(evt => {
            if(evt.name != type) return true;
            evt.cb(...args);
            var t = <any> this;
            if(t["on" + type] instanceof Function) t["on" + type](...args);
            return !evt.once;
        });
    }
}