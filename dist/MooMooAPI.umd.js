var G = Object.defineProperty;
var K = (g, a, A) => a in g ? G(g, a, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: A
}) : g[a] = A;
var d = (g, a, A) => (K(g, typeof a != "symbol" ? a + "" : a, A), A);
(function (g, a) {
    typeof exports == "object" && typeof module != "undefined" ? a(exports) : typeof define == "function" && define.amd ? define(["exports"], a) : (g = typeof globalThis != "undefined" ? globalThis : g || self, a(g.MMAPI = {}))
})(this, function (g) {
    "use strict";
    class a {
        constructor() {}
    }
    class A extends a {
        constructor(i) {
            super();
            d(this, "payload");
            this.packet = i, this.payload = i[1]
        }
    }
    class O extends A {
        constructor(i) {
            super(i);
            d(this, "type");
            this.type = i[0]
        }
    }
    class R extends A {
        constructor(i) {
            super(i);
            d(this, "type");
            d(this, "isCanceled", !1);
            this.type = i[0]
        }
    }
    class q extends a {
        constructor(i, f) {
            super();
            this.sid = i, this.health = f
        }
    }
    class L {
        constructor(i, f, c = !1) {
            this.name = i, this.cb = f, this.once = c
        }
    }
    class _ {
        constructor() {
            d(this, "events", [])
        }
        on(i, f) {
            this.events.push(new L(i, f))
        }
        once(i, f) {
            this.events.push(new L(i, f, !1))
        }
        emit(i, ...f) {
            this.events.filter(c => c.name != i ? !0 : (c.cb(...f), !c.once))
        }
        rmv(i) {
            this.events.forEach(f => {
                f.name == i && (f.once = !0)
            })
        }
    }

    function N(e) {
        let f, c, x = new Uint8Array(128),
            s = 0;
        return h(e), x.subarray(0, s);

        function h(t) {
            switch (typeof t) {
                case "undefined":
                    p();
                    break;
                case "boolean":
                    w(t);
                    break;
                case "number":
                    b(t);
                    break;
                case "string":
                    F(t);
                    break;
                case "object":
                    t === null ? p() : t instanceof Date ? n(t) : Array.isArray(t) ? U(t) : t instanceof Uint8Array || t instanceof Uint8ClampedArray ? m(t) : t instanceof Int8Array || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array || t instanceof Float64Array ? U(t) : B(t);
                    break
            }
        }

        function p(t) {
            u(192)
        }

        function w(t) {
            u(t ? 195 : 194)
        }

        function b(t) {
            if (isFinite(t) && Math.floor(t) === t)
                if (t >= 0 && t <= 127) u(t);
                else if (t < 0 && t >= -32) u(t);
            else if (t > 0 && t <= 255) o([204, t]);
            else if (t >= -128 && t <= 127) o([208, t]);
            else if (t > 0 && t <= 65535) o([205, t >>> 8, t]);
            else if (t >= -32768 && t <= 32767) o([209, t >>> 8, t]);
            else if (t > 0 && t <= 4294967295) o([206, t >>> 24, t >>> 16, t >>> 8, t]);
            else if (t >= -2147483648 && t <= 2147483647) o([210, t >>> 24, t >>> 16, t >>> 8, t]);
            else if (t > 0 && t <= 18446744073709552e3) {
                let r = t / 4294967296,
                    l = t % 4294967296;
                o([211, r >>> 24, r >>> 16, r >>> 8, r, l >>> 24, l >>> 16, l >>> 8, l])
            } else t >= -9223372036854776e3 && t <= 9223372036854776e3 ? (u(211), v(t)) : t < 0 ? o([211, 128, 0, 0, 0, 0, 0, 0, 0]) : o([207, 255, 255, 255, 255, 255, 255, 255, 255]);
            else c || (f = new ArrayBuffer(8), c = new DataView(f)), c.setFloat64(0, t), u(203), o(new Uint8Array(f))
        }

        function F(t) {
            let r = W(t),
                l = r.length;
            l <= 31 ? u(160 + l) : l <= 255 ? o([217, l]) : l <= 65535 ? o([218, l >>> 8, l]) : o([219, l >>> 24, l >>> 16, l >>> 8, l]), o(r)
        }

        function U(t) {
            let r = t.length;
            r <= 15 ? u(144 + r) : r <= 65535 ? o([220, r >>> 8, r]) : o([221, r >>> 24, r >>> 16, r >>> 8, r]);
            for (let l = 0; l < r; l++) h(t[l])
        }

        function m(t) {
            let r = t.length;
            r <= 15 ? o([196, r]) : r <= 65535 ? o([197, r >>> 8, r]) : o([198, r >>> 24, r >>> 16, r >>> 8, r]), o(t)
        }

        function B(t) {
            let r = 0;
            for (let l in t) r++;
            r <= 15 ? u(128 + r) : r <= 65535 ? o([222, r >>> 8, r]) : o([223, r >>> 24, r >>> 16, r >>> 8, r]);
            for (let l in t) h(l), h(t[l])
        }

        function n(t) {
            let r = t.getTime() / 1e3;
            if (t.getMilliseconds() === 0 && r >= 0 && r < 4294967296) o([214, 255, r >>> 24, r >>> 16, r >>> 8, r]);
            else if (r >= 0 && r < 17179869184) {
                let l = t.getMilliseconds() * 1e6;
                o([215, 255, l >>> 22, l >>> 14, l >>> 6, l << 2 >>> 0 | r / 4294967296, r >>> 24, r >>> 16, r >>> 8, r])
            } else {
                let l = t.getMilliseconds() * 1e6;
                o([199, 12, 255, l >>> 24, l >>> 16, l >>> 8, l]), v(r)
            }
        }

        function u(t) {
            if (x.length < s + 1) {
                let r = x.length * 2;
                for (; r < s + 1;) r *= 2;
                let l = new Uint8Array(r);
                l.set(x), x = l
            }
            x[s] = t, s++
        }

        function o(t) {
            if (x.length < s + t.length) {
                let r = x.length * 2;
                for (; r < s + t.length;) r *= 2;
                let l = new Uint8Array(r);
                l.set(x), x = l
            }
            x.set(t, s), s += t.length
        }

        function v(t) {
            let r, l;
            t >= 0 ? (r = t / 4294967296, l = t % 4294967296) : (t++, r = Math.abs(t) / 4294967296, l = Math.abs(t) % 4294967296, r = ~r, l = ~l), o([r >>> 24, r >>> 16, r >>> 8, r, l >>> 24, l >>> 16, l >>> 8, l])
        }
    }

    function V(e) {
        let f = 0;
        if (e instanceof ArrayBuffer && (e = new Uint8Array(e)), typeof e != "object" || typeof e.length == "undefined") throw new Error("Invalid argument type: Expected a byte array (Array or Uint8Array) to deserialize.");
        if (!e.length) throw new Error("Invalid argument: The byte array to deserialize is empty.");
        e instanceof Uint8Array || (e = new Uint8Array(e));
        let c = x();
        return f < e.length, c;

        function x() {
            const n = e[f++];
            if (n >= 0 && n <= 127) return n;
            if (n >= 128 && n <= 143) return b(n - 128);
            if (n >= 144 && n <= 159) return F(n - 144);
            if (n >= 160 && n <= 191) return U(n - 160);
            if (n === 192) return null;
            if (n === 193) throw new Error("Invalid byte code 0xc1 found.");
            if (n === 194) return !1;
            if (n === 195) return !0;
            if (n === 196) return w(-1, 1);
            if (n === 197) return w(-1, 2);
            if (n === 198) return w(-1, 4);
            if (n === 199) return m(-1, 1);
            if (n === 200) return m(-1, 2);
            if (n === 201) return m(-1, 4);
            if (n === 202) return p(4);
            if (n === 203) return p(8);
            if (n === 204) return h(1);
            if (n === 205) return h(2);
            if (n === 206) return h(4);
            if (n === 207) return h(8);
            if (n === 208) return s(1);
            if (n === 209) return s(2);
            if (n === 210) return s(4);
            if (n === 211) return s(8);
            if (n === 212) return m(1);
            if (n === 213) return m(2);
            if (n === 214) return m(4);
            if (n === 215) return m(8);
            if (n === 216) return m(16);
            if (n === 217) return U(-1, 1);
            if (n === 218) return U(-1, 2);
            if (n === 219) return U(-1, 4);
            if (n === 220) return F(-1, 2);
            if (n === 221) return F(-1, 4);
            if (n === 222) return b(-1, 2);
            if (n === 223) return b(-1, 4);
            if (n >= 224 && n <= 255) return n - 256;
            throw console.debug("msgpack array:", e), new Error("Invalid byte value '" + n + "' at index " + (f - 1) + " in the MessagePack binary data (length " + e.length + "): Expecting a range of 0 to 255. This is not a byte array.")
        }

        function s(n) {
            let u = 0,
                o = !0;
            for (; n-- > 0;)
                if (o) {
                    let v = e[f++];
                    u += v & 127, v & 128 && (u -= 128), o = !1
                } else u *= 256, u += e[f++];
            return u
        }

        function h(n) {
            let u = 0;
            for (; n-- > 0;) u *= 256, u += e[f++];
            return u
        }

        function p(n) {
            let u = new DataView(e.buffer, f, n);
            if (f += n, n === 4) return u.getFloat32(0, !1);
            if (n === 8) return u.getFloat64(0, !1)
        }

        function w(n, u) {
            n < 0 && (n = h(u));
            let o = e.subarray(f, f + n);
            return f += n, o
        }

        function b(n, u) {
            n < 0 && (n = h(u));
            let o = {};
            for (; n-- > 0;) {
                let v = x();
                o[v] = x()
            }
            return o
        }

        function F(n, u) {
            n < 0 && (n = h(u));
            let o = [];
            for (; n-- > 0;) o.push(x());
            return o
        }

        function U(n, u) {
            n < 0 && (n = h(u));
            let o = f;
            return f += n, H(e, o, n)
        }

        function m(n, u) {
            n < 0 && (n = h(u));
            let o = h(1),
                v = w(n);
            switch (o) {
                case 255:
                    return B(v)
            }
            return {
                type: o,
                data: v
            }
        }

        function B(n) {
            if (n.length === 4) {
                let u = (n[0] << 24 >>> 0) + (n[1] << 16 >>> 0) + (n[2] << 8 >>> 0) + n[3];
                return new Date(u * 1e3)
            }
            if (n.length === 8) {
                let u = (n[0] << 22 >>> 0) + (n[1] << 14 >>> 0) + (n[2] << 6 >>> 0) + (n[3] >>> 2),
                    o = (n[3] & 3) * 4294967296 + (n[4] << 24 >>> 0) + (n[5] << 16 >>> 0) + (n[6] << 8 >>> 0) + n[7];
                return new Date(o * 1e3 + u / 1e6)
            }
            if (n.length === 12) {
                let u = (n[0] << 24 >>> 0) + (n[1] << 16 >>> 0) + (n[2] << 8 >>> 0) + n[3];
                f -= 8;
                let o = s(8);
                return new Date(o * 1e3 + u / 1e6)
            }
            throw new Error("Invalid data length for a date value.")
        }
    }

    function W(e) {
        let i = !0,
            f = e.length;
        for (let s = 0; s < f; s++)
            if (e.charCodeAt(s) > 127) {
                i = !1;
                break
            } let c = 0,
            x = new Uint8Array(e.length * (i ? 1 : 4));
        for (let s = 0; s !== f; s++) {
            let h = e.charCodeAt(s);
            if (h < 128) {
                x[c++] = h;
                continue
            }
            if (h < 2048) x[c++] = h >> 6 | 192;
            else {
                if (h > 55295 && h < 56320) {
                    if (++s >= f) throw new Error("UTF-8 encode: incomplete surrogate pair");
                    let p = e.charCodeAt(s);
                    if (p < 56320 || p > 57343) throw new Error("UTF-8 encode: second surrogate character 0x" + p.toString(16) + " at index " + s + " out of range");
                    h = 65536 + ((h & 1023) << 10) + (p & 1023), x[c++] = h >> 18 | 240, x[c++] = h >> 12 & 63 | 128
                } else x[c++] = h >> 12 | 224;
                x[c++] = h >> 6 & 63 | 128
            }
            x[c++] = h & 63 | 128
        }
        return i ? x : x.subarray(0, c)
    }

    function H(e, i, f) {
        let c = i,
            x = "";
        for (f += i; c < f;) {
            let s = e[c++];
            if (s > 127)
                if (s > 191 && s < 224) {
                    if (c >= f) throw new Error("UTF-8 decode: incomplete 2-byte sequence");
                    s = (s & 31) << 6 | e[c++] & 63
                } else if (s > 223 && s < 240) {
                if (c + 1 >= f) throw new Error("UTF-8 decode: incomplete 3-byte sequence");
                s = (s & 15) << 12 | (e[c++] & 63) << 6 | e[c++] & 63
            } else if (s > 239 && s < 248) {
                if (c + 2 >= f) throw new Error("UTF-8 decode: incomplete 4-byte sequence");
                s = (s & 7) << 18 | (e[c++] & 63) << 12 | (e[c++] & 63) << 6 | e[c++] & 63
            } else throw new Error("UTF-8 decode: unknown multibyte start 0x" + s.toString(16) + " at index " + (c - 1));
            if (s <= 65535) x += String.fromCharCode(s);
            else if (s <= 1114111) s -= 65536, x += String.fromCharCode(s >> 10 | 55296), x += String.fromCharCode(s & 1023 | 56320);
            else throw new Error("UTF-8 decode: code point 0x" + s.toString(16) + " exceeds UTF-16 reach")
        }
        return x
    }
    var J = Object.freeze(Object.defineProperty({
            __proto__: null,
            msgpack: {
                encode: N,
                decode: V
            }
        }, Symbol.toStringTag, {
            value: "Module"
        })),
        $ = J;
    const I = $.msgpack;
    var j = (e => (e[e.brown = 0] = "brown", e[e.beige = 1] = "beige", e[e.darkBrown = 2] = "darkBrown", e[e.peach = 3] = "peach", e[e.white = 4] = "white", e[e.red = 5] = "red", e[e.black = 6] = "black", e[e.pink = 7] = "pink", e[e.blue = 8] = "blue", e[e.green = 9] = "green", e.secretLightBlue = "length", e))(j || {}),
        M = (e => (e.spawn = "sp", e.chat = "ch", e.attack = "c", e.ping = "pp", e.setAngle = "2", e.selectItem = "5", e.upgrade = "6", e.autoAttack = "7", e.createTribe = "8", e.leaveTribe = "9", e.requestJoinTribe = "10", e.acceptTribeRequest = "11", e.kickFromTribe = "12", e.buyFromShop = "13c", e.pingMap = "14", e.move = "33", e))(M || {}),
        E = (e => (e.announce = "ann", e.init = "io-init", e.initTribe = "id", e.setSid = "1", e.kick = "d", e.addPlayer = "2", e.updatePlayers = "33", e.removePlayer = "4", e.updateLeaderBoard = "5", e.addObject = "6", e.updateAi = "a", e.playerSwing = "7", e.moostafaSwing = "aa", e.wiggle = "8", e.shootTurret = "sp", e.updateMats = "9", e.health = "h", e.death = "11", e.removeBuild = "12", e.removeObject = "13", e.setItemCount = "14", e.setAge = "15", e.listUpgrades = "16", e.setItemsBar = "17", e.addProjectile = "18", e.removeProjectile = "19", e.serverRestart = "20", e.addTribe = "ac", e.deleteTribe = "ad", e.requestJoin = "an", e.setTribe = "st", e.setTribeMembers = "sa", e.minimapLocation = "mm", e.chat = "ch", e.updateShop = "us", e.ping = "pp", e.dmgTest = "t", e.pingMap = "p", e))(E || {});
    class D {
        constructor() {
            d(this, "x", -2);
            d(this, "y", -2);
            d(this, "sid", -2);
            d(this, "id", "NULL");
            d(this, "dir", 0);
            d(this, "obj", -2);
            d(this, "wep", -2);
            d(this, "variant", -2);
            d(this, "tribe", "NULL");
            d(this, "isLeader", !1);
            d(this, "hat", -2);
            d(this, "acc", -2);
            d(this, "isSkull", !1);
            d(this, "zIndex", -1)
        }
        assign(i) {
            this.x = i.x, this.y = i.y, this.sid = i.sid, this.dir = i.dir, this.obj = i.obj, this.wep = i.wep, this.variant = i.variant, this.tribe = i.tribe, this.isLeader = i.isLeader, this.hat = i.hat, this.acc = i.acc, this.isSkull = i.isSkull, this.zIndex = i.zIndex
        }
    }
    class y extends _ {
        constructor() {
            super();
            d(this, "socket", null);
            d(this, "player", new D);
            d(this, "players", []);
            var i = this;
            class f extends WebSocket {
                hiddenSend(x) {
                    super.send(x)
                }
                constructor(x) {
                    super(x);
                    this.send = s => {
                        const h = new R(I.decode(new Uint8Array(s)));
                        i.onPacketSend(h) || (i.emit("packetSend", h), this.hiddenSend(s))
                    }, i.socket = this, i.initSocket()
                }
            }
            Object.defineProperty(window, "WebSocket", {
                value: f
            })
        }
        initSocket() {
            var i;
            (i = this.socket) == null || i.addEventListener("message", f => {
                var h;
                const c = new O(I.decode(new Uint8Array(f.data)));
                this.emit("packetReceive", c), this.onPacketReceive(c);
                const x = c.payload;
                switch (c.type) {
                    case E.health:
                        this.emit("health", new q(x[0], x[1]));
                        break;
                    case E.init:
                        this.player.id = x[0];
                        break;
                    case E.setSid:
                        this.players[x[0]] = this.player, this.player.sid = x[0];
                        break;
                    case E.updatePlayers:
                        for (let p = 0; p < x[0].length; p += 13) {
                            const w = x[0].slice(p, p + 13),
                                b = {
                                    sid: w[0],
                                    x: w[1],
                                    y: w[2],
                                    dir: w[3],
                                    obj: w[4],
                                    wep: w[5],
                                    variant: w[6],
                                    tribe: w[7],
                                    isLeader: w[8],
                                    hat: w[9],
                                    acc: w[10],
                                    isSkull: w[11],
                                    zIndex: w[12]
                                };
                            this.players[b.sid] || (this.players[b.sid] = new D), (h = this.players[b.sid]) == null || h.assign(b)
                        }
                        break
                }
            })
        }
        onPacketSend(i) {
            return !1
        }
        onPacketReceive(i) {}
        sendRaw(i) {
            var f;
            (f = this.socket) == null || f.send(I.encode(i))
        }
        sendBasic(i, ...f) {
            this.sendRaw([i, f])
        }
        sendHidden(i, ...f) {
            var c = this.socket;
            c == null || c.hiddenSend(I.encode([i, f]))
        }
        spawn(i = "moomooapi", f = j.brown, c = !0) {
            this.sendBasic(M.spawn, {
                name: i,
                skin: f,
                moofoll: c
            })
        }
    }
    d(y, "SkinColours", j), d(y, "C2SPacketType", M), d(y, "S2CPacketType", E), Object.defineProperty(window, "MooMooAPI", {
        value: y
    }), g.MooMooAPI = y, Object.defineProperties(g, {
        __esModule: {
            value: !0
        },
        [Symbol.toStringTag]: {
            value: "Module"
        }
    })
});