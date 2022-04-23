
import { EventEmitter, PacketReceiveEvt, PacketSendEvt, PlayerEvents } from "./evt";
import { msgpack2, SkinColours } from "./misc";
import { RawPacket } from "./types";

interface WST {
  hiddenSend(data: ArrayBufferLike | string | Blob | ArrayBufferView): void;
}

export class MooMooAPI extends EventEmitter<PlayerEvents>{
  public static SkinColours = SkinColours;

  socket: WebSocket | null = null;

  constructor() {
    super();

    var that = this;

    class WS extends WebSocket {
      hiddenSend(data: ArrayBufferLike | string | Blob | ArrayBufferView) {
        super.send(data)
      }
      constructor(url: string) {
        super(url);


    
        this.send = (m) => {
          const PackEv = new PacketSendEvt(msgpack2.decode(new Uint8Array(<ArrayBuffer> m)));
          if(that.onPacketSend(PackEv)) return;
          that.emit("packetSend", PackEv);
          this.hiddenSend(m);
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
      this.emit("packetReceive", packEvt);
      this.onPacketReceive(packEvt);
    });
  }

  /**
   * Called when before a packet is sent to the server
   * @param evt The packet event containing packet info
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

  sendHidden(t: string, ...payload: any) {
    var sock = <WST> <unknown> this.socket;
    sock?.hiddenSend(msgpack2.encode([t, payload]));
  }

  spawn(name = "moomooapi", skin = SkinColours.brown, moreRes = true) {
    this.sendBasic("sp", {name: name, skin: skin, moofoll: moreRes});
  }
}

Object.defineProperty(window, "MooMooAPI", MooMooAPI);