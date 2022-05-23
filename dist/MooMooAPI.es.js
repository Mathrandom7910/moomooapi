var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Evt {
  constructor(eventName) {
    this.eventName = eventName;
  }
}
class PacketEvent extends Evt {
  constructor(packet) {
    super("packet");
    __publicField(this, "payload");
    this.packet = packet;
    this.payload = packet[1];
  }
}
class PacketReceiveEvent extends PacketEvent {
  constructor(pack) {
    super(pack);
    __publicField(this, "type");
    this.type = pack[0];
  }
}
class PacketSendEvent extends PacketEvent {
  constructor(pack) {
    super(pack);
    __publicField(this, "type");
    __publicField(this, "isCanceled", false);
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
    __publicField(this, "events", []);
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
  C2SPacketType2["spawn"] = "sp";
  C2SPacketType2["chat"] = "ch";
  C2SPacketType2["attack"] = "c";
  C2SPacketType2["ping"] = "pp";
  C2SPacketType2["setAngle"] = "2";
  C2SPacketType2["selectItem"] = "5";
  C2SPacketType2["upgrade"] = "6";
  C2SPacketType2["autoAttack"] = "7";
  C2SPacketType2["createTribe"] = "8";
  C2SPacketType2["leaveTribe"] = "9";
  C2SPacketType2["requestJoinTribe"] = "10";
  C2SPacketType2["acceptTribeRequest"] = "11";
  C2SPacketType2["kickFromTribe"] = "12";
  C2SPacketType2["buyFromShop"] = "13c";
  C2SPacketType2["pingMap"] = "14";
  C2SPacketType2["move"] = "33";
  return C2SPacketType2;
})(C2SPacketType || {});
var S2CPacketType = /* @__PURE__ */ ((S2CPacketType2) => {
  S2CPacketType2["announce"] = "ann";
  S2CPacketType2["init"] = "io-init";
  S2CPacketType2["initTribe"] = "id";
  S2CPacketType2["setSid"] = "1";
  S2CPacketType2["kick"] = "d";
  S2CPacketType2["addPlayer"] = "2";
  S2CPacketType2["updatePlayers"] = "33";
  S2CPacketType2["removePlayer"] = "4";
  S2CPacketType2["updateLeaderBoard"] = "5";
  S2CPacketType2["addObject"] = "6";
  S2CPacketType2["updateAi"] = "a";
  S2CPacketType2["playerSwing"] = "7";
  S2CPacketType2["moostafaSwing"] = "aa";
  S2CPacketType2["wiggle"] = "8";
  S2CPacketType2["shootTurret"] = "sp";
  S2CPacketType2["updateMats"] = "9";
  S2CPacketType2["health"] = "h";
  S2CPacketType2["death"] = "11";
  S2CPacketType2["removeObject"] = "12";
  S2CPacketType2["removeAllObjects"] = "13";
  S2CPacketType2["setItemCount"] = "14";
  S2CPacketType2["setAge"] = "15";
  S2CPacketType2["listUpgrades"] = "16";
  S2CPacketType2["setItemsBar"] = "17";
  S2CPacketType2["addProjectile"] = "18";
  S2CPacketType2["removeProjectile"] = "19";
  S2CPacketType2["serverRestart"] = "20";
  S2CPacketType2["addTribe"] = "ac";
  S2CPacketType2["deleteTribe"] = "ad";
  S2CPacketType2["requestJoin"] = "an";
  S2CPacketType2["setTribe"] = "st";
  S2CPacketType2["setTribeMembers"] = "sa";
  S2CPacketType2["minimapLocation"] = "mm";
  S2CPacketType2["chat"] = "ch";
  S2CPacketType2["updateShop"] = "us";
  S2CPacketType2["ping"] = "pp";
  S2CPacketType2["dmgTest"] = "t";
  S2CPacketType2["pingMap"] = "p";
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
class Player {
  constructor() {
    __publicField(this, "x", -2);
    __publicField(this, "y", -2);
    __publicField(this, "sid", -2);
    __publicField(this, "id", "NULL");
    __publicField(this, "dir", 0);
    __publicField(this, "obj", -2);
    __publicField(this, "wep", -2);
    __publicField(this, "variant", -2);
    __publicField(this, "tribe", "NULL");
    __publicField(this, "isLeader", false);
    __publicField(this, "hat", -2);
    __publicField(this, "acc", -2);
    __publicField(this, "isSkull", false);
    __publicField(this, "zIndex", -1);
    __publicField(this, "health", 100);
    __publicField(this, "name", "NULL");
  }
  assign(dat) {
    console.log(dat);
    this.x = dat.x;
    this.y = dat.y;
    this.sid = dat.sid;
    this.dir = dat.dir;
    this.obj = dat.obj;
    this.wep = dat.wep;
    this.variant = dat.variant;
    this.tribe = dat.tribe;
    this.isLeader = dat.isLeader;
    this.hat = dat.hat;
    this.acc = dat.acc;
    this.isSkull = dat.isSkull;
    this.zIndex = dat.zIndex;
  }
}
class SelfPlayer extends Player {
  constructor() {
    super(...arguments);
    __publicField(this, "weapons", [WeaponIds.TOOL_HAMMER, void 0]);
    __publicField(this, "items", [ItemIds.APPLE, ItemIds.WOOD_WALL, ItemIds.SPIKE, ItemIds.WINDMILL, void 0, void 0, void 0, void 0]);
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
    return this.items[0];
  }
  getSecondaryType() {
    return this.items[1];
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
var ObjectRemoveReason = /* @__PURE__ */ ((ObjectRemoveReason2) => {
  ObjectRemoveReason2[ObjectRemoveReason2["PLAYERLEAVE"] = 0] = "PLAYERLEAVE";
  ObjectRemoveReason2[ObjectRemoveReason2["BUILDINGBREAK"] = 1] = "BUILDINGBREAK";
  return ObjectRemoveReason2;
})(ObjectRemoveReason || {});
var mLoc = msgpack$1;
const msgpack2 = mLoc.msgpack;
class MooMooAPI extends EventEmitter {
  constructor() {
    super();
    __publicField(this, "socket", null);
    __publicField(this, "player", new SelfPlayer());
    __publicField(this, "players", []);
    __publicField(this, "gameObjects", []);
    var that = this;
    class WS extends WebSocket {
      hiddenSend(data) {
        super.send(data);
      }
      constructor(url) {
        super(url);
        this.send = (m) => {
          const packEv = new PacketSendEvent(msgpack2.decode(new Uint8Array(m)));
          that.emit("packetSend", packEv);
          if (packEv.isCanceled)
            return;
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
  initSocket() {
    var _a;
    (_a = this.socket) == null ? void 0 : _a.addEventListener("message", (m) => {
      const packEvt = new PacketReceiveEvent(msgpack2.decode(new Uint8Array(m.data)));
      this.emit("packetReceive", packEvt);
      const payload = packEvt.payload;
      const type = packEvt.type;
      switch (type) {
        case S2CPacketType.health:
          const sid = payload[0];
          this.emit("health", new HealthEvent(sid, payload[1]));
          this.players[sid].health = payload[1];
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
            const thisPlayer = {
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
            };
            if (!this.players[thisPlayer.sid]) {
              console.warn("Ran into unpredicted circumstance current player cannot be found, IPlayerDat, this.players, IPlayerDat.sid", thisPlayer, this.players, thisPlayer.sid);
              this.players[thisPlayer.sid] = new Player();
            }
            this.emit("updatePlayer", thisPlayer);
            this.players[thisPlayer.sid].assign(thisPlayer);
          }
          break;
        case S2CPacketType.removePlayer:
          const player = this.getPlayerById(payload[0]);
          if (player) {
            this.emit("playerLeave", new PlayerEvent(player));
            delete this.players[player.sid];
          }
          break;
        case S2CPacketType.addPlayer:
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
        case S2CPacketType.addObject:
          for (let i = 0; i < payload[0].length; i += 8) {
            const binf = payload[0].slice(i, i + 8);
            const thisBuild = {
              id: binf[0],
              x: binf[1],
              y: binf[2],
              dir: binf[3],
              scale: binf[4],
              type: binf[5],
              buildType: binf[6],
              ownerSid: binf[7]
            };
            this.gameObjects[thisBuild.id] = thisBuild;
            this.emit("addObject", new ObjectAddEvent(thisBuild));
          }
          break;
        case S2CPacketType.removeObject:
          this.emit("removeObject", new ObjectRemoveEvent(this.gameObjects[payload[0]], ObjectRemoveReason.BUILDINGBREAK));
          delete this.gameObjects[payload[0]];
          break;
        case S2CPacketType.removeAllObjects:
          for (let i = 0; i < this.gameObjects.length; i++) {
            const ind = this.gameObjects[i];
            if (!ind)
              continue;
            if (ind.ownerSid == payload[0]) {
              this.emit("removeObject", new ObjectRemoveEvent(this.gameObjects[i], ObjectRemoveReason.PLAYERLEAVE));
              this.gameObjects.slice(i, 1);
            }
          }
          break;
        case S2CPacketType.setItemsBar:
          if (payload[0]) {
            if (payload[1]) {
              this.player.weapons = payload[0];
            } else {
              this.player.items = payload[0];
            }
          }
          break;
        case S2CPacketType.death:
          this.player.weapons = [WeaponIds.TOOL_HAMMER, void 0];
          this.player.items = [ItemIds.APPLE, ItemIds.WOOD_WALL, ItemIds.SPIKE, ItemIds.WINDMILL, void 0, void 0, void 0, void 0];
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
  spawn(name = "moomooapi", skin = SkinColours.RED, moreRes = true) {
    this.sendBasic(C2SPacketType.spawn, { name, skin, moofoll: moreRes });
  }
  setHand(id, isWeapon) {
    this.sendBasic(C2SPacketType.selectItem, id, isWeapon);
  }
  setItem(id) {
    this.setHand(id, false);
  }
  setWeapon(id) {
    this.setHand(id, true);
  }
  attack(on, direction = null) {
    this.sendBasic(C2SPacketType.attack, on, direction);
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
}
__publicField(MooMooAPI, "SkinColours", SkinColours);
__publicField(MooMooAPI, "C2SPacketType", C2SPacketType);
__publicField(MooMooAPI, "S2CPacketType", S2CPacketType);
__publicField(MooMooAPI, "ObjectRemoveReason", ObjectRemoveReason);
__publicField(MooMooAPI, "ItemIds", ItemIds);
__publicField(MooMooAPI, "WeaponIds", WeaponIds);
Object.defineProperty(window, "MooMooAPI", {
  value: MooMooAPI
});
export { MooMooAPI, msgpack2 };
