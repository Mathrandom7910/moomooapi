var S = Object.defineProperty;
var q = (p, d, y) => d in p ? S(p, d, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: y
}) : p[d] = y;
var m = (p, d, y) => (q(p, typeof d != "symbol" ? d + "" : d, y), y);
(function (p, d) {
    typeof exports == "object" && typeof module != "undefined" ? d(exports) : typeof define == "function" && define.amd ? define(["exports"], d) : (p = typeof globalThis != "undefined" ? globalThis : p || self, d(p.MMAPI = {}))
})(this, function (p) {
    "use strict";
    class d {
        constructor() {}
    }
    class y extends d {
        constructor(l) {
            super();
            m(this, "type");
            m(this, "payload");
            this.packet = l, this.type = l[0], this.payload = l[1]
        }
    }
    class T extends y {
        constructor(l) {
            super(l)
        }
    }
    class I extends y {
        constructor(l) {
            super(l);
            m(this, "isCanceled", !1)
        }
    }
    class P {
        constructor(l, r, s = !1) {
            this.name = l, this.cb = r, this.once = s
        }
    }
    class B {
        constructor() {
            m(this, "events", [])
        }
        on(l, r) {
            this.events.push(new P(l, r))
        }
        once(l, r) {
            this.events.push(new P(l, r, !1))
        }
        emit(l, ...r) {
            this.events.filter(s => s.name != l ? !0 : (s.cb(...r), !s.once))
        }
        rmv(l) {
            this.events.forEach(r => {
                r.name == l && (r.once = !0)
            })
        }
    }

    function j(f) {
        let r, s, u = new Uint8Array(128),
            i = 0;
        return h(f), u.subarray(0, i);

        function h(n) {
            switch (typeof n) {
                case "undefined":
                    w();
                    break;
                case "boolean":
                    A(n);
                    break;
                case "number":
                    v(n);
                    break;
                case "string":
                    E(n);
                    break;
                case "object":
                    n === null ? w() : n instanceof Date ? e(n) : Array.isArray(n) ? a(n) : n instanceof Uint8Array || n instanceof Uint8ClampedArray ? g(n) : n instanceof Int8Array || n instanceof Int16Array || n instanceof Uint16Array || n instanceof Int32Array || n instanceof Uint32Array || n instanceof Float32Array || n instanceof Float64Array ? a(n) : M(n);
                    break
            }
        }

        function w(n) {
            x(192)
        }

        function A(n) {
            x(n ? 195 : 194)
        }

        function v(n) {
            if (isFinite(n) && Math.floor(n) === n)
                if (n >= 0 && n <= 127) x(n);
                else if (n < 0 && n >= -32) x(n);
            else if (n > 0 && n <= 255) o([204, n]);
            else if (n >= -128 && n <= 127) o([208, n]);
            else if (n > 0 && n <= 65535) o([205, n >>> 8, n]);
            else if (n >= -32768 && n <= 32767) o([209, n >>> 8, n]);
            else if (n > 0 && n <= 4294967295) o([206, n >>> 24, n >>> 16, n >>> 8, n]);
            else if (n >= -2147483648 && n <= 2147483647) o([210, n >>> 24, n >>> 16, n >>> 8, n]);
            else if (n > 0 && n <= 18446744073709552e3) {
                let t = n / 4294967296,
                    c = n % 4294967296;
                o([211, t >>> 24, t >>> 16, t >>> 8, t, c >>> 24, c >>> 16, c >>> 8, c])
            } else n >= -9223372036854776e3 && n <= 9223372036854776e3 ? (x(211), b(n)) : n < 0 ? o([211, 128, 0, 0, 0, 0, 0, 0, 0]) : o([207, 255, 255, 255, 255, 255, 255, 255, 255]);
            else s || (r = new ArrayBuffer(8), s = new DataView(r)), s.setFloat64(0, n), x(203), o(new Uint8Array(r))
        }

        function E(n) {
            let t = O(n),
                c = t.length;
            c <= 31 ? x(160 + c) : c <= 255 ? o([217, c]) : c <= 65535 ? o([218, c >>> 8, c]) : o([219, c >>> 24, c >>> 16, c >>> 8, c]), o(t)
        }

        function a(n) {
            let t = n.length;
            t <= 15 ? x(144 + t) : t <= 65535 ? o([220, t >>> 8, t]) : o([221, t >>> 24, t >>> 16, t >>> 8, t]);
            for (let c = 0; c < t; c++) h(n[c])
        }

        function g(n) {
            let t = n.length;
            t <= 15 ? o([196, t]) : t <= 65535 ? o([197, t >>> 8, t]) : o([198, t >>> 24, t >>> 16, t >>> 8, t]), o(n)
        }

        function M(n) {
            let t = 0;
            for (let c in n) t++;
            t <= 15 ? x(128 + t) : t <= 65535 ? o([222, t >>> 8, t]) : o([223, t >>> 24, t >>> 16, t >>> 8, t]);
            for (let c in n) h(c), h(n[c])
        }

        function e(n) {
            let t = n.getTime() / 1e3;
            if (n.getMilliseconds() === 0 && t >= 0 && t < 4294967296) o([214, 255, t >>> 24, t >>> 16, t >>> 8, t]);
            else if (t >= 0 && t < 17179869184) {
                let c = n.getMilliseconds() * 1e6;
                o([215, 255, c >>> 22, c >>> 14, c >>> 6, c << 2 >>> 0 | t / 4294967296, t >>> 24, t >>> 16, t >>> 8, t])
            } else {
                let c = n.getMilliseconds() * 1e6;
                o([199, 12, 255, c >>> 24, c >>> 16, c >>> 8, c]), b(t)
            }
        }

        function x(n) {
            if (u.length < i + 1) {
                let t = u.length * 2;
                for (; t < i + 1;) t *= 2;
                let c = new Uint8Array(t);
                c.set(u), u = c
            }
            u[i] = n, i++
        }

        function o(n) {
            if (u.length < i + n.length) {
                let t = u.length * 2;
                for (; t < i + n.length;) t *= 2;
                let c = new Uint8Array(t);
                c.set(u), u = c
            }
            u.set(n, i), i += n.length
        }

        function b(n) {
            let t, c;
            n >= 0 ? (t = n / 4294967296, c = n % 4294967296) : (n++, t = Math.abs(n) / 4294967296, c = Math.abs(n) % 4294967296, t = ~t, c = ~c), o([t >>> 24, t >>> 16, t >>> 8, t, c >>> 24, c >>> 16, c >>> 8, c])
        }
    }

    function D(f) {
        let r = 0;
        if (f instanceof ArrayBuffer && (f = new Uint8Array(f)), typeof f != "object" || typeof f.length == "undefined") throw new Error("Invalid argument type: Expected a byte array (Array or Uint8Array) to deserialize.");
        if (!f.length) throw new Error("Invalid argument: The byte array to deserialize is empty.");
        f instanceof Uint8Array || (f = new Uint8Array(f));
        let s = u();
        return r < f.length, s;

        function u() {
            const e = f[r++];
            if (e >= 0 && e <= 127) return e;
            if (e >= 128 && e <= 143) return v(e - 128);
            if (e >= 144 && e <= 159) return E(e - 144);
            if (e >= 160 && e <= 191) return a(e - 160);
            if (e === 192) return null;
            if (e === 193) throw new Error("Invalid byte code 0xc1 found.");
            if (e === 194) return !1;
            if (e === 195) return !0;
            if (e === 196) return A(-1, 1);
            if (e === 197) return A(-1, 2);
            if (e === 198) return A(-1, 4);
            if (e === 199) return g(-1, 1);
            if (e === 200) return g(-1, 2);
            if (e === 201) return g(-1, 4);
            if (e === 202) return w(4);
            if (e === 203) return w(8);
            if (e === 204) return h(1);
            if (e === 205) return h(2);
            if (e === 206) return h(4);
            if (e === 207) return h(8);
            if (e === 208) return i(1);
            if (e === 209) return i(2);
            if (e === 210) return i(4);
            if (e === 211) return i(8);
            if (e === 212) return g(1);
            if (e === 213) return g(2);
            if (e === 214) return g(4);
            if (e === 215) return g(8);
            if (e === 216) return g(16);
            if (e === 217) return a(-1, 1);
            if (e === 218) return a(-1, 2);
            if (e === 219) return a(-1, 4);
            if (e === 220) return E(-1, 2);
            if (e === 221) return E(-1, 4);
            if (e === 222) return v(-1, 2);
            if (e === 223) return v(-1, 4);
            if (e >= 224 && e <= 255) return e - 256;
            throw console.debug("msgpack array:", f), new Error("Invalid byte value '" + e + "' at index " + (r - 1) + " in the MessagePack binary data (length " + f.length + "): Expecting a range of 0 to 255. This is not a byte array.")
        }

        function i(e) {
            let x = 0,
                o = !0;
            for (; e-- > 0;)
                if (o) {
                    let b = f[r++];
                    x += b & 127, b & 128 && (x -= 128), o = !1
                } else x *= 256, x += f[r++];
            return x
        }

        function h(e) {
            let x = 0;
            for (; e-- > 0;) x *= 256, x += f[r++];
            return x
        }

        function w(e) {
            let x = new DataView(f.buffer, r, e);
            if (r += e, e === 4) return x.getFloat32(0, !1);
            if (e === 8) return x.getFloat64(0, !1)
        }

        function A(e, x) {
            e < 0 && (e = h(x));
            let o = f.subarray(r, r + e);
            return r += e, o
        }

        function v(e, x) {
            e < 0 && (e = h(x));
            let o = {};
            for (; e-- > 0;) {
                let b = u();
                o[b] = u()
            }
            return o
        }

        function E(e, x) {
            e < 0 && (e = h(x));
            let o = [];
            for (; e-- > 0;) o.push(u());
            return o
        }

        function a(e, x) {
            e < 0 && (e = h(x));
            let o = r;
            return r += e, R(f, o, e)
        }

        function g(e, x) {
            e < 0 && (e = h(x));
            let o = h(1),
                b = A(e);
            switch (o) {
                case 255:
                    return M(b)
            }
            return {
                type: o,
                data: b
            }
        }

        function M(e) {
            if (e.length === 4) {
                let x = (e[0] << 24 >>> 0) + (e[1] << 16 >>> 0) + (e[2] << 8 >>> 0) + e[3];
                return new Date(x * 1e3)
            }
            if (e.length === 8) {
                let x = (e[0] << 22 >>> 0) + (e[1] << 14 >>> 0) + (e[2] << 6 >>> 0) + (e[3] >>> 2),
                    o = (e[3] & 3) * 4294967296 + (e[4] << 24 >>> 0) + (e[5] << 16 >>> 0) + (e[6] << 8 >>> 0) + e[7];
                return new Date(o * 1e3 + x / 1e6)
            }
            if (e.length === 12) {
                let x = (e[0] << 24 >>> 0) + (e[1] << 16 >>> 0) + (e[2] << 8 >>> 0) + e[3];
                r -= 8;
                let o = i(8);
                return new Date(o * 1e3 + x / 1e6)
            }
            throw new Error("Invalid data length for a date value.")
        }
    }

    function O(f) {
        let l = !0,
            r = f.length;
        for (let i = 0; i < r; i++)
            if (f.charCodeAt(i) > 127) {
                l = !1;
                break
            } let s = 0,
            u = new Uint8Array(f.length * (l ? 1 : 4));
        for (let i = 0; i !== r; i++) {
            let h = f.charCodeAt(i);
            if (h < 128) {
                u[s++] = h;
                continue
            }
            if (h < 2048) u[s++] = h >> 6 | 192;
            else {
                if (h > 55295 && h < 56320) {
                    if (++i >= r) throw new Error("UTF-8 encode: incomplete surrogate pair");
                    let w = f.charCodeAt(i);
                    if (w < 56320 || w > 57343) throw new Error("UTF-8 encode: second surrogate character 0x" + w.toString(16) + " at index " + i + " out of range");
                    h = 65536 + ((h & 1023) << 10) + (w & 1023), u[s++] = h >> 18 | 240, u[s++] = h >> 12 & 63 | 128
                } else u[s++] = h >> 12 | 224;
                u[s++] = h >> 6 & 63 | 128
            }
            u[s++] = h & 63 | 128
        }
        return l ? u : u.subarray(0, s)
    }

    function R(f, l, r) {
        let s = l,
            u = "";
        for (r += l; s < r;) {
            let i = f[s++];
            if (i > 127)
                if (i > 191 && i < 224) {
                    if (s >= r) throw new Error("UTF-8 decode: incomplete 2-byte sequence");
                    i = (i & 31) << 6 | f[s++] & 63
                } else if (i > 223 && i < 240) {
                if (s + 1 >= r) throw new Error("UTF-8 decode: incomplete 3-byte sequence");
                i = (i & 15) << 12 | (f[s++] & 63) << 6 | f[s++] & 63
            } else if (i > 239 && i < 248) {
                if (s + 2 >= r) throw new Error("UTF-8 decode: incomplete 4-byte sequence");
                i = (i & 7) << 18 | (f[s++] & 63) << 12 | (f[s++] & 63) << 6 | f[s++] & 63
            } else throw new Error("UTF-8 decode: unknown multibyte start 0x" + i.toString(16) + " at index " + (s - 1));
            if (i <= 65535) u += String.fromCharCode(i);
            else if (i <= 1114111) i -= 65536, u += String.fromCharCode(i >> 10 | 55296), u += String.fromCharCode(i & 1023 | 56320);
            else throw new Error("UTF-8 decode: code point 0x" + i.toString(16) + " exceeds UTF-16 reach")
        }
        return u
    }
    var _ = Object.freeze(Object.defineProperty({
            __proto__: null,
            msgpack: {
                encode: j,
                decode: D
            }
        }, Symbol.toStringTag, {
            value: "Module"
        })),
        L = _;
    const U = L.msgpack;
    var k = (f => (f[f.brown = 0] = "brown", f[f.beige = 1] = "beige", f[f.darkBrown = 2] = "darkBrown", f[f.peach = 3] = "peach", f[f.white = 4] = "white", f[f.red = 5] = "red", f[f.black = 6] = "black", f[f.pink = 7] = "pink", f[f.blue = 8] = "blue", f[f.green = 9] = "green", f.secretLightBlue = "length", f))(k || {});
    class F extends B {
        constructor() {
            super();
            m(this, "socket", null);
            var l = this;
            class r extends WebSocket {
                hiddenSend(u) {
                    super.send(u)
                }
                constructor(u) {
                    super(u);
                    this.send = i => {
                        const h = new I(U.decode(new Uint8Array(i)));
                        l.onPacketSend(h) || (l.emit("packetSend", h), this.hiddenSend(i))
                    }, l.socket = this, l.initSocket()
                }
            }
            Object.defineProperty(window, "WebSocket", {
                value: r
            })
        }
        initSocket() {
            var l;
            (l = this.socket) == null || l.addEventListener("message", r => {
                const s = new T(U.decode(new Uint8Array(r.data)));
                this.emit("packetReceive", s), this.onPacketReceive(s)
            })
        }
        onPacketSend(l) {
            return !1
        }
        onPacketReceive(l) {}
        sendRaw(l) {
            var r;
            (r = this.socket) == null || r.send(U.encode(l))
        }
        sendBasic(l, ...r) {
            this.sendRaw([l, r])
        }
        sendHidden(l, ...r) {
            var s = this.socket;
            s == null || s.hiddenSend(U.encode([l, r]))
        }
        spawn(l = "moomooapi", r = k.brown, s = !0) {
            this.sendBasic("sp", {
                name: l,
                skin: r,
                moofoll: s
            })
        }
    }
    m(F, "SkinColours", k), Object.defineProperty(window, "MooMooAPI", F), p.MooMooAPI = F, Object.defineProperties(p, {
        __esModule: {
            value: !0
        },
        [Symbol.toStringTag]: {
            value: "Module"
        }
    })
});