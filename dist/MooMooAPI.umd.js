(function (B, N) {
    typeof exports == "object" && typeof module != "undefined" ? N(exports) : typeof define == "function" && define.amd ? define(["exports"], N) : (B = typeof globalThis != "undefined" ? globalThis : B || self, N(B.MMAPI = {}))
})(this, function (B) {
    "use strict";
    class N {
        constructor(r) {
            this.eventName = r
        }
    }
    class y extends N {
        constructor(r) {
            super("packet");
            this.packet = r, this.payload = r[1]
        }
    }
    class W extends y {
        constructor(r) {
            super(r);
            this.type = r[0]
        }
    }
    class v extends y {
        constructor(r) {
            super(r);
            this.isCanceled = !1, this.type = r[0]
        }
    }
    class a extends N {
        constructor(r) {
            super("player");
            this.player = r
        }
    }
    class j extends N {
        constructor(r, n) {
            super("health");
            this.sid = r, this.health = n
        }
    }
    class K extends N {
        constructor(r) {
            super("build");
            this.building = r
        }
    }
    class V extends K {
        constructor(r) {
            super(r)
        }
    }
    class m extends K {
        constructor(r, n) {
            super(r);
            this.reason = n
        }
    }
    class Y extends N {
        constructor(r, n) {
            super("chat");
            this.sid = r, this.message = n
        }
    }
    class F {
        constructor(r, n, c = !1) {
            this.name = r, this.cb = n, this.once = c
        }
    }
    class H {
        constructor() {
            this.events = []
        }
        on(r, n) {
            this.events.push(new F(r, n))
        }
        once(r, n) {
            this.events.push(new F(r, n, !0))
        }
        emit(r, n) {
            this.events.filter(c => c.name != r ? !0 : (c.cb(n), !c.once))
        }
        removeEvent(r) {
            this.events.forEach(n => {
                n.name == r && (n.once = !0)
            })
        }
    }
    var p = (e => (e.SPAWN = "sp", e.CHAT = "ch", e.ATTACK = "c", e.PING = "pp", e.SET_ANGLE = "2", e.SELECT_ITEM = "5", e.UPGRADE = "6", e.AUTO_ATTACK = "7", e.CREATE_TRIBE = "8", e.LEAVE_TRIBE = "9", e.REQUEST_JOIN_TRIBE = "10", e.ACCEPT_TRIBE_REQUEST = "11", e.KICK_FROM_TRIBE = "12", e.BUY_AND_EQUIP = "13c", e.PING_MAP = "14", e.MOVE = "33", e))(p || {}),
        T = (e => (e.ANNOUNCE = "ann", e.INIT = "io-init", e.INIT_TRIBES = "id", e.SET_SID = "1", e.KICK = "d", e.ADD_PLAYER = "2", e.UPDAE_PLAYERS = "33", e.REMOVE_PLAYER = "4", e.UPDATE_LEADER_BOARD = "5", e.ADD_OBJECT = "6", e.UPDATE_AIS = "a", e.PLAYER_SWING = "7", e.MOOSTAFA_SWING = "aa", e.WIGGLE = "8", e.SHOOT_TURRET = "sp", e.UPDATE_MATS = "9", e.HEALTH = "h", e.DEATH = "11", e.REMOVE_OBJECT = "12", e.REMOVE_ALL_OBJECTS = "13", e.SET_ITEM_COUNT = "14", e.SET_AGE = "15", e.LIST_UPGRADES = "16", e.SET_ITEMS_BAR = "17", e.ADD_PROJECTILE = "18", e.REMOVE_PROJECTILE = "19", e.SERVER_RESTART = "20", e.ADD_TRIBE = "ac", e.DELETE_TRIBE = "ad", e.REQUEST_JOIN_TRIBE = "an", e.SET_TRIBE = "st", e.SET_TRIBE_MEMBERS = "sa", e.MINIMAP_LOCATIONS = "mm", e.CHAT = "ch", e.UPDATE_SHOP = "us", e.PING = "pp", e.DAMAGE_TEST = "t", e.PING_MAP = "p", e))(T || {}),
        u = (e => (e[e.APPLE = 0] = "APPLE", e[e.COOKIE = 1] = "COOKIE", e[e.CHEESE = 2] = "CHEESE", e[e.WOOD_WALL = 3] = "WOOD_WALL", e[e.STONE_WALL = 4] = "STONE_WALL", e[e.CASTLE_WALL = 5] = "CASTLE_WALL", e[e.SPIKE = 6] = "SPIKE", e[e.GREATER_SPIKE = 7] = "GREATER_SPIKE", e[e.POISON_SPIKE = 8] = "POISON_SPIKE", e[e.SPINNING_SPIKE = 9] = "SPINNING_SPIKE", e[e.WINDMILL = 10] = "WINDMILL", e[e.FASTER_WINDMILL = 11] = "FASTER_WINDMILL", e[e.POWER_MILL = 12] = "POWER_MILL", e[e.MINE = 13] = "MINE", e[e.SAPPLING = 14] = "SAPPLING", e[e.PIT_TRAP = 15] = "PIT_TRAP", e[e.BOOST_PAD = 16] = "BOOST_PAD", e[e.TURRET = 17] = "TURRET", e[e.PLATFORM = 18] = "PLATFORM", e[e.HEALING_PAD = 19] = "HEALING_PAD", e[e.SPAWN_PAD = 20] = "SPAWN_PAD", e[e.BLOCKER = 21] = "BLOCKER", e[e.TELEPORTER = 22] = "TELEPORTER", e))(u || {}),
        S = (e => (e[e.TOOL_HAMMER = 0] = "TOOL_HAMMER", e[e.HAND_AXE = 1] = "HAND_AXE", e[e.GREAT_AXE = 2] = "GREAT_AXE", e[e.SHORT_SWORD = 3] = "SHORT_SWORD", e[e.KATANA = 4] = "KATANA", e[e.POLE_ARM = 5] = "POLE_ARM", e[e.BAT = 6] = "BAT", e[e.DAGGERS = 7] = "DAGGERS", e[e.STICK = 8] = "STICK", e[e.HUNTING_BOW = 9] = "HUNTING_BOW", e[e.GREAT_HAMMER = 10] = "GREAT_HAMMER", e[e.WOODEN_SHIELD = 11] = "WOODEN_SHIELD", e[e.CROSSBOW = 12] = "CROSSBOW", e[e.REPEATER_CROSSBOW = 13] = "REPEATER_CROSSBOW", e[e.MC_GRABBY = 14] = "MC_GRABBY", e[e.MUSKET = 15] = "MUSKET", e))(S || {});
    class U {
        constructor() {
            this.x = -2, this.y = -2, this.sid = -2, this.id = "NULL", this.dir = 0, this.obj = -2, this.wep = -2, this.variant = -2, this.tribe = "NULL", this.isLeader = !1, this.hat = -2, this.acc = -2, this.isSkull = !1, this.zIndex = -1, this.health = 100, this.name = "NULL", this.chatMessage = null, this.messageTimeout = -1
        }
        assign(r) {
            this.x = r.x, this.y = r.y, this.sid = r.sid, this.dir = r.dir, this.obj = r.obj, this.wep = r.wep, this.variant = r.variant, this.tribe = r.tribe, this.isLeader = r.isLeader, this.hat = r.hat, this.acc = r.acc, this.isSkull = r.isSkull, this.zIndex = r.zIndex
        }
    }
    class J extends U {
        constructor() {
            super(...arguments);
            this.weapons = [S.TOOL_HAMMER, void 0], this.items = [u.APPLE, u.WOOD_WALL, u.SPIKE, u.WINDMILL, void 0, void 0, void 0, void 0]
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
            return this.searchForId(u.SAPPLING)
        }
        getMineType() {
            return this.searchForId(u.MINE)
        }
        getSpecialType() {
            return this.searchForId(u.TURRET) || this.searchForId(u.BLOCKER) || this.searchForId(u.HEALING_PAD) || this.searchForId(u.PLATFORM) || this.searchForId(u.TELEPORTER)
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

    function C(e) {
        let n, c, E = new Uint8Array(128),
            A = 0;
        return h(e), E.subarray(0, A);

        function h(t) {
            switch (typeof t) {
                case "undefined":
                    _();
                    break;
                case "boolean":
                    O(t);
                    break;
                case "number":
                    L(t);
                    break;
                case "string":
                    w(t);
                    break;
                case "object":
                    t === null ? _() : t instanceof Date ? i(t) : Array.isArray(t) ? M(t) : t instanceof Uint8Array || t instanceof Uint8ClampedArray ? R(t) : t instanceof Int8Array || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array || t instanceof Float64Array ? M(t) : P(t);
                    break
            }
        }

        function _(t) {
            s(192)
        }

        function O(t) {
            s(t ? 195 : 194)
        }

        function L(t) {
            if (isFinite(t) && Math.floor(t) === t)
                if (t >= 0 && t <= 127) s(t);
                else if (t < 0 && t >= -32) s(t);
            else if (t > 0 && t <= 255) l([204, t]);
            else if (t >= -128 && t <= 127) l([208, t]);
            else if (t > 0 && t <= 65535) l([205, t >>> 8, t]);
            else if (t >= -32768 && t <= 32767) l([209, t >>> 8, t]);
            else if (t > 0 && t <= 4294967295) l([206, t >>> 24, t >>> 16, t >>> 8, t]);
            else if (t >= -2147483648 && t <= 2147483647) l([210, t >>> 24, t >>> 16, t >>> 8, t]);
            else if (t > 0 && t <= 18446744073709552e3) {
                let f = t / 4294967296,
                    o = t % 4294967296;
                l([211, f >>> 24, f >>> 16, f >>> 8, f, o >>> 24, o >>> 16, o >>> 8, o])
            } else t >= -9223372036854776e3 && t <= 9223372036854776e3 ? (s(211), g(t)) : t < 0 ? l([211, 128, 0, 0, 0, 0, 0, 0, 0]) : l([207, 255, 255, 255, 255, 255, 255, 255, 255]);
            else c || (n = new ArrayBuffer(8), c = new DataView(n)), c.setFloat64(0, t), s(203), l(new Uint8Array(n))
        }

        function w(t) {
            let f = X(t),
                o = f.length;
            o <= 31 ? s(160 + o) : o <= 255 ? l([217, o]) : o <= 65535 ? l([218, o >>> 8, o]) : l([219, o >>> 24, o >>> 16, o >>> 8, o]), l(f)
        }

        function M(t) {
            let f = t.length;
            f <= 15 ? s(144 + f) : f <= 65535 ? l([220, f >>> 8, f]) : l([221, f >>> 24, f >>> 16, f >>> 8, f]);
            for (let o = 0; o < f; o++) h(t[o])
        }

        function R(t) {
            let f = t.length;
            f <= 15 ? l([196, f]) : f <= 65535 ? l([197, f >>> 8, f]) : l([198, f >>> 24, f >>> 16, f >>> 8, f]), l(t)
        }

        function P(t) {
            let f = 0;
            for (let o in t) f++;
            f <= 15 ? s(128 + f) : f <= 65535 ? l([222, f >>> 8, f]) : l([223, f >>> 24, f >>> 16, f >>> 8, f]);
            for (let o in t) h(o), h(t[o])
        }

        function i(t) {
            let f = t.getTime() / 1e3;
            if (t.getMilliseconds() === 0 && f >= 0 && f < 4294967296) l([214, 255, f >>> 24, f >>> 16, f >>> 8, f]);
            else if (f >= 0 && f < 17179869184) {
                let o = t.getMilliseconds() * 1e6;
                l([215, 255, o >>> 22, o >>> 14, o >>> 6, o << 2 >>> 0 | f / 4294967296, f >>> 24, f >>> 16, f >>> 8, f])
            } else {
                let o = t.getMilliseconds() * 1e6;
                l([199, 12, 255, o >>> 24, o >>> 16, o >>> 8, o]), g(f)
            }
        }

        function s(t) {
            if (E.length < A + 1) {
                let f = E.length * 2;
                for (; f < A + 1;) f *= 2;
                let o = new Uint8Array(f);
                o.set(E), E = o
            }
            E[A] = t, A++
        }

        function l(t) {
            if (E.length < A + t.length) {
                let f = E.length * 2;
                for (; f < A + t.length;) f *= 2;
                let o = new Uint8Array(f);
                o.set(E), E = o
            }
            E.set(t, A), A += t.length
        }

        function g(t) {
            let f, o;
            t >= 0 ? (f = t / 4294967296, o = t % 4294967296) : (t++, f = Math.abs(t) / 4294967296, o = Math.abs(t) % 4294967296, f = ~f, o = ~o), l([f >>> 24, f >>> 16, f >>> 8, f, o >>> 24, o >>> 16, o >>> 8, o])
        }
    }

    function q(e) {
        let n = 0;
        if (e instanceof ArrayBuffer && (e = new Uint8Array(e)), typeof e != "object" || typeof e.length == "undefined") throw new Error("Invalid argument type: Expected a byte array (Array or Uint8Array) to deserialize.");
        if (!e.length) throw new Error("Invalid argument: The byte array to deserialize is empty.");
        e instanceof Uint8Array || (e = new Uint8Array(e));
        let c = E();
        return n < e.length, c;

        function E() {
            const i = e[n++];
            if (i >= 0 && i <= 127) return i;
            if (i >= 128 && i <= 143) return L(i - 128);
            if (i >= 144 && i <= 159) return w(i - 144);
            if (i >= 160 && i <= 191) return M(i - 160);
            if (i === 192) return null;
            if (i === 193) throw new Error("Invalid byte code 0xc1 found.");
            if (i === 194) return !1;
            if (i === 195) return !0;
            if (i === 196) return O(-1, 1);
            if (i === 197) return O(-1, 2);
            if (i === 198) return O(-1, 4);
            if (i === 199) return R(-1, 1);
            if (i === 200) return R(-1, 2);
            if (i === 201) return R(-1, 4);
            if (i === 202) return _(4);
            if (i === 203) return _(8);
            if (i === 204) return h(1);
            if (i === 205) return h(2);
            if (i === 206) return h(4);
            if (i === 207) return h(8);
            if (i === 208) return A(1);
            if (i === 209) return A(2);
            if (i === 210) return A(4);
            if (i === 211) return A(8);
            if (i === 212) return R(1);
            if (i === 213) return R(2);
            if (i === 214) return R(4);
            if (i === 215) return R(8);
            if (i === 216) return R(16);
            if (i === 217) return M(-1, 1);
            if (i === 218) return M(-1, 2);
            if (i === 219) return M(-1, 4);
            if (i === 220) return w(-1, 2);
            if (i === 221) return w(-1, 4);
            if (i === 222) return L(-1, 2);
            if (i === 223) return L(-1, 4);
            if (i >= 224 && i <= 255) return i - 256;
            throw console.debug("msgpack array:", e), new Error("Invalid byte value '" + i + "' at index " + (n - 1) + " in the MessagePack binary data (length " + e.length + "): Expecting a range of 0 to 255. This is not a byte array.")
        }

        function A(i) {
            let s = 0,
                l = !0;
            for (; i-- > 0;)
                if (l) {
                    let g = e[n++];
                    s += g & 127, g & 128 && (s -= 128), l = !1
                } else s *= 256, s += e[n++];
            return s
        }

        function h(i) {
            let s = 0;
            for (; i-- > 0;) s *= 256, s += e[n++];
            return s
        }

        function _(i) {
            let s = new DataView(e.buffer, n, i);
            if (n += i, i === 4) return s.getFloat32(0, !1);
            if (i === 8) return s.getFloat64(0, !1)
        }

        function O(i, s) {
            i < 0 && (i = h(s));
            let l = e.subarray(n, n + i);
            return n += i, l
        }

        function L(i, s) {
            i < 0 && (i = h(s));
            let l = {};
            for (; i-- > 0;) {
                let g = E();
                l[g] = E()
            }
            return l
        }

        function w(i, s) {
            i < 0 && (i = h(s));
            let l = [];
            for (; i-- > 0;) l.push(E());
            return l
        }

        function M(i, s) {
            i < 0 && (i = h(s));
            let l = n;
            return n += i, Q(e, l, i)
        }

        function R(i, s) {
            i < 0 && (i = h(s));
            let l = h(1),
                g = O(i);
            switch (l) {
                case 255:
                    return P(g)
            }
            return {
                type: l,
                data: g
            }
        }

        function P(i) {
            if (i.length === 4) {
                let s = (i[0] << 24 >>> 0) + (i[1] << 16 >>> 0) + (i[2] << 8 >>> 0) + i[3];
                return new Date(s * 1e3)
            }
            if (i.length === 8) {
                let s = (i[0] << 22 >>> 0) + (i[1] << 14 >>> 0) + (i[2] << 6 >>> 0) + (i[3] >>> 2),
                    l = (i[3] & 3) * 4294967296 + (i[4] << 24 >>> 0) + (i[5] << 16 >>> 0) + (i[6] << 8 >>> 0) + i[7];
                return new Date(l * 1e3 + s / 1e6)
            }
            if (i.length === 12) {
                let s = (i[0] << 24 >>> 0) + (i[1] << 16 >>> 0) + (i[2] << 8 >>> 0) + i[3];
                n -= 8;
                let l = A(8);
                return new Date(l * 1e3 + s / 1e6)
            }
            throw new Error("Invalid data length for a date value.")
        }
    }

    function X(e) {
        let r = !0,
            n = e.length;
        for (let A = 0; A < n; A++)
            if (e.charCodeAt(A) > 127) {
                r = !1;
                break
            } let c = 0,
            E = new Uint8Array(e.length * (r ? 1 : 4));
        for (let A = 0; A !== n; A++) {
            let h = e.charCodeAt(A);
            if (h < 128) {
                E[c++] = h;
                continue
            }
            if (h < 2048) E[c++] = h >> 6 | 192;
            else {
                if (h > 55295 && h < 56320) {
                    if (++A >= n) throw new Error("UTF-8 encode: incomplete surrogate pair");
                    let _ = e.charCodeAt(A);
                    if (_ < 56320 || _ > 57343) throw new Error("UTF-8 encode: second surrogate character 0x" + _.toString(16) + " at index " + A + " out of range");
                    h = 65536 + ((h & 1023) << 10) + (_ & 1023), E[c++] = h >> 18 | 240, E[c++] = h >> 12 & 63 | 128
                } else E[c++] = h >> 12 | 224;
                E[c++] = h >> 6 & 63 | 128
            }
            E[c++] = h & 63 | 128
        }
        return r ? E : E.subarray(0, c)
    }

    function Q(e, r, n) {
        let c = r,
            E = "";
        for (n += r; c < n;) {
            let A = e[c++];
            if (A > 127)
                if (A > 191 && A < 224) {
                    if (c >= n) throw new Error("UTF-8 decode: incomplete 2-byte sequence");
                    A = (A & 31) << 6 | e[c++] & 63
                } else if (A > 223 && A < 240) {
                if (c + 1 >= n) throw new Error("UTF-8 decode: incomplete 3-byte sequence");
                A = (A & 15) << 12 | (e[c++] & 63) << 6 | e[c++] & 63
            } else if (A > 239 && A < 248) {
                if (c + 2 >= n) throw new Error("UTF-8 decode: incomplete 4-byte sequence");
                A = (A & 7) << 18 | (e[c++] & 63) << 12 | (e[c++] & 63) << 6 | e[c++] & 63
            } else throw new Error("UTF-8 decode: unknown multibyte start 0x" + A.toString(16) + " at index " + (c - 1));
            if (A <= 65535) E += String.fromCharCode(A);
            else if (A <= 1114111) A -= 65536, E += String.fromCharCode(A >> 10 | 55296), E += String.fromCharCode(A & 1023 | 56320);
            else throw new Error("UTF-8 decode: code point 0x" + A.toString(16) + " exceeds UTF-16 reach")
        }
        return E
    }
    var Z = Object.freeze(Object.defineProperty({
            __proto__: null,
            msgpack: {
                encode: C,
                decode: q
            }
        }, Symbol.toStringTag, {
            value: "Module"
        })),
        G = (e => (e[e.BROWN = 0] = "BROWN", e[e.BEIGE = 1] = "BEIGE", e[e.DARKBROWN = 2] = "DARKBROWN", e[e.PEACH = 3] = "PEACH", e[e.WHITE = 4] = "WHITE", e[e.RED = 5] = "RED", e[e.BLACK = 6] = "BLACK", e[e.PINK = 7] = "PINK", e[e.BLUE = 8] = "BLUE", e[e.GREEN = 9] = "GREEN", e.SECRETLIGHTBLUE = "length", e))(G || {});
    class $ {
        constructor(r, n, c) {
            this.cb = r, this.int = n, this.keyCode = c, this.intervalId = -1
        }
        start(r) {
            this.keyCode == r && (this.intervalId = setInterval(this.cb, this.int))
        }
        stop(r) {
            this.keyCode == r && (clearInterval(this.intervalId), this.intervalId = -1)
        }
    }
    var b = (e => (e[e.PLAYERLEAVE = 0] = "PLAYERLEAVE", e[e.BUILDINGBREAK = 1] = "BUILDINGBREAK", e))(b || {}),
        d = (e => (e[e.SHAME = 45] = "SHAME", e[e.MOO_CAP = 51] = "MOO_CAP", e[e.APPLE_CAP = 50] = "APPLE_CAP", e[e.MOO_HEAD = 28] = "MOO_HEAD", e[e.PIG_HEAD = 29] = "PIG_HEAD", e[e.FLUFF_HEAD = 30] = "FLUFF_HEAD", e[e.PANDOU_HEAD = 36] = "PANDOU_HEAD", e[e.BEAR_HEAD = 37] = "BEAR_HEAD", e[e.MONKEY_HEAD = 38] = "MONKEY_HEAD", e[e.POLAR_HEAD = 44] = "POLAR_HEAD", e[e.FEZ_HAT = 35] = "FEZ_HAT", e[e.ENIGMA_HAT = 42] = "ENIGMA_HAT", e[e.BLITZ_HAT = 43] = "BLITZ_HAT", e[e.BOB_XIII_HAT = 49] = "BOB_XIII_HAT", e[e.PUMPKIN = 57] = "PUMPKIN", e[e.BUMMLE_HAT = 8] = "BUMMLE_HAT", e[e.STRAW_HAT = 2] = "STRAW_HAT", e[e.WINTER_CAP = 15] = "WINTER_CAP", e[e.COWBOY_HAT = 5] = "COWBOY_HAT", e[e.RANGER_HAT = 4] = "RANGER_HAT", e[e.EXPLORER_HAT = 18] = "EXPLORER_HAT", e[e.FLIPPER_HAT = 31] = "FLIPPER_HAT", e[e.MARKSMAN_CAP = 1] = "MARKSMAN_CAP", e[e.BUSH_GEAR = 10] = "BUSH_GEAR", e[e.HALO = 48] = "HALO", e[e.SOLDIER_HELMET = 6] = "SOLDIER_HELMET", e[e.ANTI_VENOM_GEAR = 23] = "ANTI_VENOM_GEAR", e[e.MEDIC_GEAR = 13] = "MEDIC_GEAR", e[e.MINERS_HELMET = 9] = "MINERS_HELMET", e[e.MUSKETEER_HAT = 32] = "MUSKETEER_HAT", e[e.BULL_HELMET = 7] = "BULL_HELMET", e[e.EMP_HELMET = 22] = "EMP_HELMET", e[e.BOOSTER_HAT = 12] = "BOOSTER_HAT", e[e.BARBARIAN_ARMOR = 26] = "BARBARIAN_ARMOR", e[e.PLAGUE_MASK = 21] = "PLAGUE_MASK", e[e.BULL_MASK = 46] = "BULL_MASK", e[e.WINDMILL_HAT = 14] = "WINDMILL_HAT", e[e.SPIKE_GEAR = 11] = "SPIKE_GEAR", e[e.TURRET_GEAR = 53] = "TURRET_GEAR", e[e.SAMURAI_ARMOR = 20] = "SAMURAI_ARMOR", e[e.DARK_KNIGHT = 58] = "DARK_KNIGHT", e[e.SCAVENGER_GEAR = 27] = "SCAVENGER_GEAR", e[e.TANK_GEAR = 40] = "TANK_GEAR", e[e.THIEF_GEAR = 40] = "THIEF_GEAR", e[e.BLOODTHIRSTER = 55] = "BLOODTHIRSTER", e[e.Assassin_GEAR = 56] = "Assassin_GEAR", e))(d || {}),
        k = Z;
    const D = k.msgpack;
    class x extends H {
        constructor(r = !1) {
            super();
            this.socket = null, this.player = new J, this.players = [], this.gameObjects = [], this.alive = !1;
            const n = this;
            if (r) Object.defineProperty(WebSocket.prototype, "hiddenSend", {
                value: WebSocket.prototype.send
            }), Object.defineProperty(WebSocket.prototype, "send", {
                value: function (c) {
                    n.socket == null && (n.socket = this);
                    const E = new v(D.decode(new Uint8Array(c)));
                    if (n.emit("packetSend", E), E.isCanceled) return;
                    E.type == p.SPAWN && (n.alive = !0), this.hiddenSend(c)
                }
            });
            else {
                class c extends WebSocket {
                    hiddenSend(A) {
                        super.send(A)
                    }
                    constructor(A) {
                        super(A);
                        this.send = h => {
                            const _ = new v(D.decode(new Uint8Array(h)));
                            n.emit("packetSend", _), !_.isCanceled && (_.type == p.SPAWN && (n.alive = !0), this.hiddenSend(h))
                        }, n.socket = this, n.initSocket()
                    }
                }
                Object.defineProperty(window, "WebSocket", {
                    value: c
                })
            }
        }
        initSocket() {
            var r;
            (r = this.socket) == null || r.addEventListener("message", n => {
                const c = new W(D.decode(new Uint8Array(n.data)));
                this.emit("packetReceive", c);
                const E = c.payload;
                switch (c.type) {
                    case T.HEALTH:
                        const _ = E[0];
                        this.emit("health", new j(_, E[1])), this.players[_].health = E[1];
                        break;
                    case T.INIT:
                        this.player.id = E[0];
                        break;
                    case T.SET_SID:
                        this.players[E[0]] = this.player, this.player.sid = E[0];
                        break;
                    case T.UPDAE_PLAYERS:
                        for (let i = 0; i < E[0].length; i += 13) {
                            const s = E[0].slice(i, i + 13),
                                l = {
                                    sid: s[0],
                                    x: s[1],
                                    y: s[2],
                                    dir: s[3],
                                    obj: s[4],
                                    wep: s[5],
                                    variant: s[6],
                                    tribe: s[7],
                                    isLeader: s[8],
                                    hat: s[9],
                                    acc: s[10],
                                    isSkull: s[11],
                                    zIndex: s[12]
                                };
                            this.players[l.sid] || (console.warn("Ran into unpredicted circumstance current player cannot be found, IPlayerDat, this.players, IPlayerDat.sid", l, this.players, l.sid), this.players[l.sid] = new U), this.emit("updatePlayer", l), this.players[l.sid].assign(l)
                        }
                        break;
                    case T.REMOVE_PLAYER:
                        const O = this.getPlayerById(E[0]);
                        O && (this.emit("playerLeave", new a(O)), delete this.players[O.sid]);
                        break;
                    case T.ADD_PLAYER:
                        const L = E[0],
                            w = L[1];
                        var h = this.player;
                        w != this.player.sid && (h = new U), h.sid = w, h.id = L[0], h.name = L[2], h.x = L[3], h.y = L[4], this.players[w] = h, this.emit("addPlayer", new a(h));
                        break;
                    case T.ADD_OBJECT:
                        for (let i = 0; i < E[0].length; i += 8) {
                            const s = E[0].slice(i, i + 8),
                                l = {
                                    id: s[0],
                                    x: s[1],
                                    y: s[2],
                                    dir: s[3],
                                    scale: s[4],
                                    type: s[5],
                                    buildType: s[6],
                                    ownerSid: s[7]
                                };
                            this.gameObjects[l.id] = l, this.emit("addObject", new V(l))
                        }
                        break;
                    case T.REMOVE_OBJECT:
                        this.emit("removeObject", new m(this.gameObjects[E[0]], b.BUILDINGBREAK)), delete this.gameObjects[E[0]];
                        break;
                    case T.REMOVE_ALL_OBJECTS:
                        for (let i = 0; i < this.gameObjects.length; i++) {
                            const s = this.gameObjects[i];
                            !s || s.ownerSid == E[0] && (this.emit("removeObject", new m(this.gameObjects[i], b.PLAYERLEAVE)), this.gameObjects.slice(i, 1))
                        }
                        break;
                    case T.SET_ITEMS_BAR:
                        E[0] && (E[1] ? this.player.weapons = E[0] : this.player.items = E[0]);
                        break;
                    case T.DEATH:
                        this.player.weapons = [S.TOOL_HAMMER, void 0], this.player.items = [u.APPLE, u.WOOD_WALL, u.SPIKE, u.WINDMILL, void 0, void 0, void 0, void 0];
                        break;
                    case T.CHAT:
                        const M = E[0],
                            R = this.getPlayerBySid(M);
                        if (R == null) return;
                        const P = E[1];
                        clearTimeout(R.messageTimeout), R.chatMessage = P, R.messageTimeout = setTimeout(() => {
                            R.chatMessage = null
                        }, 3e3), this.emit("chat", new Y(M, P));
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
            (n = this.socket) == null || n.send(D.encode(r))
        }
        sendBasic(r, ...n) {
            this.sendRaw([r, n])
        }
        sendHidden(r, ...n) {
            var c = this.socket;
            c == null || c.hiddenSend(D.encode([r, n]))
        }
        spawn(r = "moomooapi", n = G.RED, c = !0) {
            this.sendBasic(p.SPAWN, {
                name: r,
                skin: n,
                moofoll: c
            })
        }
        setHand(r, n) {
            this.sendBasic(p.SELECT_ITEM, r, n)
        }
        setItem(r) {
            this.setHand(r, !1)
        }
        setWeapon(r) {
            this.setHand(r, !0)
        }
        attack(r, n = null) {
            this.sendBasic(p.ATTACK, r, n)
        }
        singleSwing(r = null) {
            this.attack(!0, r), this.attack(!1)
        }
        placeItem(r, n = null) {
            this.setItem(r), this.singleSwing(n), this.setWeapon(this.player.wep)
        }
        toggleAutoFire() {
            this.sendBasic(p.AUTO_ATTACK, 1)
        }
        setGear(r, n, c) {
            this.sendBasic(p.BUY_AND_EQUIP, r, n, c)
        }
        buyGear(r, n) {
            this.setGear(!0, r, n)
        }
        buyHat(r) {
            this.buyGear(r, !1)
        }
        equipGear(r, n) {
            this.setGear(!1, r, n)
        }
        equipHat(r) {
            this.equipGear(r, !1)
        }
        buyAccessory(r) {
            this.buyGear(r, !0)
        }
        equipAccessory(r) {
            this.equipGear(r, !0)
        }
    }
    x.SkinColours = G, x.C2SPacketType = p, x.S2CPacketType = T, x.ObjectRemoveReason = b, x.ItemIds = u, x.WeaponIds = S, x.Repeater = $, x.msgpack = D, x.HatIds = d, Object.defineProperty(window, "MooMooAPI", {
        value: x
    }), B.MooMooAPI = x, B.msgpack2 = D, Object.defineProperties(B, {
        __esModule: {
            value: !0
        },
        [Symbol.toStringTag]: {
            value: "Module"
        }
    })
});