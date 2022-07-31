import { Pos } from "@mathrandom7910/pos";
class Evt {
    constructor(eventName) {
        this.eventName = eventName;
    }
}
class PacketEvent extends Evt {
    constructor(packet) {
        super("packet");
        this.packet = packet;
        this.payload = packet[1];
    }
}
/**
 * Event for receiving packets
 */
export class PacketReceiveEvent extends PacketEvent {
    constructor(pack) {
        super(pack);
        this.type = pack[0];
    }
}
/**
 * Event for sending packets
 */
export class PacketSendEvent extends PacketEvent {
    constructor(pack) {
        super(pack);
        this.isCanceled = false;
        this.type = pack[0];
    }
}
/**
 * Base for the player events
 */
export class PlayerEvent extends Evt {
    constructor(player) {
        super("player");
        this.player = player;
    }
}
/**
 * Health event, used when a player's health changes
 */
export class HealthEvent extends Evt {
    constructor(sid, health) {
        super("health");
        this.sid = sid;
        this.health = health;
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
    constructor(building) {
        super("build");
        this.building = building;
    }
}
/**
 * Object add event called when building is placed.
 */
export class ObjectAddEvent extends BuildingEvent {
    constructor(building) {
        super(building);
    }
}
/**
 * Object remove event called when a building should be removed by the game
 */
export class ObjectRemoveEvent extends BuildingEvent {
    constructor(building, reason) {
        super(building);
        this.reason = reason;
    }
    getAsPos() {
        return new Pos(this.building.x, this.building.y);
    }
}
/**
 * Chat event called when a player sends a chat message
 */
export class ChatEvent extends Evt {
    constructor(sid, message) {
        super("chat");
        this.sid = sid;
        this.message = message;
    }
}
export class DatalessEvent extends Evt {
    constructor() {
        super("dataless");
    }
}
export class ServerTickEvent extends Evt {
    constructor(playerData) {
        super("server_tick");
        this.playerData = playerData;
    }
}
export class ProjectileAddEvent extends Evt {
    constructor(projectile) {
        super("projectile_add");
        this.projectile = projectile;
    }
}
export class ProjectileRemoveEvent extends Evt {
    constructor(projectile) {
        super("projectile_remove");
        this.projectile = projectile;
    }
}
class Eventable {
    constructor(name, cb, once = false) {
        this.name = name;
        this.cb = cb;
        this.once = once;
    }
}
export class EventEmitter {
    constructor() {
        this.events = [];
    }
    on(type, cb) {
        this.events.push(new Eventable(type, cb));
    }
    once(type, cb) {
        this.events.push(new Eventable(type, cb, true));
    }
    emit(type, arg) {
        this.events.filter(evt => {
            if (evt.name != type)
                return true;
            evt.cb(arg);
            return !evt.once;
        });
    }
    removeEvent(type) {
        this.events.forEach(e => {
            if (e.name == type) {
                e.once = true;
            }
        });
    }
}
//# sourceMappingURL=events.js.map