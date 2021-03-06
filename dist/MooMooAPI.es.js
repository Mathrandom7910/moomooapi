var src = {};
var mathplus = {};
Object.defineProperty(mathplus, "__esModule", { value: true });
mathplus.randInt = mathplus.randFloat = mathplus.averageAngle = mathplus.lerpPos = mathplus.lerp = mathplus.toDeg = mathplus.toRad = mathplus.calcVec = mathplus.getAngle = mathplus.getDistance = void 0;
const pos_1 = src;
const pi = Math.PI;
function getDistance(pos, pos1, x1, y1) {
  if (pos instanceof pos_1.PrimitivePos && pos1 instanceof pos_1.PrimitivePos) {
    return Math.hypot(pos.x - pos1.x, pos.y - pos1.y);
  } else if (typeof pos == "number" && typeof pos1 == "number" && x1 != void 0 && y1 != void 0) {
    return Math.hypot(pos - x1, pos1 - y1);
  } else {
    throw new Error(`Invalid arguments! ${pos} ${pos1} ${x1} ${y1}`);
  }
}
mathplus.getDistance = getDistance;
function getAngle(from, to, toX, toY) {
  if (from instanceof pos_1.PrimitivePos && to instanceof pos_1.PrimitivePos) {
    return Math.atan2(to.y - from.y, to.x - from.x);
  } else if (typeof from == "number" && typeof to == "number" && toX != void 0 && toY != void 0) {
    return Math.atan2(toY - to, toX - from);
  } else {
    throw new Error(`Invalid arguments! ${from} ${to} ${toX} ${toY}`);
  }
}
mathplus.getAngle = getAngle;
function calcVec(pos, dir, steps) {
  return pos.add(Math.cos(dir) * steps, Math.sin(dir) * steps);
}
mathplus.calcVec = calcVec;
function toRad(deg) {
  return pi * deg / 180;
}
mathplus.toRad = toRad;
function toDeg(rad) {
  return rad * (180 / pi);
}
mathplus.toDeg = toDeg;
function lerp(value, value1, amount) {
  return value + (value1 - value) * amount;
}
mathplus.lerp = lerp;
function lerpPos(pos, pos1, amount) {
  return new pos_1.Pos(lerp(pos.x, pos1.x, amount), lerp(pos.y, pos1.y, amount));
}
mathplus.lerpPos = lerpPos;
function averageAngle(angle, angle1) {
  return (360 + angle1 + ((angle - angle1 + 180 + 360) % 360 - 180) / 2) % 360;
}
mathplus.averageAngle = averageAngle;
function randFloat(min, max) {
  return Math.random() * (max - min) + min;
}
mathplus.randFloat = randFloat;
function randInt(min, max) {
  return Math.round(randFloat(min, max));
}
mathplus.randInt = randInt;
Object.defineProperty(src, "__esModule", { value: true });
var Pos_1 = src.Pos = src.PrimitivePos = void 0;
const mathplus_1 = mathplus;
class PrimitivePos {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  normalize() {
    return new Pos(this.x, this.y);
  }
}
src.PrimitivePos = PrimitivePos;
class Pos extends PrimitivePos {
  constructor(x = 0, y = 0) {
    super(x, y);
    this.x = x;
    this.y = y;
  }
  clone() {
    return new Pos(this.x, this.y);
  }
  addX(x) {
    const clone = this.clone();
    clone.x += x;
    return clone;
  }
  addY(y) {
    const clone = this.clone();
    clone.y += y;
    return clone;
  }
  add(x, y) {
    if (x instanceof Pos) {
      return this.addX(x.x).addY(x.y);
    } else {
      return this.addX(x).addY(y || 0);
    }
  }
  toString() {
    return `X: ${this.x} Y: ${this.y}`;
  }
  asPrimitive() {
    return new PrimitivePos(this.x, this.y);
  }
  set(pos) {
    this.x = pos.x;
    this.y = pos.y;
    return this;
  }
  dist(pos) {
    return (0, mathplus_1.getDistance)(this, pos);
  }
  dirTo(pos) {
    return (0, mathplus_1.getAngle)(this, pos);
  }
}
Pos_1 = src.Pos = Pos;
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
class PacketReceiveEvent extends PacketEvent {
  constructor(pack) {
    super(pack);
    this.type = pack[0];
  }
}
class PacketSendEvent extends PacketEvent {
  constructor(pack) {
    super(pack);
    this.isCanceled = false;
    this.type = pack[0];
  }
}
class PlayerEvent extends Evt {
  constructor(player) {
    super("player");
    this.player = player;
  }
}
class HealthEvent extends Evt {
  constructor(sid, health) {
    super("health");
    this.sid = sid;
    this.health = health;
  }
}
class BuildingEvent extends Evt {
  constructor(building) {
    super("build");
    this.building = building;
  }
}
class ObjectAddEvent extends BuildingEvent {
  constructor(building) {
    super(building);
  }
}
class ObjectRemoveEvent extends BuildingEvent {
  constructor(building, reason) {
    super(building);
    this.reason = reason;
  }
  getAsPos() {
    return new Pos_1(this.building.x, this.building.y);
  }
}
class ChatEvent extends Evt {
  constructor(sid, message) {
    super("chat");
    this.sid = sid;
    this.message = message;
  }
}
class ServerTickEvent extends Evt {
  constructor(playerData) {
    super("server_tick");
    this.playerData = playerData;
  }
}
class ProjectileAddEvent extends Evt {
  constructor(projectile) {
    super("projectile_add");
    this.projectile = projectile;
  }
}
class ProjectileRemoveEvent extends Evt {
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
class EventEmitter {
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
    this.events.filter((evt) => {
      if (evt.name != type)
        return true;
      evt.cb(arg);
      return !evt.once;
    });
  }
  removeEvent(type) {
    this.events.forEach((e) => {
      if (e.name == type) {
        e.once = true;
      }
    });
  }
}
var C2SPacketType = /* @__PURE__ */ ((C2SPacketType2) => {
  C2SPacketType2["SPAWN"] = "sp";
  C2SPacketType2["CHAT"] = "ch";
  C2SPacketType2["ATTACK"] = "c";
  C2SPacketType2["PING"] = "pp";
  C2SPacketType2["SET_ANGLE"] = "2";
  C2SPacketType2["SELECT_ITEM"] = "5";
  C2SPacketType2["UPGRADE"] = "6";
  C2SPacketType2["SET_ATTACK_STATE"] = "7";
  C2SPacketType2["CREATE_TRIBE"] = "8";
  C2SPacketType2["LEAVE_TRIBE"] = "9";
  C2SPacketType2["REQUEST_JOIN_TRIBE"] = "10";
  C2SPacketType2["ACCEPT_TRIBE_REQUEST"] = "11";
  C2SPacketType2["KICK_FROM_TRIBE"] = "12";
  C2SPacketType2["BUY_AND_EQUIP"] = "13c";
  C2SPacketType2["PING_MAP"] = "14";
  C2SPacketType2["MOVE"] = "33";
  return C2SPacketType2;
})(C2SPacketType || {});
var S2CPacketType = /* @__PURE__ */ ((S2CPacketType2) => {
  S2CPacketType2["ANNOUNCE"] = "ann";
  S2CPacketType2["INIT"] = "io-init";
  S2CPacketType2["INIT_TRIBES"] = "id";
  S2CPacketType2["SET_SID"] = "1";
  S2CPacketType2["KICK"] = "d";
  S2CPacketType2["ADD_PLAYER"] = "2";
  S2CPacketType2["UPDAE_PLAYERS"] = "33";
  S2CPacketType2["REMOVE_PLAYER"] = "4";
  S2CPacketType2["UPDATE_LEADER_BOARD"] = "5";
  S2CPacketType2["ADD_OBJECT"] = "6";
  S2CPacketType2["UPDATE_AIS"] = "a";
  S2CPacketType2["PLAYER_SWING"] = "7";
  S2CPacketType2["MOOSTAFA_SWING"] = "aa";
  S2CPacketType2["WIGGLE"] = "8";
  S2CPacketType2["SHOOT_TURRET"] = "sp";
  S2CPacketType2["UPDATE_MATS"] = "9";
  S2CPacketType2["HEALTH"] = "h";
  S2CPacketType2["DEATH"] = "11";
  S2CPacketType2["REMOVE_OBJECT"] = "12";
  S2CPacketType2["REMOVE_ALL_OBJECTS"] = "13";
  S2CPacketType2["SET_ITEM_COUNT"] = "14";
  S2CPacketType2["SET_AGE"] = "15";
  S2CPacketType2["LIST_UPGRADES"] = "16";
  S2CPacketType2["SET_ITEMS_BAR"] = "17";
  S2CPacketType2["ADD_PROJECTILE"] = "18";
  S2CPacketType2["REMOVE_PROJECTILE"] = "19";
  S2CPacketType2["SERVER_RESTART"] = "20";
  S2CPacketType2["ADD_TRIBE"] = "ac";
  S2CPacketType2["DELETE_TRIBE"] = "ad";
  S2CPacketType2["REQUEST_JOIN_TRIBE"] = "an";
  S2CPacketType2["SET_TRIBE"] = "st";
  S2CPacketType2["SET_TRIBE_MEMBERS"] = "sa";
  S2CPacketType2["MINIMAP_LOCATIONS"] = "mm";
  S2CPacketType2["CHAT"] = "ch";
  S2CPacketType2["UPDATE_SHOP"] = "us";
  S2CPacketType2["PING"] = "pp";
  S2CPacketType2["DAMAGE_TEST"] = "t";
  S2CPacketType2["PING_MAP"] = "p";
  return S2CPacketType2;
})(S2CPacketType || {});
var ItemIds = /* @__PURE__ */ ((ItemIds2) => {
  ItemIds2[ItemIds2["APPLE"] = 0] = "APPLE";
  ItemIds2[ItemIds2["COOKIE"] = 1] = "COOKIE";
  ItemIds2[ItemIds2["CHEESE"] = 2] = "CHEESE";
  ItemIds2[ItemIds2["WOOD_WALL"] = 3] = "WOOD_WALL";
  ItemIds2[ItemIds2["STONE_WALL"] = 4] = "STONE_WALL";
  ItemIds2[ItemIds2["CASTLE_WALL"] = 5] = "CASTLE_WALL";
  ItemIds2[ItemIds2["SPIKE"] = 6] = "SPIKE";
  ItemIds2[ItemIds2["GREATER_SPIKE"] = 7] = "GREATER_SPIKE";
  ItemIds2[ItemIds2["POISON_SPIKE"] = 8] = "POISON_SPIKE";
  ItemIds2[ItemIds2["SPINNING_SPIKE"] = 9] = "SPINNING_SPIKE";
  ItemIds2[ItemIds2["WINDMILL"] = 10] = "WINDMILL";
  ItemIds2[ItemIds2["FASTER_WINDMILL"] = 11] = "FASTER_WINDMILL";
  ItemIds2[ItemIds2["POWER_MILL"] = 12] = "POWER_MILL";
  ItemIds2[ItemIds2["MINE"] = 13] = "MINE";
  ItemIds2[ItemIds2["SAPPLING"] = 14] = "SAPPLING";
  ItemIds2[ItemIds2["PIT_TRAP"] = 15] = "PIT_TRAP";
  ItemIds2[ItemIds2["BOOST_PAD"] = 16] = "BOOST_PAD";
  ItemIds2[ItemIds2["TURRET"] = 17] = "TURRET";
  ItemIds2[ItemIds2["PLATFORM"] = 18] = "PLATFORM";
  ItemIds2[ItemIds2["HEALING_PAD"] = 19] = "HEALING_PAD";
  ItemIds2[ItemIds2["SPAWN_PAD"] = 20] = "SPAWN_PAD";
  ItemIds2[ItemIds2["BLOCKER"] = 21] = "BLOCKER";
  ItemIds2[ItemIds2["TELEPORTER"] = 22] = "TELEPORTER";
  return ItemIds2;
})(ItemIds || {});
var WeaponIds = /* @__PURE__ */ ((WeaponIds2) => {
  WeaponIds2[WeaponIds2["TOOL_HAMMER"] = 0] = "TOOL_HAMMER";
  WeaponIds2[WeaponIds2["HAND_AXE"] = 1] = "HAND_AXE";
  WeaponIds2[WeaponIds2["GREAT_AXE"] = 2] = "GREAT_AXE";
  WeaponIds2[WeaponIds2["SHORT_SWORD"] = 3] = "SHORT_SWORD";
  WeaponIds2[WeaponIds2["KATANA"] = 4] = "KATANA";
  WeaponIds2[WeaponIds2["POLE_ARM"] = 5] = "POLE_ARM";
  WeaponIds2[WeaponIds2["BAT"] = 6] = "BAT";
  WeaponIds2[WeaponIds2["DAGGERS"] = 7] = "DAGGERS";
  WeaponIds2[WeaponIds2["STICK"] = 8] = "STICK";
  WeaponIds2[WeaponIds2["HUNTING_BOW"] = 9] = "HUNTING_BOW";
  WeaponIds2[WeaponIds2["GREAT_HAMMER"] = 10] = "GREAT_HAMMER";
  WeaponIds2[WeaponIds2["WOODEN_SHIELD"] = 11] = "WOODEN_SHIELD";
  WeaponIds2[WeaponIds2["CROSSBOW"] = 12] = "CROSSBOW";
  WeaponIds2[WeaponIds2["REPEATER_CROSSBOW"] = 13] = "REPEATER_CROSSBOW";
  WeaponIds2[WeaponIds2["MC_GRABBY"] = 14] = "MC_GRABBY";
  WeaponIds2[WeaponIds2["MUSKET"] = 15] = "MUSKET";
  return WeaponIds2;
})(WeaponIds || {});
class Player extends Pos_1 {
  constructor() {
    super(...arguments);
    this.x = -2;
    this.y = -2;
    this.sid = -2;
    this.id = "NULL";
    this.dir = 0;
    this.currentObject = -2;
    this.wep = -2;
    this.variant = -2;
    this.tribe = "NULL";
    this.isLeader = false;
    this.hat = -2;
    this.acc = -2;
    this.isSkull = false;
    this.zIndex = -1;
    this.health = 100;
    this.name = "NULL";
    this.chatMessage = null;
    this.messageTimeout = -1;
  }
  assign(dat) {
    this.x = dat.x;
    this.y = dat.y;
    this.sid = dat.sid;
    this.dir = dat.dir;
    this.currentObject = dat.currentObject;
    this.wep = dat.wep;
    this.variant = dat.variant;
    this.tribe = dat.tribe;
    this.isLeader = dat.isLeader;
    this.hat = dat.hat;
    this.acc = dat.acc;
    this.isSkull = dat.isSkull;
    this.zIndex = dat.zIndex;
  }
  getAsPos() {
    return this;
  }
}
class SelfPlayer extends Player {
  constructor() {
    super(...arguments);
    this.weapons = [WeaponIds.TOOL_HAMMER, void 0];
    this.items = [ItemIds.APPLE, ItemIds.WOOD_WALL, ItemIds.SPIKE, ItemIds.WINDMILL, void 0, void 0, void 0, void 0];
  }
  getFoodType() {
    return this.items[0];
  }
  getWallType() {
    return this.items[1];
  }
  getSpikeType() {
    return this.items[2];
  }
  getMillType() {
    return this.items[3];
  }
  searchForId(id) {
    for (let i of this.items) {
      if (i == id)
        return i;
    }
    return null;
  }
  getSapplingType() {
    return this.searchForId(ItemIds.SAPPLING);
  }
  getMineType() {
    return this.searchForId(ItemIds.MINE);
  }
  getSpecialType() {
    return this.searchForId(ItemIds.TURRET) || this.searchForId(ItemIds.BLOCKER) || this.searchForId(ItemIds.HEALING_PAD) || this.searchForId(ItemIds.PLATFORM) || this.searchForId(ItemIds.TELEPORTER);
  }
  getPadType() {
    return this.items[4] || null;
  }
  getPrimaryType() {
    return this.weapons[0];
  }
  getSecondaryType() {
    return this.weapons[1];
  }
}
function serialize(data) {
  const pow32 = 4294967296;
  let floatBuffer, floatView;
  let array = new Uint8Array(128);
  let length = 0;
  append(data);
  return array.subarray(0, length);
  function append(data2) {
    switch (typeof data2) {
      case "undefined":
        appendNull();
        break;
      case "boolean":
        appendBoolean(data2);
        break;
      case "number":
        appendNumber(data2);
        break;
      case "string":
        appendString(data2);
        break;
      case "object":
        if (data2 === null) {
          appendNull();
        } else if (data2 instanceof Date) {
          appendDate(data2);
        } else if (Array.isArray(data2)) {
          appendArray(data2);
        } else if (data2 instanceof Uint8Array || data2 instanceof Uint8ClampedArray) {
          appendBinArray(data2);
        } else if (data2 instanceof Int8Array || data2 instanceof Int16Array || data2 instanceof Uint16Array || data2 instanceof Int32Array || data2 instanceof Uint32Array || data2 instanceof Float32Array || data2 instanceof Float64Array) {
          appendArray(data2);
        } else {
          appendObject(data2);
        }
        break;
    }
  }
  function appendNull(data2) {
    appendByte(192);
  }
  function appendBoolean(data2) {
    appendByte(data2 ? 195 : 194);
  }
  function appendNumber(data2) {
    if (isFinite(data2) && Math.floor(data2) === data2) {
      if (data2 >= 0 && data2 <= 127) {
        appendByte(data2);
      } else if (data2 < 0 && data2 >= -32) {
        appendByte(data2);
      } else if (data2 > 0 && data2 <= 255) {
        appendBytes([204, data2]);
      } else if (data2 >= -128 && data2 <= 127) {
        appendBytes([208, data2]);
      } else if (data2 > 0 && data2 <= 65535) {
        appendBytes([205, data2 >>> 8, data2]);
      } else if (data2 >= -32768 && data2 <= 32767) {
        appendBytes([209, data2 >>> 8, data2]);
      } else if (data2 > 0 && data2 <= 4294967295) {
        appendBytes([206, data2 >>> 24, data2 >>> 16, data2 >>> 8, data2]);
      } else if (data2 >= -2147483648 && data2 <= 2147483647) {
        appendBytes([210, data2 >>> 24, data2 >>> 16, data2 >>> 8, data2]);
      } else if (data2 > 0 && data2 <= 18446744073709552e3) {
        let hi = data2 / pow32;
        let lo = data2 % pow32;
        appendBytes([211, hi >>> 24, hi >>> 16, hi >>> 8, hi, lo >>> 24, lo >>> 16, lo >>> 8, lo]);
      } else if (data2 >= -9223372036854776e3 && data2 <= 9223372036854776e3) {
        appendByte(211);
        appendInt64(data2);
      } else if (data2 < 0) {
        appendBytes([211, 128, 0, 0, 0, 0, 0, 0, 0]);
      } else {
        appendBytes([207, 255, 255, 255, 255, 255, 255, 255, 255]);
      }
    } else {
      if (!floatView) {
        floatBuffer = new ArrayBuffer(8);
        floatView = new DataView(floatBuffer);
      }
      floatView.setFloat64(0, data2);
      appendByte(203);
      appendBytes(new Uint8Array(floatBuffer));
    }
  }
  function appendString(data2) {
    let bytes = encodeUtf8(data2);
    let length2 = bytes.length;
    if (length2 <= 31) {
      appendByte(160 + length2);
    } else if (length2 <= 255) {
      appendBytes([217, length2]);
    } else if (length2 <= 65535) {
      appendBytes([218, length2 >>> 8, length2]);
    } else {
      appendBytes([219, length2 >>> 24, length2 >>> 16, length2 >>> 8, length2]);
    }
    appendBytes(bytes);
  }
  function appendArray(data2) {
    let length2 = data2.length;
    if (length2 <= 15) {
      appendByte(144 + length2);
    } else if (length2 <= 65535) {
      appendBytes([220, length2 >>> 8, length2]);
    } else {
      appendBytes([221, length2 >>> 24, length2 >>> 16, length2 >>> 8, length2]);
    }
    for (let index = 0; index < length2; index++) {
      append(data2[index]);
    }
  }
  function appendBinArray(data2) {
    let length2 = data2.length;
    if (length2 <= 15) {
      appendBytes([196, length2]);
    } else if (length2 <= 65535) {
      appendBytes([197, length2 >>> 8, length2]);
    } else {
      appendBytes([198, length2 >>> 24, length2 >>> 16, length2 >>> 8, length2]);
    }
    appendBytes(data2);
  }
  function appendObject(data2) {
    let length2 = 0;
    for (let key in data2)
      length2++;
    if (length2 <= 15) {
      appendByte(128 + length2);
    } else if (length2 <= 65535) {
      appendBytes([222, length2 >>> 8, length2]);
    } else {
      appendBytes([223, length2 >>> 24, length2 >>> 16, length2 >>> 8, length2]);
    }
    for (let key in data2) {
      append(key);
      append(data2[key]);
    }
  }
  function appendDate(data2) {
    let sec = data2.getTime() / 1e3;
    if (data2.getMilliseconds() === 0 && sec >= 0 && sec < 4294967296) {
      appendBytes([214, 255, sec >>> 24, sec >>> 16, sec >>> 8, sec]);
    } else if (sec >= 0 && sec < 17179869184) {
      let ns = data2.getMilliseconds() * 1e6;
      appendBytes([215, 255, ns >>> 22, ns >>> 14, ns >>> 6, ns << 2 >>> 0 | sec / pow32, sec >>> 24, sec >>> 16, sec >>> 8, sec]);
    } else {
      let ns = data2.getMilliseconds() * 1e6;
      appendBytes([199, 12, 255, ns >>> 24, ns >>> 16, ns >>> 8, ns]);
      appendInt64(sec);
    }
  }
  function appendByte(byte) {
    if (array.length < length + 1) {
      let newLength = array.length * 2;
      while (newLength < length + 1)
        newLength *= 2;
      let newArray = new Uint8Array(newLength);
      newArray.set(array);
      array = newArray;
    }
    array[length] = byte;
    length++;
  }
  function appendBytes(bytes) {
    if (array.length < length + bytes.length) {
      let newLength = array.length * 2;
      while (newLength < length + bytes.length)
        newLength *= 2;
      let newArray = new Uint8Array(newLength);
      newArray.set(array);
      array = newArray;
    }
    array.set(bytes, length);
    length += bytes.length;
  }
  function appendInt64(value) {
    let hi, lo;
    if (value >= 0) {
      hi = value / pow32;
      lo = value % pow32;
    } else {
      value++;
      hi = Math.abs(value) / pow32;
      lo = Math.abs(value) % pow32;
      hi = ~hi;
      lo = ~lo;
    }
    appendBytes([hi >>> 24, hi >>> 16, hi >>> 8, hi, lo >>> 24, lo >>> 16, lo >>> 8, lo]);
  }
}
function deserialize(array) {
  const pow32 = 4294967296;
  let pos = 0;
  if (array instanceof ArrayBuffer) {
    array = new Uint8Array(array);
  }
  if (typeof array !== "object" || typeof array.length === "undefined") {
    throw new Error("Invalid argument type: Expected a byte array (Array or Uint8Array) to deserialize.");
  }
  if (!array.length) {
    throw new Error("Invalid argument: The byte array to deserialize is empty.");
  }
  if (!(array instanceof Uint8Array)) {
    array = new Uint8Array(array);
  }
  let data = read();
  if (pos < array.length)
    ;
  return data;
  function read() {
    const byte = array[pos++];
    if (byte >= 0 && byte <= 127)
      return byte;
    if (byte >= 128 && byte <= 143)
      return readMap(byte - 128);
    if (byte >= 144 && byte <= 159)
      return readArray(byte - 144);
    if (byte >= 160 && byte <= 191)
      return readStr(byte - 160);
    if (byte === 192)
      return null;
    if (byte === 193)
      throw new Error("Invalid byte code 0xc1 found.");
    if (byte === 194)
      return false;
    if (byte === 195)
      return true;
    if (byte === 196)
      return readBin(-1, 1);
    if (byte === 197)
      return readBin(-1, 2);
    if (byte === 198)
      return readBin(-1, 4);
    if (byte === 199)
      return readExt(-1, 1);
    if (byte === 200)
      return readExt(-1, 2);
    if (byte === 201)
      return readExt(-1, 4);
    if (byte === 202)
      return readFloat(4);
    if (byte === 203)
      return readFloat(8);
    if (byte === 204)
      return readUInt(1);
    if (byte === 205)
      return readUInt(2);
    if (byte === 206)
      return readUInt(4);
    if (byte === 207)
      return readUInt(8);
    if (byte === 208)
      return readInt(1);
    if (byte === 209)
      return readInt(2);
    if (byte === 210)
      return readInt(4);
    if (byte === 211)
      return readInt(8);
    if (byte === 212)
      return readExt(1);
    if (byte === 213)
      return readExt(2);
    if (byte === 214)
      return readExt(4);
    if (byte === 215)
      return readExt(8);
    if (byte === 216)
      return readExt(16);
    if (byte === 217)
      return readStr(-1, 1);
    if (byte === 218)
      return readStr(-1, 2);
    if (byte === 219)
      return readStr(-1, 4);
    if (byte === 220)
      return readArray(-1, 2);
    if (byte === 221)
      return readArray(-1, 4);
    if (byte === 222)
      return readMap(-1, 2);
    if (byte === 223)
      return readMap(-1, 4);
    if (byte >= 224 && byte <= 255)
      return byte - 256;
    console.debug("msgpack array:", array);
    throw new Error("Invalid byte value '" + byte + "' at index " + (pos - 1) + " in the MessagePack binary data (length " + array.length + "): Expecting a range of 0 to 255. This is not a byte array.");
  }
  function readInt(size) {
    let value = 0;
    let first = true;
    while (size-- > 0) {
      if (first) {
        let byte = array[pos++];
        value += byte & 127;
        if (byte & 128) {
          value -= 128;
        }
        first = false;
      } else {
        value *= 256;
        value += array[pos++];
      }
    }
    return value;
  }
  function readUInt(size) {
    let value = 0;
    while (size-- > 0) {
      value *= 256;
      value += array[pos++];
    }
    return value;
  }
  function readFloat(size) {
    let view = new DataView(array.buffer, pos, size);
    pos += size;
    if (size === 4) {
      return view.getFloat32(0, false);
    }
    if (size === 8) {
      return view.getFloat64(0, false);
    }
  }
  function readBin(size, lengthSize) {
    if (size < 0)
      size = readUInt(lengthSize);
    let data2 = array.subarray(pos, pos + size);
    pos += size;
    return data2;
  }
  function readMap(size, lengthSize) {
    if (size < 0)
      size = readUInt(lengthSize);
    let data2 = {};
    while (size-- > 0) {
      let key = read();
      data2[key] = read();
    }
    return data2;
  }
  function readArray(size, lengthSize) {
    if (size < 0)
      size = readUInt(lengthSize);
    let data2 = [];
    while (size-- > 0) {
      data2.push(read());
    }
    return data2;
  }
  function readStr(size, lengthSize) {
    if (size < 0)
      size = readUInt(lengthSize);
    let start = pos;
    pos += size;
    return decodeUtf8(array, start, size);
  }
  function readExt(size, lengthSize) {
    if (size < 0)
      size = readUInt(lengthSize);
    let type = readUInt(1);
    let data2 = readBin(size);
    switch (type) {
      case 255:
        return readExtDate(data2);
    }
    return { type, data: data2 };
  }
  function readExtDate(data2) {
    if (data2.length === 4) {
      let sec = (data2[0] << 24 >>> 0) + (data2[1] << 16 >>> 0) + (data2[2] << 8 >>> 0) + data2[3];
      return new Date(sec * 1e3);
    }
    if (data2.length === 8) {
      let ns = (data2[0] << 22 >>> 0) + (data2[1] << 14 >>> 0) + (data2[2] << 6 >>> 0) + (data2[3] >>> 2);
      let sec = (data2[3] & 3) * pow32 + (data2[4] << 24 >>> 0) + (data2[5] << 16 >>> 0) + (data2[6] << 8 >>> 0) + data2[7];
      return new Date(sec * 1e3 + ns / 1e6);
    }
    if (data2.length === 12) {
      let ns = (data2[0] << 24 >>> 0) + (data2[1] << 16 >>> 0) + (data2[2] << 8 >>> 0) + data2[3];
      pos -= 8;
      let sec = readInt(8);
      return new Date(sec * 1e3 + ns / 1e6);
    }
    throw new Error("Invalid data length for a date value.");
  }
}
function encodeUtf8(str) {
  let ascii = true, length = str.length;
  for (let x = 0; x < length; x++) {
    if (str.charCodeAt(x) > 127) {
      ascii = false;
      break;
    }
  }
  let i = 0, bytes = new Uint8Array(str.length * (ascii ? 1 : 4));
  for (let ci = 0; ci !== length; ci++) {
    let c = str.charCodeAt(ci);
    if (c < 128) {
      bytes[i++] = c;
      continue;
    }
    if (c < 2048) {
      bytes[i++] = c >> 6 | 192;
    } else {
      if (c > 55295 && c < 56320) {
        if (++ci >= length)
          throw new Error("UTF-8 encode: incomplete surrogate pair");
        let c2 = str.charCodeAt(ci);
        if (c2 < 56320 || c2 > 57343)
          throw new Error("UTF-8 encode: second surrogate character 0x" + c2.toString(16) + " at index " + ci + " out of range");
        c = 65536 + ((c & 1023) << 10) + (c2 & 1023);
        bytes[i++] = c >> 18 | 240;
        bytes[i++] = c >> 12 & 63 | 128;
      } else
        bytes[i++] = c >> 12 | 224;
      bytes[i++] = c >> 6 & 63 | 128;
    }
    bytes[i++] = c & 63 | 128;
  }
  return ascii ? bytes : bytes.subarray(0, i);
}
function decodeUtf8(bytes, start, length) {
  let i = start, str = "";
  length += start;
  while (i < length) {
    let c = bytes[i++];
    if (c > 127) {
      if (c > 191 && c < 224) {
        if (i >= length)
          throw new Error("UTF-8 decode: incomplete 2-byte sequence");
        c = (c & 31) << 6 | bytes[i++] & 63;
      } else if (c > 223 && c < 240) {
        if (i + 1 >= length)
          throw new Error("UTF-8 decode: incomplete 3-byte sequence");
        c = (c & 15) << 12 | (bytes[i++] & 63) << 6 | bytes[i++] & 63;
      } else if (c > 239 && c < 248) {
        if (i + 2 >= length)
          throw new Error("UTF-8 decode: incomplete 4-byte sequence");
        c = (c & 7) << 18 | (bytes[i++] & 63) << 12 | (bytes[i++] & 63) << 6 | bytes[i++] & 63;
      } else
        throw new Error("UTF-8 decode: unknown multibyte start 0x" + c.toString(16) + " at index " + (i - 1));
    }
    if (c <= 65535)
      str += String.fromCharCode(c);
    else if (c <= 1114111) {
      c -= 65536;
      str += String.fromCharCode(c >> 10 | 55296);
      str += String.fromCharCode(c & 1023 | 56320);
    } else
      throw new Error("UTF-8 decode: code point 0x" + c.toString(16) + " exceeds UTF-16 reach");
  }
  return str;
}
const msgpack = {
  encode: serialize,
  decode: deserialize
};
var msgpack$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  msgpack
}, Symbol.toStringTag, { value: "Module" }));
var SkinColours = /* @__PURE__ */ ((SkinColours2) => {
  SkinColours2[SkinColours2["BROWN"] = 0] = "BROWN";
  SkinColours2[SkinColours2["BEIGE"] = 1] = "BEIGE";
  SkinColours2[SkinColours2["DARKBROWN"] = 2] = "DARKBROWN";
  SkinColours2[SkinColours2["PEACH"] = 3] = "PEACH";
  SkinColours2[SkinColours2["WHITE"] = 4] = "WHITE";
  SkinColours2[SkinColours2["RED"] = 5] = "RED";
  SkinColours2[SkinColours2["BLACK"] = 6] = "BLACK";
  SkinColours2[SkinColours2["PINK"] = 7] = "PINK";
  SkinColours2[SkinColours2["BLUE"] = 8] = "BLUE";
  SkinColours2[SkinColours2["GREEN"] = 9] = "GREEN";
  SkinColours2["SECRETLIGHTBLUE"] = "length";
  return SkinColours2;
})(SkinColours || {});
class Repeater {
  constructor(cb, msInterval, code) {
    this.cb = cb;
    this.msInterval = msInterval;
    this.code = code;
    this.intervalId = null;
  }
  start(code) {
    if (this.code != code || this.intervalId != null)
      return;
    this.intervalId = setInterval(this.cb, this.msInterval);
  }
  stop(keyCode) {
    if (this.code != keyCode || this.intervalId == null)
      return;
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}
class GameObject extends Pos_1 {
  constructor(id, x, y, dir, scale, type, buildType, ownerSid) {
    super(x, y);
    this.id = id;
    this.dir = dir;
    this.scale = scale;
    this.type = type;
    this.buildType = buildType;
    this.ownerSid = ownerSid;
  }
  getAsPos() {
    return this;
  }
}
var ObjectRemoveReason = /* @__PURE__ */ ((ObjectRemoveReason2) => {
  ObjectRemoveReason2[ObjectRemoveReason2["PLAYERLEAVE"] = 0] = "PLAYERLEAVE";
  ObjectRemoveReason2[ObjectRemoveReason2["BUILDINGBREAK"] = 1] = "BUILDINGBREAK";
  return ObjectRemoveReason2;
})(ObjectRemoveReason || {});
var HatIds = /* @__PURE__ */ ((HatIds2) => {
  HatIds2[HatIds2["SHAME"] = 45] = "SHAME";
  HatIds2[HatIds2["MOO_CAP"] = 51] = "MOO_CAP";
  HatIds2[HatIds2["APPLE_CAP"] = 50] = "APPLE_CAP";
  HatIds2[HatIds2["MOO_HEAD"] = 28] = "MOO_HEAD";
  HatIds2[HatIds2["PIG_HEAD"] = 29] = "PIG_HEAD";
  HatIds2[HatIds2["FLUFF_HEAD"] = 30] = "FLUFF_HEAD";
  HatIds2[HatIds2["PANDOU_HEAD"] = 36] = "PANDOU_HEAD";
  HatIds2[HatIds2["BEAR_HEAD"] = 37] = "BEAR_HEAD";
  HatIds2[HatIds2["MONKEY_HEAD"] = 38] = "MONKEY_HEAD";
  HatIds2[HatIds2["POLAR_HEAD"] = 44] = "POLAR_HEAD";
  HatIds2[HatIds2["FEZ_HAT"] = 35] = "FEZ_HAT";
  HatIds2[HatIds2["ENIGMA_HAT"] = 42] = "ENIGMA_HAT";
  HatIds2[HatIds2["BLITZ_HAT"] = 43] = "BLITZ_HAT";
  HatIds2[HatIds2["BOB_XIII_HAT"] = 49] = "BOB_XIII_HAT";
  HatIds2[HatIds2["PUMPKIN"] = 57] = "PUMPKIN";
  HatIds2[HatIds2["BUMMLE_HAT"] = 8] = "BUMMLE_HAT";
  HatIds2[HatIds2["STRAW_HAT"] = 2] = "STRAW_HAT";
  HatIds2[HatIds2["WINTER_CAP"] = 15] = "WINTER_CAP";
  HatIds2[HatIds2["COWBOY_HAT"] = 5] = "COWBOY_HAT";
  HatIds2[HatIds2["RANGER_HAT"] = 4] = "RANGER_HAT";
  HatIds2[HatIds2["EXPLORER_HAT"] = 18] = "EXPLORER_HAT";
  HatIds2[HatIds2["FLIPPER_HAT"] = 31] = "FLIPPER_HAT";
  HatIds2[HatIds2["MARKSMAN_CAP"] = 1] = "MARKSMAN_CAP";
  HatIds2[HatIds2["BUSH_GEAR"] = 10] = "BUSH_GEAR";
  HatIds2[HatIds2["HALO"] = 48] = "HALO";
  HatIds2[HatIds2["SOLDIER_HELMET"] = 6] = "SOLDIER_HELMET";
  HatIds2[HatIds2["ANTI_VENOM_GEAR"] = 23] = "ANTI_VENOM_GEAR";
  HatIds2[HatIds2["MEDIC_GEAR"] = 13] = "MEDIC_GEAR";
  HatIds2[HatIds2["MINERS_HELMET"] = 9] = "MINERS_HELMET";
  HatIds2[HatIds2["MUSKETEER_HAT"] = 32] = "MUSKETEER_HAT";
  HatIds2[HatIds2["BULL_HELMET"] = 7] = "BULL_HELMET";
  HatIds2[HatIds2["EMP_HELMET"] = 22] = "EMP_HELMET";
  HatIds2[HatIds2["BOOSTER_HAT"] = 12] = "BOOSTER_HAT";
  HatIds2[HatIds2["BARBARIAN_ARMOR"] = 26] = "BARBARIAN_ARMOR";
  HatIds2[HatIds2["PLAGUE_MASK"] = 21] = "PLAGUE_MASK";
  HatIds2[HatIds2["BULL_MASK"] = 46] = "BULL_MASK";
  HatIds2[HatIds2["WINDMILL_HAT"] = 14] = "WINDMILL_HAT";
  HatIds2[HatIds2["SPIKE_GEAR"] = 11] = "SPIKE_GEAR";
  HatIds2[HatIds2["TURRET_GEAR"] = 53] = "TURRET_GEAR";
  HatIds2[HatIds2["SAMURAI_ARMOR"] = 20] = "SAMURAI_ARMOR";
  HatIds2[HatIds2["DARK_KNIGHT"] = 58] = "DARK_KNIGHT";
  HatIds2[HatIds2["SCAVENGER_GEAR"] = 27] = "SCAVENGER_GEAR";
  HatIds2[HatIds2["TANK_GEAR"] = 40] = "TANK_GEAR";
  HatIds2[HatIds2["THIEF_GEAR"] = 40] = "THIEF_GEAR";
  HatIds2[HatIds2["BLOODTHIRSTER"] = 55] = "BLOODTHIRSTER";
  HatIds2[HatIds2["Assassin_GEAR"] = 56] = "Assassin_GEAR";
  return HatIds2;
})(HatIds || {});
const hats = [{
  id: 45,
  name: "Shame!",
  dontSell: true,
  price: 0,
  scale: 120,
  desc: "hacks are for losers"
}, {
  id: 51,
  name: "Moo Cap",
  price: 0,
  scale: 120,
  desc: "coolest mooer around"
}, {
  id: 50,
  name: "Apple Cap",
  price: 0,
  scale: 120,
  desc: "apple farms remembers"
}, {
  id: 28,
  name: "Moo Head",
  price: 0,
  scale: 120,
  desc: "no effect"
}, {
  id: 29,
  name: "Pig Head",
  price: 0,
  scale: 120,
  desc: "no effect"
}, {
  id: 30,
  name: "Fluff Head",
  price: 0,
  scale: 120,
  desc: "no effect"
}, {
  id: 36,
  name: "Pandou Head",
  price: 0,
  scale: 120,
  desc: "no effect"
}, {
  id: 37,
  name: "Bear Head",
  price: 0,
  scale: 120,
  desc: "no effect"
}, {
  id: 38,
  name: "Monkey Head",
  price: 0,
  scale: 120,
  desc: "no effect"
}, {
  id: 44,
  name: "Polar Head",
  price: 0,
  scale: 120,
  desc: "no effect"
}, {
  id: 35,
  name: "Fez Hat",
  price: 0,
  scale: 120,
  desc: "no effect"
}, {
  id: 42,
  name: "Enigma Hat",
  price: 0,
  scale: 120,
  desc: "join the enigma army"
}, {
  id: 43,
  name: "Blitz Hat",
  price: 0,
  scale: 120,
  desc: "hey everybody i'm blitz"
}, {
  id: 49,
  name: "Bob XIII Hat",
  price: 0,
  scale: 120,
  desc: "like and subscribe"
}, {
  id: 57,
  name: "Pumpkin",
  price: 50,
  scale: 120,
  desc: "Spooooky"
}, {
  id: 8,
  name: "Bummle Hat",
  price: 100,
  scale: 120,
  desc: "no effect"
}, {
  id: 2,
  name: "Straw Hat",
  price: 500,
  scale: 120,
  desc: "no effect"
}, {
  id: 15,
  name: "Winter Cap",
  price: 600,
  scale: 120,
  desc: "allows you to move at normal speed in snow",
  coldM: 1
}, {
  id: 5,
  name: "Cowboy Hat",
  price: 1e3,
  scale: 120,
  desc: "no effect"
}, {
  id: 4,
  name: "Ranger Hat",
  price: 2e3,
  scale: 120,
  desc: "no effect"
}, {
  id: 18,
  name: "Explorer Hat",
  price: 2e3,
  scale: 120,
  desc: "no effect"
}, {
  id: 31,
  name: "Flipper Hat",
  price: 2500,
  scale: 120,
  desc: "have more control while in water",
  watrImm: true
}, {
  id: 1,
  name: "Marksman Cap",
  price: 3e3,
  scale: 120,
  desc: "increases arrow speed and range",
  aMlt: 1.3
}, {
  id: 10,
  name: "Bush Gear",
  price: 3e3,
  scale: 160,
  desc: "allows you to disguise yourself as a bush"
}, {
  id: 48,
  name: "Halo",
  price: 3e3,
  scale: 120,
  desc: "no effect"
}, {
  id: 6,
  name: "Soldier Helmet",
  price: 4e3,
  scale: 120,
  desc: "reduces damage taken but slows movement",
  spdMult: 0.94,
  dmgMult: 0.75
}, {
  id: 23,
  name: "Anti Venom Gear",
  price: 4e3,
  scale: 120,
  desc: "makes you immune to poison",
  poisonRes: 1
}, {
  id: 13,
  name: "Medic Gear",
  price: 5e3,
  scale: 110,
  desc: "slowly regenerates health over time",
  healthRegen: 3
}, {
  id: 9,
  name: "Miners Helmet",
  price: 5e3,
  scale: 120,
  desc: "earn 1 extra gold per resource",
  extraGold: 1
}, {
  id: 32,
  name: "Musketeer Hat",
  price: 5e3,
  scale: 120,
  desc: "reduces cost of projectiles",
  projCost: 0.5
}, {
  id: 7,
  name: "Bull Helmet",
  price: 6e3,
  scale: 120,
  desc: "increases damage done but drains health",
  healthRegen: -5,
  dmgMultO: 1.5,
  spdMult: 0.96
}, {
  id: 22,
  name: "Emp Helmet",
  price: 6e3,
  scale: 120,
  desc: "turrets won't attack but you move slower",
  antiTurret: 1,
  spdMult: 0.7
}, {
  id: 12,
  name: "Booster Hat",
  price: 6e3,
  scale: 120,
  desc: "increases your movement speed",
  spdMult: 1.16
}, {
  id: 26,
  name: "Barbarian Armor",
  price: 8e3,
  scale: 120,
  desc: "knocks back enemies that attack you",
  dmgK: 0.6
}, {
  id: 21,
  name: "Plague Mask",
  price: 1e4,
  scale: 120,
  desc: "melee attacks deal poison damage",
  poisonDmg: 5,
  poisonTime: 6
}, {
  id: 46,
  name: "Bull Mask",
  price: 1e4,
  scale: 120,
  desc: "bulls won't target you unless you attack them",
  bullRepel: 1
}, {
  id: 14,
  name: "Windmill Hat",
  topSprite: true,
  price: 1e4,
  scale: 120,
  desc: "generates points while worn",
  pps: 1.5
}, {
  id: 11,
  name: "Spike Gear",
  topSprite: true,
  price: 1e4,
  scale: 120,
  desc: "deal damage to players that damage you",
  dmg: 0.45
}, {
  id: 53,
  name: "Turret Gear",
  topSprite: true,
  price: 1e4,
  scale: 120,
  desc: "you become a walking turret",
  turret: {
    proj: 1,
    range: 700,
    rate: 2500
  },
  spdMult: 0.7
}, {
  id: 20,
  name: "Samurai Armor",
  price: 12e3,
  scale: 120,
  desc: "increased attack speed and fire rate",
  atkSpd: 0.78
}, {
  id: 58,
  name: "Dark Knight",
  price: 12e3,
  scale: 120,
  desc: "restores health when you deal damage",
  healD: 0.4
}, {
  id: 27,
  name: "Scavenger Gear",
  price: 15e3,
  scale: 120,
  desc: "earn double points for each kill",
  kScrM: 2
}, {
  id: 40,
  name: "Tank Gear",
  price: 15e3,
  scale: 120,
  desc: "increased damage to buildings but slower movement",
  spdMult: 0.3,
  bDmg: 3.3
}, {
  id: 52,
  name: "Thief Gear",
  price: 15e3,
  scale: 120,
  desc: "steal half of a players gold when you kill them",
  goldSteal: 0.5
}, {
  id: 55,
  name: "Bloodthirster",
  price: 2e4,
  scale: 120,
  desc: "Restore Health when dealing damage. And increased damage",
  healD: 0.25,
  dmgMultO: 1.2
}, {
  id: 56,
  name: "Assassin Gear",
  price: 2e4,
  scale: 120,
  desc: "Go invisible when not moving. Can't eat. Increased speed",
  noEat: true,
  spdMult: 1.1,
  invisTimer: 1e3
}];
var AccessoryIds = /* @__PURE__ */ ((AccessoryIds2) => {
  AccessoryIds2[AccessoryIds2["SNOWBALL"] = 12] = "SNOWBALL";
  AccessoryIds2[AccessoryIds2["TREE_CAPE"] = 9] = "TREE_CAPE";
  AccessoryIds2[AccessoryIds2["STONE_CAPE"] = 10] = "STONE_CAPE";
  AccessoryIds2[AccessoryIds2["COOKIE_CAPE"] = 3] = "COOKIE_CAPE";
  AccessoryIds2[AccessoryIds2["COW_CAPE"] = 8] = "COW_CAPE";
  AccessoryIds2[AccessoryIds2["MONKEY_TAIL"] = 11] = "MONKEY_TAIL";
  AccessoryIds2[AccessoryIds2["APPLE_BASKET"] = 17] = "APPLE_BASKET";
  AccessoryIds2[AccessoryIds2["WINTER_CAPE"] = 6] = "WINTER_CAPE";
  AccessoryIds2[AccessoryIds2["SKULL_CAPE"] = 4] = "SKULL_CAPE";
  AccessoryIds2[AccessoryIds2["DASH_CAPE"] = 5] = "DASH_CAPE";
  AccessoryIds2[AccessoryIds2["DRAGON_CAPE"] = 2] = "DRAGON_CAPE";
  AccessoryIds2[AccessoryIds2["SUPER_CAPE"] = 1] = "SUPER_CAPE";
  AccessoryIds2[AccessoryIds2["TROLL_CAPE"] = 7] = "TROLL_CAPE";
  AccessoryIds2[AccessoryIds2["THORNS"] = 14] = "THORNS";
  AccessoryIds2[AccessoryIds2["BLOCKADES"] = 15] = "BLOCKADES";
  AccessoryIds2[AccessoryIds2["DEVILS_TAIL"] = 20] = "DEVILS_TAIL";
  AccessoryIds2[AccessoryIds2["SAWBLADE"] = 16] = "SAWBLADE";
  AccessoryIds2[AccessoryIds2["ANGEL_WINGS"] = 13] = "ANGEL_WINGS";
  AccessoryIds2[AccessoryIds2["SHADOW_WINGS"] = 19] = "SHADOW_WINGS";
  AccessoryIds2[AccessoryIds2["BLOOD_WINGS"] = 18] = "BLOOD_WINGS";
  AccessoryIds2[AccessoryIds2["CORRUPT_X_WINGS"] = 21] = "CORRUPT_X_WINGS";
  return AccessoryIds2;
})(AccessoryIds || {});
const accessories = [{
  id: 12,
  name: "Snowball",
  price: 1e3,
  scale: 105,
  xOff: 18,
  desc: "no effect"
}, {
  id: 9,
  name: "Tree Cape",
  price: 1e3,
  scale: 90,
  desc: "no effect"
}, {
  id: 10,
  name: "Stone Cape",
  price: 1e3,
  scale: 90,
  desc: "no effect"
}, {
  id: 3,
  name: "Cookie Cape",
  price: 1500,
  scale: 90,
  desc: "no effect"
}, {
  id: 8,
  name: "Cow Cape",
  price: 2e3,
  scale: 90,
  desc: "no effect"
}, {
  id: 11,
  name: "Monkey Tail",
  price: 2e3,
  scale: 97,
  xOff: 25,
  desc: "Super speed but reduced damage",
  spdMult: 1.35,
  dmgMultO: 0.2
}, {
  id: 17,
  name: "Apple Basket",
  price: 3e3,
  scale: 80,
  xOff: 12,
  desc: "slowly regenerates health over time",
  healthRegen: 1
}, {
  id: 6,
  name: "Winter Cape",
  price: 3e3,
  scale: 90,
  desc: "no effect"
}, {
  id: 4,
  name: "Skull Cape",
  price: 4e3,
  scale: 90,
  desc: "no effect"
}, {
  id: 5,
  name: "Dash Cape",
  price: 5e3,
  scale: 90,
  desc: "no effect"
}, {
  id: 2,
  name: "Dragon Cape",
  price: 6e3,
  scale: 90,
  desc: "no effect"
}, {
  id: 1,
  name: "Super Cape",
  price: 8e3,
  scale: 90,
  desc: "no effect"
}, {
  id: 7,
  name: "Troll Cape",
  price: 8e3,
  scale: 90,
  desc: "no effect"
}, {
  id: 14,
  name: "Thorns",
  price: 1e4,
  scale: 115,
  xOff: 20,
  desc: "no effect"
}, {
  id: 15,
  name: "Blockades",
  price: 1e4,
  scale: 95,
  xOff: 15,
  desc: "no effect"
}, {
  id: 20,
  name: "Devils Tail",
  price: 1e4,
  scale: 95,
  xOff: 20,
  desc: "no effect"
}, {
  id: 16,
  name: "Sawblade",
  price: 12e3,
  scale: 90,
  spin: true,
  xOff: 0,
  desc: "deal damage to players that damage you",
  dmg: 0.15
}, {
  id: 13,
  name: "Angel Wings",
  price: 15e3,
  scale: 138,
  xOff: 22,
  desc: "slowly regenerates health over time",
  healthRegen: 3
}, {
  id: 19,
  name: "Shadow Wings",
  price: 15e3,
  scale: 138,
  xOff: 22,
  desc: "increased movement speed",
  spdMult: 1.1
}, {
  id: 18,
  name: "Blood Wings",
  price: 2e4,
  scale: 178,
  xOff: 26,
  desc: "restores health when you deal damage",
  healD: 0.2
}, {
  id: 21,
  name: "Corrupt X Wings",
  price: 2e4,
  scale: 178,
  xOff: 26,
  desc: "deal damage to players that damage you",
  dmg: 0.25
}];
class Projectile {
  constructor(x, y, dir, range, speed, projectileType, layer, sid) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.range = range;
    this.speed = speed;
    this.projectileType = projectileType;
    this.layer = layer;
    this.sid = sid;
  }
  getAsPos() {
    return new Pos_1(this.x, this.y);
  }
}
var mLoc = msgpack$1;
const msgpack2 = mLoc.msgpack;
var lastTime = Date.now();
class MooMooAPI extends EventEmitter {
  constructor(dynws = false) {
    super();
    this.socket = null;
    this.player = new SelfPlayer();
    this.players = [];
    this.gameObjects = [];
    this.alive = false;
    this.hatsOwned = {};
    this.accessoriesOwned = {};
    this.projectiles = [];
    this.isAutoAtk = false;
    const that = this;
    if (dynws) {
      Object.defineProperty(WebSocket.prototype, "hiddenSend", {
        value: WebSocket.prototype.send
      });
      Object.defineProperty(WebSocket.prototype, "send", {
        value: function(m) {
          if (that.socket == null)
            that.socket = this;
          const packEv = new PacketSendEvent(msgpack2.decode(new Uint8Array(m)));
          that.emit("packetSend", packEv);
          if (packEv.isCanceled)
            return;
          if (packEv.type == C2SPacketType.SPAWN)
            that.alive = true;
          const t = this;
          t.hiddenSend(m);
        }
      });
    } else {
      class WS extends WebSocket {
        hiddenSend(data) {
          super.send(data);
        }
        constructor(url) {
          super(url);
          this.send = (m) => {
            const packEv = new PacketSendEvent(msgpack2.decode(new Uint8Array(m)));
            that.emit("packetSend", packEv);
            if (packEv.isCanceled) {
              return;
            } else if (packEv.type == C2SPacketType.SPAWN) {
              that.alive = true;
            } else if (packEv.type == C2SPacketType.SET_ATTACK_STATE) {
              if (packEv.payload[0]) {
                that.isAutoAtk = !that.isAutoAtk;
              }
            }
            this.hiddenSend(m);
          };
          that.socket = this;
          that.initSocket();
        }
      }
      Object.defineProperty(window, "WebSocket", {
        value: WS
      });
    }
    hats.forEach((hat) => {
      if (hat.price <= 0 && !hat.dontSell) {
        this.hatsOwned[hat.id] = true;
      }
    });
    accessories.forEach((acc) => {
      if (acc.price <= 0) {
        this.accessoriesOwned[acc.id] = true;
      }
    });
  }
  initSocket() {
    var _a;
    (_a = this.socket) == null ? void 0 : _a.addEventListener("message", (m) => {
      const packEvt = new PacketReceiveEvent(msgpack2.decode(new Uint8Array(m.data)));
      this.emit("packetReceive", packEvt);
      const payload = packEvt.payload;
      const type = packEvt.type;
      switch (type) {
        case S2CPacketType.HEALTH:
          const sid = payload[0];
          this.emit("health", new HealthEvent(sid, payload[1]));
          this.players[sid].health = payload[1];
          break;
        case S2CPacketType.INIT:
          this.player.id = payload[0];
          break;
        case S2CPacketType.SET_SID:
          this.players[payload[0]] = this.player;
          this.player.sid = payload[0];
          break;
        case S2CPacketType.UPDAE_PLAYERS:
          var players = [];
          const timeNow = Date.now();
          for (const projectile2 of this.projectiles) {
            projectile2.range -= (timeNow - lastTime) * projectile2.speed;
            if (projectile2.range <= 0) {
              this.removeProjectile(projectile2.sid);
            }
          }
          for (let i = 0; i < payload[0].length; i += 13) {
            const plinf = payload[0].slice(i, i + 13);
            const thisPlayer = {
              sid: plinf[0],
              x: plinf[1],
              y: plinf[2],
              dir: plinf[3],
              currentObject: plinf[4],
              wep: plinf[5],
              variant: plinf[6],
              tribe: plinf[7],
              isLeader: plinf[8],
              hat: plinf[9],
              acc: plinf[10],
              isSkull: plinf[11],
              zIndex: plinf[12]
            };
            if (!this.players[thisPlayer.sid]) {
              console.warn("Ran into unpredicted circumstance current player cannot be found, IPlayerDat, this.players, IPlayerDat.sid", thisPlayer, this.players, thisPlayer.sid);
              this.players[thisPlayer.sid] = new Player();
            }
            this.emit("updatePlayer", thisPlayer);
            this.players[thisPlayer.sid].assign(thisPlayer);
            players.push(thisPlayer);
          }
          this.emit("serverTick", new ServerTickEvent(players));
          break;
        case S2CPacketType.REMOVE_PLAYER:
          const player = this.getPlayerById(payload[0]);
          if (player) {
            this.emit("playerLeave", new PlayerEvent(player));
            delete this.players[player.sid];
          }
          break;
        case S2CPacketType.ADD_PLAYER:
          const dataPayload = payload[0];
          const aSid = dataPayload[1];
          var aPlayer = this.player;
          if (aSid != this.player.sid)
            aPlayer = new Player();
          aPlayer.sid = aSid;
          aPlayer.id = dataPayload[0];
          aPlayer.name = dataPayload[2];
          aPlayer.x = dataPayload[3];
          aPlayer.y = dataPayload[4];
          this.players[aSid] = aPlayer;
          this.emit("addPlayer", new PlayerEvent(aPlayer));
          break;
        case S2CPacketType.ADD_OBJECT:
          for (let i = 0; i < payload[0].length; i += 8) {
            const binf = payload[0].slice(i, i + 8);
            const thisBuild = new GameObject(binf[0], binf[1], binf[2], binf[3], binf[4], binf[5], binf[6], binf[7]);
            this.gameObjects[thisBuild.id] = thisBuild;
            this.emit("addObject", new ObjectAddEvent(thisBuild));
          }
          break;
        case S2CPacketType.REMOVE_OBJECT:
          this.emit("removeObject", new ObjectRemoveEvent(this.gameObjects[payload[0]], ObjectRemoveReason.BUILDINGBREAK));
          delete this.gameObjects[payload[0]];
          break;
        case S2CPacketType.REMOVE_ALL_OBJECTS:
          for (let i in this.gameObjects) {
            const ind = this.gameObjects[i];
            if (ind.ownerSid == payload[0]) {
              this.emit("removeObject", new ObjectRemoveEvent(this.gameObjects[i], ObjectRemoveReason.PLAYERLEAVE));
              delete this.gameObjects[i];
            }
          }
          break;
        case S2CPacketType.SET_ITEMS_BAR:
          if (payload[0]) {
            if (payload[1]) {
              this.player.weapons = payload[0];
            } else {
              this.player.items = payload[0];
            }
          }
          break;
        case S2CPacketType.DEATH:
          this.isAutoAtk = false;
          this.player.weapons = [WeaponIds.TOOL_HAMMER, void 0];
          this.player.items = [ItemIds.APPLE, ItemIds.WOOD_WALL, ItemIds.SPIKE, ItemIds.WINDMILL, void 0, void 0, void 0, void 0];
          break;
        case S2CPacketType.CHAT:
          const sidMsg = payload[0];
          const playerMsg = this.getPlayerBySid(sidMsg);
          if (playerMsg == null) {
            return;
          }
          const msg = payload[1];
          clearTimeout(playerMsg.messageTimeout);
          playerMsg.chatMessage = msg;
          playerMsg.messageTimeout = setTimeout(() => {
            playerMsg.chatMessage = null;
          }, 3e3);
          this.emit("chat", new ChatEvent(sidMsg, msg));
          break;
        case S2CPacketType.UPDATE_SHOP:
          const isSetGear = payload[0];
          if (isSetGear)
            break;
          const isAcc = payload[2];
          const gearId = payload[1];
          if (isAcc) {
            this.accessoriesOwned[gearId] = true;
          } else {
            this.hatsOwned[gearId] = true;
          }
          break;
        case S2CPacketType.ADD_PROJECTILE:
          const projectile = new Projectile(payload[0], payload[1], payload[2], payload[3], payload[4], payload[5], payload[6], payload[7]);
          this.emit("addProjectile", new ProjectileAddEvent(projectile));
          this.projectiles.push(projectile);
          break;
        case S2CPacketType.REMOVE_PROJECTILE:
          this.removeProjectile(payload[0]);
          break;
      }
    });
  }
  getPlayerById(id) {
    for (let i of this.players) {
      if ((i == null ? void 0 : i.id) == id)
        return i;
    }
    return null;
  }
  getPlayerBySid(sid) {
    for (let i of this.players) {
      if ((i == null ? void 0 : i.sid) == sid)
        return i;
    }
    return null;
  }
  sendRaw(packet) {
    var _a;
    (_a = this.socket) == null ? void 0 : _a.send(msgpack2.encode(packet));
  }
  sendBasic(t, ...payload) {
    this.sendRaw([t, payload]);
  }
  sendHidden(t, ...payload) {
    var sock = this.socket;
    sock == null ? void 0 : sock.hiddenSend(msgpack2.encode([t, payload]));
  }
  spawn(sname = "moomooapi", sskin = SkinColours.RED, moreRes = true) {
    this.sendBasic(C2SPacketType.SPAWN, { name: sname, skin: sskin, moofoll: moreRes });
  }
  setHand(id, isWeapon) {
    this.sendBasic(C2SPacketType.SELECT_ITEM, id, isWeapon);
  }
  setItem(id) {
    this.setHand(id, false);
  }
  setWeapon(id) {
    this.setHand(id, true);
  }
  attack(on, direction = null) {
    this.sendBasic(C2SPacketType.ATTACK, on, direction);
  }
  singleSwing(direction = null) {
    this.attack(true, direction);
    this.attack(false);
  }
  placeItem(item, direction = null) {
    this.setItem(item);
    this.singleSwing(direction);
    this.setWeapon(this.player.wep);
  }
  toggleAutoAttack() {
    this.sendBasic(C2SPacketType.SET_ATTACK_STATE, 1);
  }
  setGear(buy, id, isAccessory) {
    this.sendBasic(C2SPacketType.BUY_AND_EQUIP, buy, id, isAccessory);
  }
  buyGear(id, isAccessory) {
    this.setGear(true, id, isAccessory);
  }
  buyHat(id) {
    this.buyGear(id, false);
  }
  equipGear(id, isAccessory) {
    this.setGear(false, id, isAccessory);
  }
  equipHat(id) {
    this.equipGear(id, false);
  }
  buyAccessory(id) {
    this.buyGear(id, true);
  }
  equipAccessory(id) {
    this.equipGear(id, true);
  }
  chat(text) {
    this.sendBasic(C2SPacketType.CHAT, text.substring(0, 30));
  }
  removeProjectile(projectileSid) {
    for (let i = 0; i < this.projectiles.length; i++) {
      if (this.projectiles[i].sid == projectileSid) {
        this.emit("removeProjectile", new ProjectileRemoveEvent(this.projectiles[i]));
        this.projectiles.splice(i, 1);
      }
    }
  }
  setDirection(dir) {
    this.sendBasic(C2SPacketType.SET_ANGLE, dir);
  }
  lookAt(pos) {
    this.setDirection(this.player.getAsPos().dirTo(pos));
  }
}
MooMooAPI.SkinColours = SkinColours;
MooMooAPI.C2SPacketType = C2SPacketType;
MooMooAPI.S2CPacketType = S2CPacketType;
MooMooAPI.ObjectRemoveReason = ObjectRemoveReason;
MooMooAPI.ItemIds = ItemIds;
MooMooAPI.WeaponIds = WeaponIds;
MooMooAPI.Repeater = Repeater;
MooMooAPI.msgpack = msgpack2;
MooMooAPI.HatIds = HatIds;
MooMooAPI.AccessoryIds = AccessoryIds;
Object.defineProperty(window, "MooMooAPI", {
  value: MooMooAPI
});
export { MooMooAPI, msgpack2 };
