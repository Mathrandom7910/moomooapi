
import { EventEmitter, HealthEvent, PacketReceiveEvt, PacketSendEvt, PlayerEvents } from "./evt";
import { msgpack2, SkinColours } from "./misc";
import { C2SPacketType, RawPacket, S2CPacketType } from "./packets";
import { IPlayerDat, Player } from "./player";

interface WST {
  hiddenSend(data: ArrayBufferLike | string | Blob | ArrayBufferView): void;
}

export class MooMooAPI extends EventEmitter<PlayerEvents>{
  public static SkinColours = SkinColours;
  public static C2SPacketType = C2SPacketType;
  public static S2CPacketType = S2CPacketType;

  socket: WebSocket | null = null;
  player = new Player();
  players: Player[] | undefined[] = [];

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
      const payload = packEvt.payload;
      const type = packEvt.type;

      switch(type) {
        case S2CPacketType.health:
          this.emit("health", new HealthEvent(payload[0], payload[1]));
        break;

        case S2CPacketType.init:
          this.player.id = payload[0];
        break;

        case S2CPacketType.setSid:
          this.players[payload[0]] = this.player;
          this.player.sid = payload[0];
        break;

        case S2CPacketType.updatePlayers:
          for (let i = 0; i < payload[0].length; i += 13) {
            const plinf = payload[0].slice(i, i + 13);
            const thisPlayer: IPlayerDat = {
                sid: plinf[0],
                x: plinf[1],
                y: plinf[2],
                dir: plinf[3],
                obj: plinf[4],
                wep: plinf[5],
                variant: plinf[6],
                tribe: plinf[7],
                isLeader: plinf[8],
                hat: plinf[9],
                acc: plinf[10],
                isSkull: plinf[11],
                zIndex: plinf[12]
            }
            if(!this.players[thisPlayer.sid]) this.players[thisPlayer.sid] = new Player();
            this.players[thisPlayer.sid]?.assign(thisPlayer);

          }
        break;
      }
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

  sendBasic(t: C2SPacketType, ...payload: any) {
    this.sendRaw([t, payload]);
  }

  sendHidden(t: string, ...payload: any) {
    var sock = <WST> <unknown> this.socket;
    sock?.hiddenSend(msgpack2.encode([t, payload]));
  }

  spawn(name = "moomooapi", skin = SkinColours.brown, moreRes = true) {
    this.sendBasic(C2SPacketType.spawn, {name: name, skin: skin, moofoll: moreRes});
  }
}


Object.defineProperty(window, "MooMooAPI", {
  value: MooMooAPI
});