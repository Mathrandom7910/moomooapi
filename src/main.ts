
import { EventEmitter, PacketReceiveEvt, PacketSendEvt, PlayerEvents } from "./evt";
import { msgpack2, SkinColors } from "./misc";
import { RawPacket } from "./types";

export class MooMooAPI extends EventEmitter<PlayerEvents>{
  static SkinColors = SkinColors;

  socket: WebSocket | null = null;

  constructor() {
    super();

    var that = this;

    class WS extends WebSocket {
      constructor(url: string) {
        super(url);
    
        this.send = (m) => {
          const PackEv = new PacketSendEvt(msgpack2.decode(new Uint8Array(<ArrayBuffer> m)));
          if(that.onPacketSend(PackEv)) return;
          that.emit("packetSend", PackEv);
          super.send(m);
        }
        that.socket = this;
        that.initSocket();
      }
    }

    Object.defineProperty(window, "WebSocket", {
      value: WS
    });
    
  }

  initSocket() {
    this.socket?.addEventListener("message", (m) => {
      const packEvt = new PacketReceiveEvt(msgpack2.decode(new Uint8Array(m.data)));
      this.emit("packetReceive", packEvt)
      this.onPacketReceive(packEvt);
    });
  }

  /**
   * 
   * @param evt 
   * @returns boolean value if should cancel the event (true if it should cancel, and false otherwise)
   */

  onPacketSend(evt: PacketSendEvt): boolean {
    evt;
    return false;
  }

  onPacketReceive(evt: PacketReceiveEvt) {
    evt;
  }

  sendRaw(packet: RawPacket) {
    this.socket?.send(msgpack2.encode(packet));
  }

  sendBasic(t: string, ...payload: any) {
    this.sendRaw([t, payload]);
  }

  spawn(name = "moomooapi", skin = SkinColors.brown, moreRes = true) {
    this.sendBasic("sp", {name: name, skin: skin, moofoll: moreRes});
  }
}

Object.defineProperty(window, "MooMooAPI", MooMooAPI);