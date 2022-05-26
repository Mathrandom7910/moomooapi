(function (p, g) {
    typeof exports == "object" && typeof module != "undefined" ? g(exports) : typeof define == "function" && define.amd ? define(["exports"], g) : (p = typeof globalThis != "undefined" ? globalThis : p || self, g(p.MMAPI = {}))
})(this, function (p) {
    "use strict";
    class g {
        constructor(r) {
            this.eventName = r
        }
    }
    class S extends g {
        constructor(r) {
            super("packet");
            this.packet = r, this.payload = r[1]
        }
    }
    class K extends S {
        constructor(r) {
            super(r);
            this.type = r[0]
        }
    }
    class P extends S {
        constructor(r) {
            super(r);
            this.isCanceled = !1, this.type = r[0]
        }
    }
    class U extends g {
        constructor(r) {
            super("player");
            this.player = r
        }
    }
    class F extends g {
        constructor(r, n) {
            super("health");
            this.sid = r, this.health = n
        }
    }
    class m extends g {
        constructor(r) {
            super("build");
            this.building = r
        }
    }
    class j extends m {
        constructor(r) {
            super(r)
        }
    }
    class G extends m {
        constructor(r, n) {
            super(r);
            this.reason = n
        }
    }
    class I extends g {
        constructor(r, n) {
            super("chat");
            this.sid = r, this.message = n
        }
    }
    class H {
        constructor(r, n, h = !1) {
            this.name = r, this.cb = n, this.once = h
        }
    }
    class W {
        constructor() {
            this.events = []
        }
        on(r, n) {
            this.events.push(new H(r, n))
        }
        once(r, n) {
            this.events.push(new H(r, n, !0))
        }
        emit(r, n) {
            this.events.filter(h => h.name != r ? !0 : (h.cb(n), !h.once))
        }
        removeEvent(r) {
            this.events.forEach(n => {
                n.name == r && (n.once = !0)
            })
        }
    }
    var b = (e => (e.SPAWN = "sp", e.CHAT = "ch", e.ATTACK = "c", e.PING = "pp", e.SET_ANGLE = "2", e.SELECT_ITEM = "5", e.UPGRADE = "6", e.AUTO_ATTACK = "7", e.CREATE_TRIBE = "8", e.LEAVE_TRIBE = "9", e.REQUEST_JOIN_TRIBE = "10", e.ACCEPT_TRIBE_REQUEST = "11", e.KICK_FROM_TRIBE = "12", e.BUY_FROM_SHOP = "13c", e.PING_MAP = "14", e.MOVE = "33", e))(b || {}),
        d = (e => (e.ANNOUNCE = "ann", e.INIT = "io-init", e.INIT_TRIBES = "id", e.SET_SID = "1", e.KICK = "d", e.ADD_PLAYER = "2", e.UPDAE_PLAYERS = "33", e.REMOVE_PLAYER = "4", e.UPDATE_LEADER_BOARD = "5", e.ADD_OBJECT = "6", e.UPDATE_AIS = "a", e.PLAYER_SWING = "7", e.MOOSTAFA_SWING = "aa", e.WIGGLE = "8", e.SHOOT_TURRET = "sp", e.UPDATE_MATS = "9", e.HEALTH = "h", e.DEATH = "11", e.REMOVE_OBJECT = "12", e.REMOVE_ALL_OBJECTS = "13", e.SET_ITEM_COUNT = "14", e.SET_AGE = "15", e.LIST_UPGRADES = "16", e.SET_ITEMS_BAR = "17", e.ADD_PROJECTILE = "18", e.REMOVE_PROJECTILE = "19", e.SERVER_RESTART = "20", e.ADD_TRIBE = "ac", e.DELETE_TRIBE = "ad", e.REQUEST_JOIN_TRIBE = "an", e.SET_TRIBE = "st", e.SET_TRIBE_MEMBERS = "sa", e.MINIMAP_LOCATIONS = "mm", e.CHAT = "ch", e.UPDATE_SHOP = "us", e.PING = "pp", e.DAMAGE_TEST = "t", e.PING_MAP = "p", e))(d || {}),
        A = (e => (e[e.APPLE = 0] = "APPLE", e[e.COOKIE = 1] = "COOKIE", e[e.CHEESE = 2] = "CHEESE", e[e.WOOD_WALL = 3] = "WOOD_WALL", e[e.STONE_WALL = 4] = "STONE_WALL", e[e.CASTLE_WALL = 5] = "CASTLE_WALL", e[e.SPIKE = 6] = "SPIKE", e[e.GREATER_SPIKE = 7] = "GREATER_SPIKE", e[e.POISON_SPIKE = 8] = "POISON_SPIKE", e[e.SPINNING_SPIKE = 9] = "SPINNING_SPIKE", e[e.WINDMILL = 10] = "WINDMILL", e[e.FASTER_WINDMILL = 11] = "FASTER_WINDMILL", e[e.POWER_MILL = 12] = "POWER_MILL", e[e.MINE = 13] = "MINE", e[e.SAPPLING = 14] = "SAPPLING", e[e.PIT_TRAP = 15] = "PIT_TRAP", e[e.BOOST_PAD = 16] = "BOOST_PAD", e[e.TURRET = 17] = "TURRET", e[e.PLATFORM = 18] = "PLATFORM", e[e.HEALING_PAD = 19] = "HEALING_PAD", e[e.SPAWN_PAD = 20] = "SPAWN_PAD", e[e.BLOCKER = 21] = "BLOCKER", e[e.TELEPORTER = 22] = "TELEPORTER", e))(A || {}),
        B = (e => (e[e.TOOL_HAMMER = 0] = "TOOL_HAMMER", e[e.HAND_AXE = 1] = "HAND_AXE", e[e.GREAT_AXE = 2] = "GREAT_AXE", e[e.SHORT_SWORD = 3] = "SHORT_SWORD", e[e.KATANA = 4] = "KATANA", e[e.POLE_ARM = 5] = "POLE_ARM", e[e.BAT = 6] = "BAT", e[e.DAGGERS = 7] = "DAGGERS", e[e.STICK = 8] = "STICK", e[e.HUNTING_BOW = 9] = "HUNTING_BOW", e[e.GREAT_HAMMER = 10] = "GREAT_HAMMER", e[e.WOODEN_SHIELD = 11] = "WOODEN_SHIELD", e[e.CROSSBOW = 12] = "CROSSBOW", e[e.REPEATER_CROSSBOW = 13] = "REPEATER_CROSSBOW", e[e.MC_GRABBY = 14] = "MC_GRABBY", e[e.MUSKET = 15] = "MUSKET", e))(B || {});
    class y {
        constructor() {
            this.x = -2, this.y = -2, this.sid = -2, this.id = "NULL", this.dir = 0, this.obj = -2, this.wep = -2, this.variant = -2, this.tribe = "NULL", this.isLeader = !1, this.hat = -2, this.acc = -2, this.isSkull = !1, this.zIndex = -1, this.health = 100, this.name = "NULL", this.chatMessage = null, this.messageTimeout = -1
        }
        assign(r) {
            this.x = r.x, this.y = r.y, this.sid = r.sid, this.dir = r.dir, this.obj = r.obj, this.wep = r.wep, this.variant = r.variant, this.tribe = r.tribe, this.isLeader = r.isLeader, this.hat = r.hat, this.acc = r.acc, this.isSkull = r.isSkull, this.zIndex = r.zIndex
        }
    }
    class V extends y {
        constructor() {
            super(...arguments);
            this.weapons = [B.TOOL_HAMMER, void 0], this.items = [A.APPLE, A.WOOD_WALL, A.SPIKE, A.WINDMILL, void 0, void 0, void 0, void 0]
        }
        getFoodType() {
            return this.items[0]
        }
        getWallType() {
            return this.items[1]
        }
        getSpikeType() {
            return this.items[2]
        }
        getMillType() {
            return this.items[3]
        }
        searchForId(r) {
            for (let n of this.items)
                if (n == r) return n;
            return null
        }
        getSapplingType() {
            return this.searchForId(A.SAPPLING)
        }
        getMineType() {
            return this.searchForId(A.MINE)
        }
        getSpecialType() {
            return this.searchForId(A.TURRET) || this.searchForId(A.BLOCKER) || this.searchForId(A.HEALING_PAD) || this.searchForId(A.PLATFORM) || this.searchForId(A.TELEPORTER)
        }
        getPadType() {
            return this.items[4] || null
        }
        getPrimaryType() {
            return this.items[0]
        }
        getSecondaryType() {
            return this.items[1]
        }
    }

    function Y(e) {
        let n, h, l = new Uint8Array(128),
            o = 0;
        return u(e), l.subarray(0, o);

        function u(i) {
            switch (typeof i) {
                case "undefined":
                    x();
                    break;
                case "boolean":
                    _(i);
                    break;
                case "number":
                    R(i);
                    break;
                case "string":
                    w(i);
                    break;
                case "object":
                    i === null ? x() : i instanceof Date ? t(i) : Array.isArray(i) ? L(i) : i instanceof Uint8Array || i instanceof Uint8ClampedArray ? a(i) : i instanceof Int8Array || i instanceof Int16Array || i instanceof Uint16Array || i instanceof Int32Array || i instanceof Uint32Array || i instanceof Float32Array || i instanceof Float64Array ? L(i) : N(i);
                    break
            }
        }

        function x(i) {
            f(192)
        }

        function _(i) {
            f(i ? 195 : 194)
        }

        function R(i) {
            if (isFinite(i) && Math.floor(i) === i)
                if (i >= 0 && i <= 127) f(i);
                else if (i < 0 && i >= -32) f(i);
            else if (i > 0 && i <= 255) c([204, i]);
            else if (i >= -128 && i <= 127) c([208, i]);
            else if (i > 0 && i <= 65535) c([205, i >>> 8, i]);
            else if (i >= -32768 && i <= 32767) c([209, i >>> 8, i]);
            else if (i > 0 && i <= 4294967295) c([206, i >>> 24, i >>> 16, i >>> 8, i]);
            else if (i >= -2147483648 && i <= 2147483647) c([210, i >>> 24, i >>> 16, i >>> 8, i]);
            else if (i > 0 && i <= 18446744073709552e3) {
                let s = i / 4294967296,
                    E = i % 4294967296;
                c([211, s >>> 24, s >>> 16, s >>> 8, s, E >>> 24, E >>> 16, E >>> 8, E])
            } else i >= -9223372036854776e3 && i <= 9223372036854776e3 ? (f(211), T(i)) : i < 0 ? c([211, 128, 0, 0, 0, 0, 0, 0, 0]) : c([207, 255, 255, 255, 255, 255, 255, 255, 255]);
            else h || (n = new ArrayBuffer(8), h = new DataView(n)), h.setFloat64(0, i), f(203), c(new Uint8Array(n))
        }

        function w(i) {
            let s = X(i),
                E = s.length;
            E <= 31 ? f(160 + E) : E <= 255 ? c([217, E]) : E <= 65535 ? c([218, E >>> 8, E]) : c([219, E >>> 24, E >>> 16, E >>> 8, E]), c(s)
        }

        function L(i) {
            let s = i.length;
            s <= 15 ? f(144 + s) : s <= 65535 ? c([220, s >>> 8, s]) : c([221, s >>> 24, s >>> 16, s >>> 8, s]);
            for (let E = 0; E < s; E++) u(i[E])
        }

        function a(i) {
            let s = i.length;
            s <= 15 ? c([196, s]) : s <= 65535 ? c([197, s >>> 8, s]) : c([198, s >>> 24, s >>> 16, s >>> 8, s]), c(i)
        }

        function N(i) {
            let s = 0;
            for (let E in i) s++;
            s <= 15 ? f(128 + s) : s <= 65535 ? c([222, s >>> 8, s]) : c([223, s >>> 24, s >>> 16, s >>> 8, s]);
            for (let E in i) u(E), u(i[E])
        }

        function t(i) {
            let s = i.getTime() / 1e3;
            if (i.getMilliseconds() === 0 && s >= 0 && s < 4294967296) c([214, 255, s >>> 24, s >>> 16, s >>> 8, s]);
            else if (s >= 0 && s < 17179869184) {
                let E = i.getMilliseconds() * 1e6;
                c([215, 255, E >>> 22, E >>> 14, E >>> 6, E << 2 >>> 0 | s / 4294967296, s >>> 24, s >>> 16, s >>> 8, s])
            } else {
                let E = i.getMilliseconds() * 1e6;
                c([199, 12, 255, E >>> 24, E >>> 16, E >>> 8, E]), T(s)
            }
        }

        function f(i) {
            if (l.length < o + 1) {
                let s = l.length * 2;
                for (; s < o + 1;) s *= 2;
                let E = new Uint8Array(s);
                E.set(l), l = E
            }
            l[o] = i, o++
        }

        function c(i) {
            if (l.length < o + i.length) {
                let s = l.length * 2;
                for (; s < o + i.length;) s *= 2;
                let E = new Uint8Array(s);
                E.set(l), l = E
            }
            l.set(i, o), o += i.length
        }

        function T(i) {
            let s, E;
            i >= 0 ? (s = i / 4294967296, E = i % 4294967296) : (i++, s = Math.abs(i) / 4294967296, E = Math.abs(i) % 4294967296, s = ~s, E = ~E), c([s >>> 24, s >>> 16, s >>> 8, s, E >>> 24, E >>> 16, E >>> 8, E])
        }
    }

    function J(e) {
        let n = 0;
        if (e instanceof ArrayBuffer && (e = new Uint8Array(e)), typeof e != "object" || typeof e.length == "undefined") throw new Error("Invalid argument type: Expected a byte array (Array or Uint8Array) to deserialize.");
        if (!e.length) throw new Error("Invalid argument: The byte array to deserialize is empty.");
        e instanceof Uint8Array || (e = new Uint8Array(e));
        let h = l();
        return n < e.length, h;

        function l() {
            const t = e[n++];
            if (t >= 0 && t <= 127) return t;
            if (t >= 128 && t <= 143) return R(t - 128);
            if (t >= 144 && t <= 159) return w(t - 144);
            if (t >= 160 && t <= 191) return L(t - 160);
            if (t === 192) return null;
            if (t === 193) throw new Error("Invalid byte code 0xc1 found.");
            if (t === 194) return !1;
            if (t === 195) return !0;
            if (t === 196) return _(-1, 1);
            if (t === 197) return _(-1, 2);
            if (t === 198) return _(-1, 4);
            if (t === 199) return a(-1, 1);
            if (t === 200) return a(-1, 2);
            if (t === 201) return a(-1, 4);
            if (t === 202) return x(4);
            if (t === 203) return x(8);
            if (t === 204) return u(1);
            if (t === 205) return u(2);
            if (t === 206) return u(4);
            if (t === 207) return u(8);
            if (t === 208) return o(1);
            if (t === 209) return o(2);
            if (t === 210) return o(4);
            if (t === 211) return o(8);
            if (t === 212) return a(1);
            if (t === 213) return a(2);
            if (t === 214) return a(4);
            if (t === 215) return a(8);
            if (t === 216) return a(16);
            if (t === 217) return L(-1, 1);
            if (t === 218) return L(-1, 2);
            if (t === 219) return L(-1, 4);
            if (t === 220) return w(-1, 2);
            if (t === 221) return w(-1, 4);
            if (t === 222) return R(-1, 2);
            if (t === 223) return R(-1, 4);
            if (t >= 224 && t <= 255) return t - 256;
            throw console.debug("msgpack array:", e), new Error("Invalid byte value '" + t + "' at index " + (n - 1) + " in the MessagePack binary data (length " + e.length + "): Expecting a range of 0 to 255. This is not a byte array.")
        }

        function o(t) {
            let f = 0,
                c = !0;
            for (; t-- > 0;)
                if (c) {
                    let T = e[n++];
                    f += T & 127, T & 128 && (f -= 128), c = !1
                } else f *= 256, f += e[n++];
            return f
        }

        function u(t) {
            let f = 0;
            for (; t-- > 0;) f *= 256, f += e[n++];
            return f
        }

        function x(t) {
            let f = new DataView(e.buffer, n, t);
            if (n += t, t === 4) return f.getFloat32(0, !1);
            if (t === 8) return f.getFloat64(0, !1)
        }

        function _(t, f) {
            t < 0 && (t = u(f));
            let c = e.subarray(n, n + t);
            return n += t, c
        }

        function R(t, f) {
            t < 0 && (t = u(f));
            let c = {};
            for (; t-- > 0;) {
                let T = l();
                c[T] = l()
            }
            return c
        }

        function w(t, f) {
            t < 0 && (t = u(f));
            let c = [];
            for (; t-- > 0;) c.push(l());
            return c
        }

        function L(t, f) {
            t < 0 && (t = u(f));
            let c = n;
            return n += t, q(e, c, t)
        }

        function a(t, f) {
            t < 0 && (t = u(f));
            let c = u(1),
                T = _(t);
            switch (c) {
                case 255:
                    return N(T)
            }
            return {
                type: c,
                data: T
            }
        }

        function N(t) {
            if (t.length === 4) {
                let f = (t[0] << 24 >>> 0) + (t[1] << 16 >>> 0) + (t[2] << 8 >>> 0) + t[3];
                return new Date(f * 1e3)
            }
            if (t.length === 8) {
                let f = (t[0] << 22 >>> 0) + (t[1] << 14 >>> 0) + (t[2] << 6 >>> 0) + (t[3] >>> 2),
                    c = (t[3] & 3) * 4294967296 + (t[4] << 24 >>> 0) + (t[5] << 16 >>> 0) + (t[6] << 8 >>> 0) + t[7];
                return new Date(c * 1e3 + f / 1e6)
            }
            if (t.length === 12) {
                let f = (t[0] << 24 >>> 0) + (t[1] << 16 >>> 0) + (t[2] << 8 >>> 0) + t[3];
                n -= 8;
                let c = o(8);
                return new Date(c * 1e3 + f / 1e6)
            }
            throw new Error("Invalid data length for a date value.")
        }
    }

    function X(e) {
        let r = !0,
            n = e.length;
        for (let o = 0; o < n; o++)
            if (e.charCodeAt(o) > 127) {
                r = !1;
                break
            } let h = 0,
            l = new Uint8Array(e.length * (r ? 1 : 4));
        for (let o = 0; o !== n; o++) {
            let u = e.charCodeAt(o);
            if (u < 128) {
                l[h++] = u;
                continue
            }
            if (u < 2048) l[h++] = u >> 6 | 192;
            else {
                if (u > 55295 && u < 56320) {
                    if (++o >= n) throw new Error("UTF-8 encode: incomplete surrogate pair");
                    let x = e.charCodeAt(o);
                    if (x < 56320 || x > 57343) throw new Error("UTF-8 encode: second surrogate character 0x" + x.toString(16) + " at index " + o + " out of range");
                    u = 65536 + ((u & 1023) << 10) + (x & 1023), l[h++] = u >> 18 | 240, l[h++] = u >> 12 & 63 | 128
                } else l[h++] = u >> 12 | 224;
                l[h++] = u >> 6 & 63 | 128
            }
            l[h++] = u & 63 | 128
        }
        return r ? l : l.subarray(0, h)
    }

    function q(e, r, n) {
        let h = r,
            l = "";
        for (n += r; h < n;) {
            let o = e[h++];
            if (o > 127)
                if (o > 191 && o < 224) {
                    if (h >= n) throw new Error("UTF-8 decode: incomplete 2-byte sequence");
                    o = (o & 31) << 6 | e[h++] & 63
                } else if (o > 223 && o < 240) {
                if (h + 1 >= n) throw new Error("UTF-8 decode: incomplete 3-byte sequence");
                o = (o & 15) << 12 | (e[h++] & 63) << 6 | e[h++] & 63
            } else if (o > 239 && o < 248) {
                if (h + 2 >= n) throw new Error("UTF-8 decode: incomplete 4-byte sequence");
                o = (o & 7) << 18 | (e[h++] & 63) << 12 | (e[h++] & 63) << 6 | e[h++] & 63
            } else throw new Error("UTF-8 decode: unknown multibyte start 0x" + o.toString(16) + " at index " + (h - 1));
            if (o <= 65535) l += String.fromCharCode(o);
            else if (o <= 1114111) o -= 65536, l += String.fromCharCode(o >> 10 | 55296), l += String.fromCharCode(o & 1023 | 56320);
            else throw new Error("UTF-8 decode: code point 0x" + o.toString(16) + " exceeds UTF-16 reach")
        }
        return l
    }
    var Q = Object.freeze(Object.defineProperty({
            __proto__: null,
            msgpack: {
                encode: Y,
                decode: J
            }
        }, Symbol.toStringTag, {
            value: "Module"
        })),
        v = (e => (e[e.BROWN = 0] = "BROWN", e[e.BEIGE = 1] = "BEIGE", e[e.DARKBROWN = 2] = "DARKBROWN", e[e.PEACH = 3] = "PEACH", e[e.WHITE = 4] = "WHITE", e[e.RED = 5] = "RED", e[e.BLACK = 6] = "BLACK", e[e.PINK = 7] = "PINK", e[e.BLUE = 8] = "BLUE", e[e.GREEN = 9] = "GREEN", e.SECRETLIGHTBLUE = "length", e))(v || {});
    class $ {
        constructor(r, n, h) {
            this.cb = r, this.int = n, this.keyCode = h, this.intervalId = -1
        }
        start(r) {
            this.keyCode == r && (this.intervalId = setInterval(this.cb, this.int))
        }
        stop(r) {
            this.keyCode == r && (clearInterval(this.intervalId), this.intervalId = -1)
        }
    }
    var D = (e => (e[e.PLAYERLEAVE = 0] = "PLAYERLEAVE", e[e.BUILDINGBREAK = 1] = "BUILDINGBREAK", e))(D || {}),
        Z = Q;
    const M = Z.msgpack;
    class O extends W {
        constructor(r = !0) {
            super();
            this.socket = null, this.player = new V, this.players = [], this.gameObjects = [], this.alive = !1;
            const n = this;
            if (r) Object.defineProperty(WebSocket.prototype, "hiddenSend", {
                value: WebSocket.prototype.send
            }), Object.defineProperty(WebSocket.prototype, "send", {
                value: function (h) {
                    n.socket == null && (n.socket = this);
                    const l = new P(M.decode(new Uint8Array(h)));
                    if (n.emit("packetSend", l), l.isCanceled) return;
                    l.type == b.SPAWN && (n.alive = !0), this.hiddenSend(h)
                }
            });
            else {
                class h extends WebSocket {
                    hiddenSend(o) {
                        super.send(o)
                    }
                    constructor(o) {
                        super(o);
                        this.send = u => {
                            const x = new P(M.decode(new Uint8Array(u)));
                            n.emit("packetSend", x), !x.isCanceled && (x.type == b.SPAWN && (n.alive = !0), this.hiddenSend(u))
                        }, n.socket = this, n.initSocket()
                    }
                }
                Object.defineProperty(window, "WebSocket", {
                    value: h
                })
            }
        }
        initSocket() {
            var r;
            (r = this.socket) == null || r.addEventListener("message", n => {
                const h = new K(M.decode(new Uint8Array(n.data)));
                this.emit("packetReceive", h);
                const l = h.payload;
                switch (h.type) {
                    case d.HEALTH:
                        const x = l[0];
                        this.emit("health", new F(x, l[1])), this.players[x].health = l[1];
                        break;
                    case d.INIT:
                        this.player.id = l[0];
                        break;
                    case d.SET_SID:
                        this.players[l[0]] = this.player, this.player.sid = l[0];
                        break;
                    case d.UPDAE_PLAYERS:
                        for (let t = 0; t < l[0].length; t += 13) {
                            const f = l[0].slice(t, t + 13),
                                c = {
                                    sid: f[0],
                                    x: f[1],
                                    y: f[2],
                                    dir: f[3],
                                    obj: f[4],
                                    wep: f[5],
                                    variant: f[6],
                                    tribe: f[7],
                                    isLeader: f[8],
                                    hat: f[9],
                                    acc: f[10],
                                    isSkull: f[11],
                                    zIndex: f[12]
                                };
                            this.players[c.sid] || (console.warn("Ran into unpredicted circumstance current player cannot be found, IPlayerDat, this.players, IPlayerDat.sid", c, this.players, c.sid), this.players[c.sid] = new y), this.emit("updatePlayer", c), this.players[c.sid].assign(c)
                        }
                        break;
                    case d.REMOVE_PLAYER:
                        const _ = this.getPlayerById(l[0]);
                        _ && (this.emit("playerLeave", new U(_)), delete this.players[_.sid]);
                        break;
                    case d.ADD_PLAYER:
                        const R = l[0],
                            w = R[1];
                        var u = this.player;
                        w != this.player.sid && (u = new y), u.sid = w, u.id = R[0], u.name = R[2], u.x = R[3], u.y = R[4], this.players[w] = u, this.emit("addPlayer", new U(u));
                        break;
                    case d.ADD_OBJECT:
                        for (let t = 0; t < l[0].length; t += 8) {
                            const f = l[0].slice(t, t + 8),
                                c = {
                                    id: f[0],
                                    x: f[1],
                                    y: f[2],
                                    dir: f[3],
                                    scale: f[4],
                                    type: f[5],
                                    buildType: f[6],
                                    ownerSid: f[7]
                                };
                            this.gameObjects[c.id] = c, this.emit("addObject", new j(c))
                        }
                        break;
                    case d.REMOVE_OBJECT:
                        this.emit("removeObject", new G(this.gameObjects[l[0]], D.BUILDINGBREAK)), delete this.gameObjects[l[0]];
                        break;
                    case d.REMOVE_ALL_OBJECTS:
                        for (let t = 0; t < this.gameObjects.length; t++) {
                            const f = this.gameObjects[t];
                            !f || f.ownerSid == l[0] && (this.emit("removeObject", new G(this.gameObjects[t], D.PLAYERLEAVE)), this.gameObjects.slice(t, 1))
                        }
                        break;
                    case d.SET_ITEMS_BAR:
                        l[0] && (l[1] ? this.player.weapons = l[0] : this.player.items = l[0]);
                        break;
                    case d.DEATH:
                        this.player.weapons = [B.TOOL_HAMMER, void 0], this.player.items = [A.APPLE, A.WOOD_WALL, A.SPIKE, A.WINDMILL, void 0, void 0, void 0, void 0];
                        break;
                    case d.CHAT:
                        const L = l[0],
                            a = this.getPlayerBySid(L);
                        if (a == null) return;
                        const N = l[1];
                        clearTimeout(a.messageTimeout), a.chatMessage = N, a.messageTimeout = setTimeout(() => {
                            a.chatMessage = null
                        }, 3e3), this.emit("chat", new I(L, N));
                        break
                }
            })
        }
        getPlayerById(r) {
            for (let n of this.players)
                if ((n == null ? void 0 : n.id) == r) return n;
            return null
        }
        getPlayerBySid(r) {
            for (let n of this.players)
                if ((n == null ? void 0 : n.sid) == r) return n;
            return null
        }
        sendRaw(r) {
            var n;
            (n = this.socket) == null || n.send(M.encode(r))
        }
        sendBasic(r, ...n) {
            this.sendRaw([r, n])
        }
        sendHidden(r, ...n) {
            var h = this.socket;
            h == null || h.hiddenSend(M.encode([r, n]))
        }
        spawn(r = "moomooapi", n = v.RED, h = !0) {
            this.sendBasic(b.SPAWN, {
                name: r,
                skin: n,
                moofoll: h
            })
        }
        setHand(r, n) {
            this.sendBasic(b.SELECT_ITEM, r, n)
        }
        setItem(r) {
            this.setHand(r, !1)
        }
        setWeapon(r) {
            this.setHand(r, !0)
        }
        attack(r, n = null) {
            this.sendBasic(b.ATTACK, r, n)
        }
        singleSwing(r = null) {
            this.attack(!0, r), this.attack(!1)
        }
        placeItem(r, n = null) {
            this.setItem(r), this.singleSwing(n), this.setWeapon(this.player.wep)
        }
    }
    O.SkinColours = v, O.C2SPacketType = b, O.S2CPacketType = d, O.ObjectRemoveReason = D, O.ItemIds = A, O.WeaponIds = B, O.Repeater = $, O.msgpack = M, Object.defineProperty(window, "MooMooAPI", {
        value: O
    }), p.MooMooAPI = O, p.msgpack2 = M, Object.defineProperties(p, {
        __esModule: {
            value: !0
        },
        [Symbol.toStringTag]: {
            value: "Module"
        }
    })
});