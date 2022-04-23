var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Evt {
  constructor() {
  }
}
class PacketEvt extends Evt {
  constructor(packet) {
    super();
    __publicField(this, "type");
    __publicField(this, "payload");
    this.packet = packet;
    this.type = packet[0];
    this.payload = packet[1];
  }
}
class PacketReceiveEvt extends PacketEvt {
  constructor(pack) {
    super(pack);
  }
}
class PacketSendEvt extends PacketEvt {
  constructor(pack) {
    super(pack);
    __publicField(this, "isCanceled", false);
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
    this.events.push(new Eventable(type, cb, false));
  }
  emit(type, ...args) {
    this.events.filter((evt) => {
      if (evt.name != type)
        return true;
      evt.cb(...args);
      return !evt.once;
    });
  }
  rmv(type) {
    this.events.forEach((e) => {
      if (e.name == type) {
        e.once = true;
      }
    });
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
var mLoc = msgpack$1;
const msgpack2 = mLoc.msgpack;
var SkinColours = /* @__PURE__ */ ((SkinColours2) => {
  SkinColours2[SkinColours2["brown"] = 0] = "brown";
  SkinColours2[SkinColours2["beige"] = 1] = "beige";
  SkinColours2[SkinColours2["darkBrown"] = 2] = "darkBrown";
  SkinColours2[SkinColours2["peach"] = 3] = "peach";
  SkinColours2[SkinColours2["white"] = 4] = "white";
  SkinColours2[SkinColours2["red"] = 5] = "red";
  SkinColours2[SkinColours2["black"] = 6] = "black";
  SkinColours2[SkinColours2["pink"] = 7] = "pink";
  SkinColours2[SkinColours2["blue"] = 8] = "blue";
  SkinColours2[SkinColours2["green"] = 9] = "green";
  SkinColours2["secretLightBlue"] = "length";
  return SkinColours2;
})(SkinColours || {});
class MooMooAPI extends EventEmitter {
  constructor() {
    super();
    __publicField(this, "socket", null);
    var that = this;
    class WS extends WebSocket {
      hiddenSend(data) {
        super.send(data);
      }
      constructor(url) {
        super(url);
        this.send = (m) => {
          const PackEv = new PacketSendEvt(msgpack2.decode(new Uint8Array(m)));
          if (that.onPacketSend(PackEv))
            return;
          that.emit("packetSend", PackEv);
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
      const packEvt = new PacketReceiveEvt(msgpack2.decode(new Uint8Array(m.data)));
      this.emit("packetReceive", packEvt);
      this.onPacketReceive(packEvt);
    });
  }
  onPacketSend(evt) {
    return false;
  }
  onPacketReceive(evt) {
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
  spawn(name = "moomooapi", skin = SkinColours.brown, moreRes = true) {
    this.sendBasic("sp", { name, skin, moofoll: moreRes });
  }
}
__publicField(MooMooAPI, "SkinColours", SkinColours);
console.log(MooMooAPI);
Object.defineProperty(window, "MooMooAPI", {
  value: MooMooAPI
});
export { MooMooAPI };
