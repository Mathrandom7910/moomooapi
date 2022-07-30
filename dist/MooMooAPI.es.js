var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var src = {};
Object.defineProperty(src, "__esModule", { value: true });
var Pos_1 = src.Pos = src.PrimitivePos = void 0;
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
    throw new Pos_1(this.building.x, this.building.y);
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
  C2SPacketType2["AUTO_ATTACK"] = "7";
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
class Player {
  constructor() {
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
    return new Pos_1(this.x, this.y);
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
  constructor(cb, msInterval, keyCode) {
    this.cb = cb;
    this.msInterval = msInterval;
    this.keyCode = keyCode;
    this.intervalId = null;
  }
  start(keyCode) {
    if (this.keyCode != keyCode || this.intervalId != null)
      return;
    this.intervalId = setInterval(this.cb, this.msInterval);
  }
  stop(keyCode) {
    if (this.keyCode != keyCode || this.intervalId == null)
      return;
    clearInterval(this.intervalId);
    this.intervalId = null;
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
var encode$3 = {};
var encodeBuffer = {};
var writeCore = {};
var extBuffer = {};
var bufferish = {};
var bufferGlobal = c(typeof Buffer !== "undefined" && Buffer) || c(commonjsGlobal.Buffer) || c(typeof window !== "undefined" && window.Buffer) || commonjsGlobal.Buffer;
function c(B) {
  return B && B.isBuffer && B;
}
var toString$2 = {}.toString;
var isarray = Array.isArray || function(arr) {
  return toString$2.call(arr) == "[object Array]";
};
var bufferishArray = { exports: {} };
var Bufferish$b = bufferish;
var exports$2 = bufferishArray.exports = alloc$2(0);
exports$2.alloc = alloc$2;
exports$2.concat = Bufferish$b.concat;
exports$2.from = from$2;
function alloc$2(size) {
  return new Array(size);
}
function from$2(value) {
  if (!Bufferish$b.isBuffer(value) && Bufferish$b.isView(value)) {
    value = Bufferish$b.Uint8Array.from(value);
  } else if (Bufferish$b.isArrayBuffer(value)) {
    value = new Uint8Array(value);
  } else if (typeof value === "string") {
    return Bufferish$b.from.call(exports$2, value);
  } else if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }
  return Array.prototype.slice.call(value);
}
var bufferishBuffer = { exports: {} };
var Bufferish$a = bufferish;
var Buffer$5 = Bufferish$a.global;
var exports$1 = bufferishBuffer.exports = Bufferish$a.hasBuffer ? alloc$1(0) : [];
exports$1.alloc = Bufferish$a.hasBuffer && Buffer$5.alloc || alloc$1;
exports$1.concat = Bufferish$a.concat;
exports$1.from = from$1;
function alloc$1(size) {
  return new Buffer$5(size);
}
function from$1(value) {
  if (!Bufferish$a.isBuffer(value) && Bufferish$a.isView(value)) {
    value = Bufferish$a.Uint8Array.from(value);
  } else if (Bufferish$a.isArrayBuffer(value)) {
    value = new Uint8Array(value);
  } else if (typeof value === "string") {
    return Bufferish$a.from.call(exports$1, value);
  } else if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }
  if (Buffer$5.from && Buffer$5.from.length !== 1) {
    return Buffer$5.from(value);
  } else {
    return new Buffer$5(value);
  }
}
var bufferishUint8array = { exports: {} };
var Bufferish$9 = bufferish;
var exports = bufferishUint8array.exports = Bufferish$9.hasArrayBuffer ? alloc(0) : [];
exports.alloc = alloc;
exports.concat = Bufferish$9.concat;
exports.from = from;
function alloc(size) {
  return new Uint8Array(size);
}
function from(value) {
  if (Bufferish$9.isView(value)) {
    var byteOffset = value.byteOffset;
    var byteLength = value.byteLength;
    value = value.buffer;
    if (value.byteLength !== byteLength) {
      if (value.slice) {
        value = value.slice(byteOffset, byteOffset + byteLength);
      } else {
        value = new Uint8Array(value);
        if (value.byteLength !== byteLength) {
          value = Array.prototype.slice.call(value, byteOffset, byteOffset + byteLength);
        }
      }
    }
  } else if (typeof value === "string") {
    return Bufferish$9.from.call(exports, value);
  } else if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }
  return new Uint8Array(value);
}
var bufferishProto = {};
var bufferLite = {};
bufferLite.copy = copy$1;
bufferLite.toString = toString$1;
bufferLite.write = write$1;
function write$1(string, offset) {
  var buffer = this;
  var index = offset || (offset |= 0);
  var length = string.length;
  var chr = 0;
  var i = 0;
  while (i < length) {
    chr = string.charCodeAt(i++);
    if (chr < 128) {
      buffer[index++] = chr;
    } else if (chr < 2048) {
      buffer[index++] = 192 | chr >>> 6;
      buffer[index++] = 128 | chr & 63;
    } else if (chr < 55296 || chr > 57343) {
      buffer[index++] = 224 | chr >>> 12;
      buffer[index++] = 128 | chr >>> 6 & 63;
      buffer[index++] = 128 | chr & 63;
    } else {
      chr = (chr - 55296 << 10 | string.charCodeAt(i++) - 56320) + 65536;
      buffer[index++] = 240 | chr >>> 18;
      buffer[index++] = 128 | chr >>> 12 & 63;
      buffer[index++] = 128 | chr >>> 6 & 63;
      buffer[index++] = 128 | chr & 63;
    }
  }
  return index - offset;
}
function toString$1(encoding, start, end) {
  var buffer = this;
  var index = start | 0;
  if (!end)
    end = buffer.length;
  var string = "";
  var chr = 0;
  while (index < end) {
    chr = buffer[index++];
    if (chr < 128) {
      string += String.fromCharCode(chr);
      continue;
    }
    if ((chr & 224) === 192) {
      chr = (chr & 31) << 6 | buffer[index++] & 63;
    } else if ((chr & 240) === 224) {
      chr = (chr & 15) << 12 | (buffer[index++] & 63) << 6 | buffer[index++] & 63;
    } else if ((chr & 248) === 240) {
      chr = (chr & 7) << 18 | (buffer[index++] & 63) << 12 | (buffer[index++] & 63) << 6 | buffer[index++] & 63;
    }
    if (chr >= 65536) {
      chr -= 65536;
      string += String.fromCharCode((chr >>> 10) + 55296, (chr & 1023) + 56320);
    } else {
      string += String.fromCharCode(chr);
    }
  }
  return string;
}
function copy$1(target, targetStart, start, end) {
  var i;
  if (!start)
    start = 0;
  if (!end && end !== 0)
    end = this.length;
  if (!targetStart)
    targetStart = 0;
  var len = end - start;
  if (target === this && start < targetStart && targetStart < end) {
    for (i = len - 1; i >= 0; i--) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    for (i = 0; i < len; i++) {
      target[i + targetStart] = this[i + start];
    }
  }
  return len;
}
var BufferLite = bufferLite;
bufferishProto.copy = copy;
bufferishProto.slice = slice;
bufferishProto.toString = toString;
bufferishProto.write = gen("write");
var Bufferish$8 = bufferish;
var Buffer$4 = Bufferish$8.global;
var isBufferShim = Bufferish$8.hasBuffer && "TYPED_ARRAY_SUPPORT" in Buffer$4;
var brokenTypedArray = isBufferShim && !Buffer$4.TYPED_ARRAY_SUPPORT;
function copy(target, targetStart, start, end) {
  var thisIsBuffer = Bufferish$8.isBuffer(this);
  var targetIsBuffer = Bufferish$8.isBuffer(target);
  if (thisIsBuffer && targetIsBuffer) {
    return this.copy(target, targetStart, start, end);
  } else if (!brokenTypedArray && !thisIsBuffer && !targetIsBuffer && Bufferish$8.isView(this) && Bufferish$8.isView(target)) {
    var buffer = start || end != null ? slice.call(this, start, end) : this;
    target.set(buffer, targetStart);
    return buffer.length;
  } else {
    return BufferLite.copy.call(this, target, targetStart, start, end);
  }
}
function slice(start, end) {
  var f = this.slice || !brokenTypedArray && this.subarray;
  if (f)
    return f.call(this, start, end);
  var target = Bufferish$8.alloc.call(this, end - start);
  copy.call(this, target, 0, start, end);
  return target;
}
function toString(encoding, start, end) {
  var f = !isBufferShim && Bufferish$8.isBuffer(this) ? this.toString : BufferLite.toString;
  return f.apply(this, arguments);
}
function gen(method) {
  return wrap;
  function wrap() {
    var f = this[method] || BufferLite[method];
    return f.apply(this, arguments);
  }
}
(function(exports2) {
  var Buffer2 = exports2.global = bufferGlobal;
  var hasBuffer = exports2.hasBuffer = Buffer2 && !!Buffer2.isBuffer;
  var hasArrayBuffer = exports2.hasArrayBuffer = typeof ArrayBuffer !== "undefined";
  var isArray = exports2.isArray = isarray;
  exports2.isArrayBuffer = hasArrayBuffer ? isArrayBuffer : _false;
  var isBuffer = exports2.isBuffer = hasBuffer ? Buffer2.isBuffer : _false;
  var isView = exports2.isView = hasArrayBuffer ? ArrayBuffer.isView || _is("ArrayBuffer", "buffer") : _false;
  exports2.alloc = alloc2;
  exports2.concat = concat;
  exports2.from = from2;
  var BufferArray = exports2.Array = bufferishArray.exports;
  var BufferBuffer = exports2.Buffer = bufferishBuffer.exports;
  var BufferUint8Array = exports2.Uint8Array = bufferishUint8array.exports;
  var BufferProto2 = exports2.prototype = bufferishProto;
  function from2(value) {
    if (typeof value === "string") {
      return fromString.call(this, value);
    } else {
      return auto(this).from(value);
    }
  }
  function alloc2(size) {
    return auto(this).alloc(size);
  }
  function concat(list, length) {
    if (!length) {
      length = 0;
      Array.prototype.forEach.call(list, dryrun);
    }
    var ref = this !== exports2 && this || list[0];
    var result = alloc2.call(ref, length);
    var offset = 0;
    Array.prototype.forEach.call(list, append);
    return result;
    function dryrun(buffer) {
      length += buffer.length;
    }
    function append(buffer) {
      offset += BufferProto2.copy.call(buffer, result, offset);
    }
  }
  var _isArrayBuffer = _is("ArrayBuffer");
  function isArrayBuffer(value) {
    return value instanceof ArrayBuffer || _isArrayBuffer(value);
  }
  function fromString(value) {
    var expected = value.length * 3;
    var that = alloc2.call(this, expected);
    var actual = BufferProto2.write.call(that, value);
    if (expected !== actual) {
      that = BufferProto2.slice.call(that, 0, actual);
    }
    return that;
  }
  function auto(that) {
    return isBuffer(that) ? BufferBuffer : isView(that) ? BufferUint8Array : isArray(that) ? BufferArray : hasBuffer ? BufferBuffer : hasArrayBuffer ? BufferUint8Array : BufferArray;
  }
  function _false() {
    return false;
  }
  function _is(name, key) {
    name = "[object " + name + "]";
    return function(value) {
      return value != null && {}.toString.call(key ? value[key] : value) === name;
    };
  }
})(bufferish);
extBuffer.ExtBuffer = ExtBuffer$3;
var Bufferish$7 = bufferish;
function ExtBuffer$3(buffer, type) {
  if (!(this instanceof ExtBuffer$3))
    return new ExtBuffer$3(buffer, type);
  this.buffer = Bufferish$7.from(buffer);
  this.type = type;
}
var extPacker = {};
extPacker.setExtPackers = setExtPackers;
var Bufferish$6 = bufferish;
var Buffer$3 = Bufferish$6.global;
var packTypedArray = Bufferish$6.Uint8Array.from;
var _encode;
var ERROR_COLUMNS$1 = { name: 1, message: 1, stack: 1, columnNumber: 1, fileName: 1, lineNumber: 1 };
function setExtPackers(codec) {
  codec.addExtPacker(14, Error, [packError, encode$2]);
  codec.addExtPacker(1, EvalError, [packError, encode$2]);
  codec.addExtPacker(2, RangeError, [packError, encode$2]);
  codec.addExtPacker(3, ReferenceError, [packError, encode$2]);
  codec.addExtPacker(4, SyntaxError, [packError, encode$2]);
  codec.addExtPacker(5, TypeError, [packError, encode$2]);
  codec.addExtPacker(6, URIError, [packError, encode$2]);
  codec.addExtPacker(10, RegExp, [packRegExp, encode$2]);
  codec.addExtPacker(11, Boolean, [packValueOf, encode$2]);
  codec.addExtPacker(12, String, [packValueOf, encode$2]);
  codec.addExtPacker(13, Date, [Number, encode$2]);
  codec.addExtPacker(15, Number, [packValueOf, encode$2]);
  if (typeof Uint8Array !== "undefined") {
    codec.addExtPacker(17, Int8Array, packTypedArray);
    codec.addExtPacker(18, Uint8Array, packTypedArray);
    codec.addExtPacker(19, Int16Array, packTypedArray);
    codec.addExtPacker(20, Uint16Array, packTypedArray);
    codec.addExtPacker(21, Int32Array, packTypedArray);
    codec.addExtPacker(22, Uint32Array, packTypedArray);
    codec.addExtPacker(23, Float32Array, packTypedArray);
    if (typeof Float64Array !== "undefined") {
      codec.addExtPacker(24, Float64Array, packTypedArray);
    }
    if (typeof Uint8ClampedArray !== "undefined") {
      codec.addExtPacker(25, Uint8ClampedArray, packTypedArray);
    }
    codec.addExtPacker(26, ArrayBuffer, packTypedArray);
    codec.addExtPacker(29, DataView, packTypedArray);
  }
  if (Bufferish$6.hasBuffer) {
    codec.addExtPacker(27, Buffer$3, Bufferish$6.from);
  }
}
function encode$2(input) {
  if (!_encode)
    _encode = encode$3.encode;
  return _encode(input);
}
function packValueOf(value) {
  return value.valueOf();
}
function packRegExp(value) {
  value = RegExp.prototype.toString.call(value).split("/");
  value.shift();
  var out = [value.pop()];
  out.unshift(value.join("/"));
  return out;
}
function packError(value) {
  var out = {};
  for (var key in ERROR_COLUMNS$1) {
    out[key] = value[key];
  }
  return out;
}
var writeType = {};
var int64Buffer = {};
(function(exports2) {
  !function(exports3) {
    var UNDEFINED = "undefined";
    var BUFFER = UNDEFINED !== typeof Buffer && Buffer;
    var UINT8ARRAY = UNDEFINED !== typeof Uint8Array && Uint8Array;
    var ARRAYBUFFER = UNDEFINED !== typeof ArrayBuffer && ArrayBuffer;
    var ZERO = [0, 0, 0, 0, 0, 0, 0, 0];
    var isArray = Array.isArray || _isArray;
    var BIT32 = 4294967296;
    var BIT24 = 16777216;
    var storage;
    factory("Uint64BE", true, true);
    factory("Int64BE", true, false);
    factory("Uint64LE", false, true);
    factory("Int64LE", false, false);
    function factory(name, bigendian, unsigned) {
      var posH = bigendian ? 0 : 4;
      var posL = bigendian ? 4 : 0;
      var pos0 = bigendian ? 0 : 3;
      var pos1 = bigendian ? 1 : 2;
      var pos2 = bigendian ? 2 : 1;
      var pos3 = bigendian ? 3 : 0;
      var fromPositive = bigendian ? fromPositiveBE : fromPositiveLE;
      var fromNegative = bigendian ? fromNegativeBE : fromNegativeLE;
      var proto = Int64.prototype;
      var isName = "is" + name;
      var _isInt64 = "_" + isName;
      proto.buffer = void 0;
      proto.offset = 0;
      proto[_isInt64] = true;
      proto.toNumber = toNumber;
      proto.toString = toString2;
      proto.toJSON = toNumber;
      proto.toArray = toArray;
      if (BUFFER)
        proto.toBuffer = toBuffer;
      if (UINT8ARRAY)
        proto.toArrayBuffer = toArrayBuffer;
      Int64[isName] = isInt64;
      exports3[name] = Int64;
      return Int64;
      function Int64(buffer, offset, value, raddix) {
        if (!(this instanceof Int64))
          return new Int64(buffer, offset, value, raddix);
        return init2(this, buffer, offset, value, raddix);
      }
      function isInt64(b) {
        return !!(b && b[_isInt64]);
      }
      function init2(that, buffer, offset, value, raddix) {
        if (UINT8ARRAY && ARRAYBUFFER) {
          if (buffer instanceof ARRAYBUFFER)
            buffer = new UINT8ARRAY(buffer);
          if (value instanceof ARRAYBUFFER)
            value = new UINT8ARRAY(value);
        }
        if (!buffer && !offset && !value && !storage) {
          that.buffer = newArray(ZERO, 0);
          return;
        }
        if (!isValidBuffer(buffer, offset)) {
          var _storage = storage || Array;
          raddix = offset;
          value = buffer;
          offset = 0;
          buffer = new _storage(8);
        }
        that.buffer = buffer;
        that.offset = offset |= 0;
        if (UNDEFINED === typeof value)
          return;
        if (typeof value === "string") {
          fromString(buffer, offset, value, raddix || 10);
        } else if (isValidBuffer(value, raddix)) {
          fromArray(buffer, offset, value, raddix);
        } else if (typeof raddix === "number") {
          writeInt32(buffer, offset + posH, value);
          writeInt32(buffer, offset + posL, raddix);
        } else if (value > 0) {
          fromPositive(buffer, offset, value);
        } else if (value < 0) {
          fromNegative(buffer, offset, value);
        } else {
          fromArray(buffer, offset, ZERO, 0);
        }
      }
      function fromString(buffer, offset, str2, raddix) {
        var pos = 0;
        var len = str2.length;
        var high = 0;
        var low = 0;
        if (str2[0] === "-")
          pos++;
        var sign = pos;
        while (pos < len) {
          var chr = parseInt(str2[pos++], raddix);
          if (!(chr >= 0))
            break;
          low = low * raddix + chr;
          high = high * raddix + Math.floor(low / BIT32);
          low %= BIT32;
        }
        if (sign) {
          high = ~high;
          if (low) {
            low = BIT32 - low;
          } else {
            high++;
          }
        }
        writeInt32(buffer, offset + posH, high);
        writeInt32(buffer, offset + posL, low);
      }
      function toNumber() {
        var buffer = this.buffer;
        var offset = this.offset;
        var high = readInt32(buffer, offset + posH);
        var low = readInt32(buffer, offset + posL);
        if (!unsigned)
          high |= 0;
        return high ? high * BIT32 + low : low;
      }
      function toString2(radix) {
        var buffer = this.buffer;
        var offset = this.offset;
        var high = readInt32(buffer, offset + posH);
        var low = readInt32(buffer, offset + posL);
        var str2 = "";
        var sign = !unsigned && high & 2147483648;
        if (sign) {
          high = ~high;
          low = BIT32 - low;
        }
        radix = radix || 10;
        while (1) {
          var mod = high % radix * BIT32 + low;
          high = Math.floor(high / radix);
          low = Math.floor(mod / radix);
          str2 = (mod % radix).toString(radix) + str2;
          if (!high && !low)
            break;
        }
        if (sign) {
          str2 = "-" + str2;
        }
        return str2;
      }
      function writeInt32(buffer, offset, value) {
        buffer[offset + pos3] = value & 255;
        value = value >> 8;
        buffer[offset + pos2] = value & 255;
        value = value >> 8;
        buffer[offset + pos1] = value & 255;
        value = value >> 8;
        buffer[offset + pos0] = value & 255;
      }
      function readInt32(buffer, offset) {
        return buffer[offset + pos0] * BIT24 + (buffer[offset + pos1] << 16) + (buffer[offset + pos2] << 8) + buffer[offset + pos3];
      }
    }
    function toArray(raw) {
      var buffer = this.buffer;
      var offset = this.offset;
      storage = null;
      if (raw !== false && offset === 0 && buffer.length === 8 && isArray(buffer))
        return buffer;
      return newArray(buffer, offset);
    }
    function toBuffer(raw) {
      var buffer = this.buffer;
      var offset = this.offset;
      storage = BUFFER;
      if (raw !== false && offset === 0 && buffer.length === 8 && Buffer.isBuffer(buffer))
        return buffer;
      var dest = new BUFFER(8);
      fromArray(dest, 0, buffer, offset);
      return dest;
    }
    function toArrayBuffer(raw) {
      var buffer = this.buffer;
      var offset = this.offset;
      var arrbuf = buffer.buffer;
      storage = UINT8ARRAY;
      if (raw !== false && offset === 0 && arrbuf instanceof ARRAYBUFFER && arrbuf.byteLength === 8)
        return arrbuf;
      var dest = new UINT8ARRAY(8);
      fromArray(dest, 0, buffer, offset);
      return dest.buffer;
    }
    function isValidBuffer(buffer, offset) {
      var len = buffer && buffer.length;
      offset |= 0;
      return len && offset + 8 <= len && typeof buffer[offset] !== "string";
    }
    function fromArray(destbuf, destoff, srcbuf, srcoff) {
      destoff |= 0;
      srcoff |= 0;
      for (var i = 0; i < 8; i++) {
        destbuf[destoff++] = srcbuf[srcoff++] & 255;
      }
    }
    function newArray(buffer, offset) {
      return Array.prototype.slice.call(buffer, offset, offset + 8);
    }
    function fromPositiveBE(buffer, offset, value) {
      var pos = offset + 8;
      while (pos > offset) {
        buffer[--pos] = value & 255;
        value /= 256;
      }
    }
    function fromNegativeBE(buffer, offset, value) {
      var pos = offset + 8;
      value++;
      while (pos > offset) {
        buffer[--pos] = -value & 255 ^ 255;
        value /= 256;
      }
    }
    function fromPositiveLE(buffer, offset, value) {
      var end = offset + 8;
      while (offset < end) {
        buffer[offset++] = value & 255;
        value /= 256;
      }
    }
    function fromNegativeLE(buffer, offset, value) {
      var end = offset + 8;
      value++;
      while (offset < end) {
        buffer[offset++] = -value & 255 ^ 255;
        value /= 256;
      }
    }
    function _isArray(val) {
      return !!val && Object.prototype.toString.call(val) == "[object Array]";
    }
  }(typeof exports2.nodeName !== "string" ? exports2 : commonjsGlobal || {});
})(int64Buffer);
var writeToken = {};
var ieee754$2 = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ieee754$2.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];
  i += d;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
  }
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
  }
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};
ieee754$2.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c2;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);
  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c2 = Math.pow(2, -e)) < 1) {
      e--;
      c2 *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c2;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c2 >= 2) {
      e++;
      c2 /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c2 - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
  }
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
  }
  buffer[offset + i - d] |= s * 128;
};
var writeUint8 = {};
var constant$1 = writeUint8.uint8 = new Array(256);
for (var i = 0; i <= 255; i++) {
  constant$1[i] = write0(i);
}
function write0(type) {
  return function(encoder) {
    var offset = encoder.reserve(1);
    encoder.buffer[offset] = type;
  };
}
var ieee754$1 = ieee754$2;
var Int64Buffer$2 = int64Buffer;
var Uint64BE$2 = Int64Buffer$2.Uint64BE;
var Int64BE$2 = Int64Buffer$2.Int64BE;
var uint8$2 = writeUint8.uint8;
var Bufferish$5 = bufferish;
var Buffer$2 = Bufferish$5.global;
var IS_BUFFER_SHIM = Bufferish$5.hasBuffer && "TYPED_ARRAY_SUPPORT" in Buffer$2;
var NO_TYPED_ARRAY = IS_BUFFER_SHIM && !Buffer$2.TYPED_ARRAY_SUPPORT;
var Buffer_prototype = Bufferish$5.hasBuffer && Buffer$2.prototype || {};
writeToken.getWriteToken = getWriteToken;
function getWriteToken(options) {
  if (options && options.uint8array) {
    return init_uint8array();
  } else if (NO_TYPED_ARRAY || Bufferish$5.hasBuffer && options && options.safe) {
    return init_safe();
  } else {
    return init_token$1();
  }
}
function init_uint8array() {
  var token = init_token$1();
  token[202] = writeN(202, 4, writeFloatBE);
  token[203] = writeN(203, 8, writeDoubleBE);
  return token;
}
function init_token$1() {
  var token = uint8$2.slice();
  token[196] = write1(196);
  token[197] = write2(197);
  token[198] = write4(198);
  token[199] = write1(199);
  token[200] = write2(200);
  token[201] = write4(201);
  token[202] = writeN(202, 4, Buffer_prototype.writeFloatBE || writeFloatBE, true);
  token[203] = writeN(203, 8, Buffer_prototype.writeDoubleBE || writeDoubleBE, true);
  token[204] = write1(204);
  token[205] = write2(205);
  token[206] = write4(206);
  token[207] = writeN(207, 8, writeUInt64BE);
  token[208] = write1(208);
  token[209] = write2(209);
  token[210] = write4(210);
  token[211] = writeN(211, 8, writeInt64BE);
  token[217] = write1(217);
  token[218] = write2(218);
  token[219] = write4(219);
  token[220] = write2(220);
  token[221] = write4(221);
  token[222] = write2(222);
  token[223] = write4(223);
  return token;
}
function init_safe() {
  var token = uint8$2.slice();
  token[196] = writeN(196, 1, Buffer$2.prototype.writeUInt8);
  token[197] = writeN(197, 2, Buffer$2.prototype.writeUInt16BE);
  token[198] = writeN(198, 4, Buffer$2.prototype.writeUInt32BE);
  token[199] = writeN(199, 1, Buffer$2.prototype.writeUInt8);
  token[200] = writeN(200, 2, Buffer$2.prototype.writeUInt16BE);
  token[201] = writeN(201, 4, Buffer$2.prototype.writeUInt32BE);
  token[202] = writeN(202, 4, Buffer$2.prototype.writeFloatBE);
  token[203] = writeN(203, 8, Buffer$2.prototype.writeDoubleBE);
  token[204] = writeN(204, 1, Buffer$2.prototype.writeUInt8);
  token[205] = writeN(205, 2, Buffer$2.prototype.writeUInt16BE);
  token[206] = writeN(206, 4, Buffer$2.prototype.writeUInt32BE);
  token[207] = writeN(207, 8, writeUInt64BE);
  token[208] = writeN(208, 1, Buffer$2.prototype.writeInt8);
  token[209] = writeN(209, 2, Buffer$2.prototype.writeInt16BE);
  token[210] = writeN(210, 4, Buffer$2.prototype.writeInt32BE);
  token[211] = writeN(211, 8, writeInt64BE);
  token[217] = writeN(217, 1, Buffer$2.prototype.writeUInt8);
  token[218] = writeN(218, 2, Buffer$2.prototype.writeUInt16BE);
  token[219] = writeN(219, 4, Buffer$2.prototype.writeUInt32BE);
  token[220] = writeN(220, 2, Buffer$2.prototype.writeUInt16BE);
  token[221] = writeN(221, 4, Buffer$2.prototype.writeUInt32BE);
  token[222] = writeN(222, 2, Buffer$2.prototype.writeUInt16BE);
  token[223] = writeN(223, 4, Buffer$2.prototype.writeUInt32BE);
  return token;
}
function write1(type) {
  return function(encoder, value) {
    var offset = encoder.reserve(2);
    var buffer = encoder.buffer;
    buffer[offset++] = type;
    buffer[offset] = value;
  };
}
function write2(type) {
  return function(encoder, value) {
    var offset = encoder.reserve(3);
    var buffer = encoder.buffer;
    buffer[offset++] = type;
    buffer[offset++] = value >>> 8;
    buffer[offset] = value;
  };
}
function write4(type) {
  return function(encoder, value) {
    var offset = encoder.reserve(5);
    var buffer = encoder.buffer;
    buffer[offset++] = type;
    buffer[offset++] = value >>> 24;
    buffer[offset++] = value >>> 16;
    buffer[offset++] = value >>> 8;
    buffer[offset] = value;
  };
}
function writeN(type, len, method, noAssert) {
  return function(encoder, value) {
    var offset = encoder.reserve(len + 1);
    encoder.buffer[offset++] = type;
    method.call(encoder.buffer, value, offset, noAssert);
  };
}
function writeUInt64BE(value, offset) {
  new Uint64BE$2(this, offset, value);
}
function writeInt64BE(value, offset) {
  new Int64BE$2(this, offset, value);
}
function writeFloatBE(value, offset) {
  ieee754$1.write(this, value, offset, false, 23, 4);
}
function writeDoubleBE(value, offset) {
  ieee754$1.write(this, value, offset, false, 52, 8);
}
var IS_ARRAY$1 = isarray;
var Int64Buffer$1 = int64Buffer;
var Uint64BE$1 = Int64Buffer$1.Uint64BE;
var Int64BE$1 = Int64Buffer$1.Int64BE;
var Bufferish$4 = bufferish;
var BufferProto$1 = bufferishProto;
var WriteToken = writeToken;
var uint8$1 = writeUint8.uint8;
var ExtBuffer$2 = extBuffer.ExtBuffer;
var HAS_UINT8ARRAY = typeof Uint8Array !== "undefined";
var HAS_MAP$1 = typeof Map !== "undefined";
var extmap = [];
extmap[1] = 212;
extmap[2] = 213;
extmap[4] = 214;
extmap[8] = 215;
extmap[16] = 216;
writeType.getWriteType = getWriteType;
function getWriteType(options) {
  var token = WriteToken.getWriteToken(options);
  var useraw = options && options.useraw;
  var binarraybuffer = HAS_UINT8ARRAY && options && options.binarraybuffer;
  var isBuffer = binarraybuffer ? Bufferish$4.isArrayBuffer : Bufferish$4.isBuffer;
  var bin = binarraybuffer ? bin_arraybuffer2 : bin_buffer2;
  var usemap = HAS_MAP$1 && options && options.usemap;
  var map = usemap ? map_to_map2 : obj_to_map;
  var writeType2 = {
    "boolean": bool,
    "function": nil,
    "number": number,
    "object": useraw ? object_raw : object,
    "string": _string(useraw ? raw_head_size : str_head_size),
    "symbol": nil,
    "undefined": nil
  };
  return writeType2;
  function bool(encoder, value) {
    var type = value ? 195 : 194;
    token[type](encoder, value);
  }
  function number(encoder, value) {
    var ivalue = value | 0;
    var type;
    if (value !== ivalue) {
      type = 203;
      token[type](encoder, value);
      return;
    } else if (-32 <= ivalue && ivalue <= 127) {
      type = ivalue & 255;
    } else if (0 <= ivalue) {
      type = ivalue <= 255 ? 204 : ivalue <= 65535 ? 205 : 206;
    } else {
      type = -128 <= ivalue ? 208 : -32768 <= ivalue ? 209 : 210;
    }
    token[type](encoder, ivalue);
  }
  function uint64(encoder, value) {
    var type = 207;
    token[type](encoder, value.toArray());
  }
  function int64(encoder, value) {
    var type = 211;
    token[type](encoder, value.toArray());
  }
  function str_head_size(length) {
    return length < 32 ? 1 : length <= 255 ? 2 : length <= 65535 ? 3 : 5;
  }
  function raw_head_size(length) {
    return length < 32 ? 1 : length <= 65535 ? 3 : 5;
  }
  function _string(head_size) {
    return string;
    function string(encoder, value) {
      var length = value.length;
      var maxsize = 5 + length * 3;
      encoder.offset = encoder.reserve(maxsize);
      var buffer = encoder.buffer;
      var expected = head_size(length);
      var start = encoder.offset + expected;
      length = BufferProto$1.write.call(buffer, value, start);
      var actual = head_size(length);
      if (expected !== actual) {
        var targetStart = start + actual - expected;
        var end = start + length;
        BufferProto$1.copy.call(buffer, buffer, targetStart, start, end);
      }
      var type = actual === 1 ? 160 + length : actual <= 3 ? 215 + actual : 219;
      token[type](encoder, length);
      encoder.offset += length;
    }
  }
  function object(encoder, value) {
    if (value === null)
      return nil(encoder, value);
    if (isBuffer(value))
      return bin(encoder, value);
    if (IS_ARRAY$1(value))
      return array2(encoder, value);
    if (Uint64BE$1.isUint64BE(value))
      return uint64(encoder, value);
    if (Int64BE$1.isInt64BE(value))
      return int64(encoder, value);
    var packer = encoder.codec.getExtPacker(value);
    if (packer)
      value = packer(value);
    if (value instanceof ExtBuffer$2)
      return ext2(encoder, value);
    map(encoder, value);
  }
  function object_raw(encoder, value) {
    if (isBuffer(value))
      return raw(encoder, value);
    object(encoder, value);
  }
  function nil(encoder, value) {
    var type = 192;
    token[type](encoder, value);
  }
  function array2(encoder, value) {
    var length = value.length;
    var type = length < 16 ? 144 + length : length <= 65535 ? 220 : 221;
    token[type](encoder, length);
    var encode2 = encoder.codec.encode;
    for (var i = 0; i < length; i++) {
      encode2(encoder, value[i]);
    }
  }
  function bin_buffer2(encoder, value) {
    var length = value.length;
    var type = length < 255 ? 196 : length <= 65535 ? 197 : 198;
    token[type](encoder, length);
    encoder.send(value);
  }
  function bin_arraybuffer2(encoder, value) {
    bin_buffer2(encoder, new Uint8Array(value));
  }
  function ext2(encoder, value) {
    var buffer = value.buffer;
    var length = buffer.length;
    var type = extmap[length] || (length < 255 ? 199 : length <= 65535 ? 200 : 201);
    token[type](encoder, length);
    uint8$1[value.type](encoder);
    encoder.send(buffer);
  }
  function obj_to_map(encoder, value) {
    var keys = Object.keys(value);
    var length = keys.length;
    var type = length < 16 ? 128 + length : length <= 65535 ? 222 : 223;
    token[type](encoder, length);
    var encode2 = encoder.codec.encode;
    keys.forEach(function(key) {
      encode2(encoder, key);
      encode2(encoder, value[key]);
    });
  }
  function map_to_map2(encoder, value) {
    if (!(value instanceof Map))
      return obj_to_map(encoder, value);
    var length = value.size;
    var type = length < 16 ? 128 + length : length <= 65535 ? 222 : 223;
    token[type](encoder, length);
    var encode2 = encoder.codec.encode;
    value.forEach(function(val, key, m) {
      encode2(encoder, key);
      encode2(encoder, val);
    });
  }
  function raw(encoder, value) {
    var length = value.length;
    var type = length < 32 ? 160 + length : length <= 65535 ? 218 : 219;
    token[type](encoder, length);
    encoder.send(value);
  }
}
var codecBase = {};
var IS_ARRAY = isarray;
codecBase.createCodec = createCodec;
codecBase.install = install;
codecBase.filter = filter;
var Bufferish$3 = bufferish;
function Codec(options) {
  if (!(this instanceof Codec))
    return new Codec(options);
  this.options = options;
  this.init();
}
Codec.prototype.init = function() {
  var options = this.options;
  if (options && options.uint8array) {
    this.bufferish = Bufferish$3.Uint8Array;
  }
  return this;
};
function install(props) {
  for (var key in props) {
    Codec.prototype[key] = add(Codec.prototype[key], props[key]);
  }
}
function add(a, b) {
  return a && b ? ab : a || b;
  function ab() {
    a.apply(this, arguments);
    return b.apply(this, arguments);
  }
}
function join(filters) {
  filters = filters.slice();
  return function(value) {
    return filters.reduce(iterator, value);
  };
  function iterator(value, filter2) {
    return filter2(value);
  }
}
function filter(filter2) {
  return IS_ARRAY(filter2) ? join(filter2) : filter2;
}
function createCodec(options) {
  return new Codec(options);
}
codecBase.preset = createCodec({ preset: true });
var ExtBuffer$1 = extBuffer.ExtBuffer;
var ExtPacker = extPacker;
var WriteType = writeType;
var CodecBase$1 = codecBase;
CodecBase$1.install({
  addExtPacker,
  getExtPacker,
  init: init$1
});
writeCore.preset = init$1.call(CodecBase$1.preset);
function getEncoder(options) {
  var writeType2 = WriteType.getWriteType(options);
  return encode2;
  function encode2(encoder, value) {
    var func = writeType2[typeof value];
    if (!func)
      throw new Error('Unsupported type "' + typeof value + '": ' + value);
    func(encoder, value);
  }
}
function init$1() {
  var options = this.options;
  this.encode = getEncoder(options);
  if (options && options.preset) {
    ExtPacker.setExtPackers(this);
  }
  return this;
}
function addExtPacker(etype, Class, packer) {
  packer = CodecBase$1.filter(packer);
  var name = Class.name;
  if (name && name !== "Object") {
    var packers = this.extPackers || (this.extPackers = {});
    packers[name] = extPacker2;
  } else {
    var list = this.extEncoderList || (this.extEncoderList = []);
    list.unshift([Class, extPacker2]);
  }
  function extPacker2(value) {
    if (packer)
      value = packer(value);
    return new ExtBuffer$1(value, etype);
  }
}
function getExtPacker(value) {
  var packers = this.extPackers || (this.extPackers = {});
  var c2 = value.constructor;
  var e = c2 && c2.name && packers[c2.name];
  if (e)
    return e;
  var list = this.extEncoderList || (this.extEncoderList = []);
  var len = list.length;
  for (var i = 0; i < len; i++) {
    var pair = list[i];
    if (c2 === pair[0])
      return pair[1];
  }
}
var flexBuffer = {};
flexBuffer.FlexDecoder = FlexDecoder$1;
flexBuffer.FlexEncoder = FlexEncoder$1;
var Bufferish$2 = bufferish;
var MIN_BUFFER_SIZE = 2048;
var MAX_BUFFER_SIZE = 65536;
var BUFFER_SHORTAGE = "BUFFER_SHORTAGE";
function FlexDecoder$1() {
  if (!(this instanceof FlexDecoder$1))
    return new FlexDecoder$1();
}
function FlexEncoder$1() {
  if (!(this instanceof FlexEncoder$1))
    return new FlexEncoder$1();
}
FlexDecoder$1.mixin = mixinFactory(getDecoderMethods());
FlexDecoder$1.mixin(FlexDecoder$1.prototype);
FlexEncoder$1.mixin = mixinFactory(getEncoderMethods());
FlexEncoder$1.mixin(FlexEncoder$1.prototype);
function getDecoderMethods() {
  return {
    bufferish: Bufferish$2,
    write: write3,
    fetch,
    flush,
    push,
    pull,
    read: read$1,
    reserve,
    offset: 0
  };
  function write3(chunk) {
    var prev = this.offset ? Bufferish$2.prototype.slice.call(this.buffer, this.offset) : this.buffer;
    this.buffer = prev ? chunk ? this.bufferish.concat([prev, chunk]) : prev : chunk;
    this.offset = 0;
  }
  function flush() {
    while (this.offset < this.buffer.length) {
      var start = this.offset;
      var value;
      try {
        value = this.fetch();
      } catch (e) {
        if (e && e.message != BUFFER_SHORTAGE)
          throw e;
        this.offset = start;
        break;
      }
      this.push(value);
    }
  }
  function reserve(length) {
    var start = this.offset;
    var end = start + length;
    if (end > this.buffer.length)
      throw new Error(BUFFER_SHORTAGE);
    this.offset = end;
    return start;
  }
}
function getEncoderMethods() {
  return {
    bufferish: Bufferish$2,
    write,
    fetch: fetch2,
    flush,
    push,
    pull: pull2,
    read: read$1,
    reserve,
    send,
    maxBufferSize: MAX_BUFFER_SIZE,
    minBufferSize: MIN_BUFFER_SIZE,
    offset: 0,
    start: 0
  };
  function fetch2() {
    var start = this.start;
    if (start < this.offset) {
      var end = this.start = this.offset;
      return Bufferish$2.prototype.slice.call(this.buffer, start, end);
    }
  }
  function flush() {
    while (this.start < this.offset) {
      var value = this.fetch();
      if (value)
        this.push(value);
    }
  }
  function pull2() {
    var buffers = this.buffers || (this.buffers = []);
    var chunk = buffers.length > 1 ? this.bufferish.concat(buffers) : buffers[0];
    buffers.length = 0;
    return chunk;
  }
  function reserve(length) {
    var req = length | 0;
    if (this.buffer) {
      var size = this.buffer.length;
      var start = this.offset | 0;
      var end = start + req;
      if (end < size) {
        this.offset = end;
        return start;
      }
      this.flush();
      length = Math.max(length, Math.min(size * 2, this.maxBufferSize));
    }
    length = Math.max(length, this.minBufferSize);
    this.buffer = this.bufferish.alloc(length);
    this.start = 0;
    this.offset = req;
    return 0;
  }
  function send(buffer) {
    var length = buffer.length;
    if (length > this.minBufferSize) {
      this.flush();
      this.push(buffer);
    } else {
      var offset = this.reserve(length);
      Bufferish$2.prototype.copy.call(buffer, this.buffer, offset);
    }
  }
}
function write() {
  throw new Error("method not implemented: write()");
}
function fetch() {
  throw new Error("method not implemented: fetch()");
}
function read$1() {
  var length = this.buffers && this.buffers.length;
  if (!length)
    return this.fetch();
  this.flush();
  return this.pull();
}
function push(chunk) {
  var buffers = this.buffers || (this.buffers = []);
  buffers.push(chunk);
}
function pull() {
  var buffers = this.buffers || (this.buffers = []);
  return buffers.shift();
}
function mixinFactory(source) {
  return mixin;
  function mixin(target) {
    for (var key in source) {
      target[key] = source[key];
    }
    return target;
  }
}
encodeBuffer.EncodeBuffer = EncodeBuffer$2;
var preset$1 = writeCore.preset;
var FlexEncoder = flexBuffer.FlexEncoder;
FlexEncoder.mixin(EncodeBuffer$2.prototype);
function EncodeBuffer$2(options) {
  if (!(this instanceof EncodeBuffer$2))
    return new EncodeBuffer$2(options);
  if (options) {
    this.options = options;
    if (options.codec) {
      var codec = this.codec = options.codec;
      if (codec.bufferish)
        this.bufferish = codec.bufferish;
    }
  }
}
EncodeBuffer$2.prototype.codec = preset$1;
EncodeBuffer$2.prototype.write = function(input) {
  this.codec.encode(this, input);
};
encode$3.encode = encode$1;
var EncodeBuffer$1 = encodeBuffer.EncodeBuffer;
function encode$1(input, options) {
  var encoder = new EncodeBuffer$1(options);
  encoder.write(input);
  return encoder.read();
}
var decode$3 = {};
var decodeBuffer = {};
var readCore = {};
var extUnpacker = {};
extUnpacker.setExtUnpackers = setExtUnpackers;
var Bufferish$1 = bufferish;
var Buffer$1 = Bufferish$1.global;
var _decode;
var ERROR_COLUMNS = { name: 1, message: 1, stack: 1, columnNumber: 1, fileName: 1, lineNumber: 1 };
function setExtUnpackers(codec) {
  codec.addExtUnpacker(14, [decode$2, unpackError(Error)]);
  codec.addExtUnpacker(1, [decode$2, unpackError(EvalError)]);
  codec.addExtUnpacker(2, [decode$2, unpackError(RangeError)]);
  codec.addExtUnpacker(3, [decode$2, unpackError(ReferenceError)]);
  codec.addExtUnpacker(4, [decode$2, unpackError(SyntaxError)]);
  codec.addExtUnpacker(5, [decode$2, unpackError(TypeError)]);
  codec.addExtUnpacker(6, [decode$2, unpackError(URIError)]);
  codec.addExtUnpacker(10, [decode$2, unpackRegExp]);
  codec.addExtUnpacker(11, [decode$2, unpackClass(Boolean)]);
  codec.addExtUnpacker(12, [decode$2, unpackClass(String)]);
  codec.addExtUnpacker(13, [decode$2, unpackClass(Date)]);
  codec.addExtUnpacker(15, [decode$2, unpackClass(Number)]);
  if (typeof Uint8Array !== "undefined") {
    codec.addExtUnpacker(17, unpackClass(Int8Array));
    codec.addExtUnpacker(18, unpackClass(Uint8Array));
    codec.addExtUnpacker(19, [unpackArrayBuffer, unpackClass(Int16Array)]);
    codec.addExtUnpacker(20, [unpackArrayBuffer, unpackClass(Uint16Array)]);
    codec.addExtUnpacker(21, [unpackArrayBuffer, unpackClass(Int32Array)]);
    codec.addExtUnpacker(22, [unpackArrayBuffer, unpackClass(Uint32Array)]);
    codec.addExtUnpacker(23, [unpackArrayBuffer, unpackClass(Float32Array)]);
    if (typeof Float64Array !== "undefined") {
      codec.addExtUnpacker(24, [unpackArrayBuffer, unpackClass(Float64Array)]);
    }
    if (typeof Uint8ClampedArray !== "undefined") {
      codec.addExtUnpacker(25, unpackClass(Uint8ClampedArray));
    }
    codec.addExtUnpacker(26, unpackArrayBuffer);
    codec.addExtUnpacker(29, [unpackArrayBuffer, unpackClass(DataView)]);
  }
  if (Bufferish$1.hasBuffer) {
    codec.addExtUnpacker(27, unpackClass(Buffer$1));
  }
}
function decode$2(input) {
  if (!_decode)
    _decode = decode$3.decode;
  return _decode(input);
}
function unpackRegExp(value) {
  return RegExp.apply(null, value);
}
function unpackError(Class) {
  return function(value) {
    var out = new Class();
    for (var key in ERROR_COLUMNS) {
      out[key] = value[key];
    }
    return out;
  };
}
function unpackClass(Class) {
  return function(value) {
    return new Class(value);
  };
}
function unpackArrayBuffer(value) {
  return new Uint8Array(value).buffer;
}
var readFormat = {};
var ieee754 = ieee754$2;
var Int64Buffer = int64Buffer;
var Uint64BE = Int64Buffer.Uint64BE;
var Int64BE = Int64Buffer.Int64BE;
readFormat.getReadFormat = getReadFormat;
readFormat.readUint8 = uint8;
var Bufferish = bufferish;
var BufferProto = bufferishProto;
var HAS_MAP = typeof Map !== "undefined";
var NO_ASSERT = true;
function getReadFormat(options) {
  var binarraybuffer = Bufferish.hasArrayBuffer && options && options.binarraybuffer;
  var int64 = options && options.int64;
  var usemap = HAS_MAP && options && options.usemap;
  var readFormat2 = {
    map: usemap ? map_to_map : map_to_obj,
    array,
    str,
    bin: binarraybuffer ? bin_arraybuffer : bin_buffer,
    ext,
    uint8,
    uint16,
    uint32,
    uint64: read(8, int64 ? readUInt64BE_int64 : readUInt64BE),
    int8,
    int16,
    int32,
    int64: read(8, int64 ? readInt64BE_int64 : readInt64BE),
    float32: read(4, readFloatBE),
    float64: read(8, readDoubleBE)
  };
  return readFormat2;
}
function map_to_obj(decoder, len) {
  var value = {};
  var i;
  var k = new Array(len);
  var v = new Array(len);
  var decode2 = decoder.codec.decode;
  for (i = 0; i < len; i++) {
    k[i] = decode2(decoder);
    v[i] = decode2(decoder);
  }
  for (i = 0; i < len; i++) {
    value[k[i]] = v[i];
  }
  return value;
}
function map_to_map(decoder, len) {
  var value = /* @__PURE__ */ new Map();
  var i;
  var k = new Array(len);
  var v = new Array(len);
  var decode2 = decoder.codec.decode;
  for (i = 0; i < len; i++) {
    k[i] = decode2(decoder);
    v[i] = decode2(decoder);
  }
  for (i = 0; i < len; i++) {
    value.set(k[i], v[i]);
  }
  return value;
}
function array(decoder, len) {
  var value = new Array(len);
  var decode2 = decoder.codec.decode;
  for (var i = 0; i < len; i++) {
    value[i] = decode2(decoder);
  }
  return value;
}
function str(decoder, len) {
  var start = decoder.reserve(len);
  var end = start + len;
  return BufferProto.toString.call(decoder.buffer, "utf-8", start, end);
}
function bin_buffer(decoder, len) {
  var start = decoder.reserve(len);
  var end = start + len;
  var buf = BufferProto.slice.call(decoder.buffer, start, end);
  return Bufferish.from(buf);
}
function bin_arraybuffer(decoder, len) {
  var start = decoder.reserve(len);
  var end = start + len;
  var buf = BufferProto.slice.call(decoder.buffer, start, end);
  return Bufferish.Uint8Array.from(buf).buffer;
}
function ext(decoder, len) {
  var start = decoder.reserve(len + 1);
  var type = decoder.buffer[start++];
  var end = start + len;
  var unpack = decoder.codec.getExtUnpacker(type);
  if (!unpack)
    throw new Error("Invalid ext type: " + (type ? "0x" + type.toString(16) : type));
  var buf = BufferProto.slice.call(decoder.buffer, start, end);
  return unpack(buf);
}
function uint8(decoder) {
  var start = decoder.reserve(1);
  return decoder.buffer[start];
}
function int8(decoder) {
  var start = decoder.reserve(1);
  var value = decoder.buffer[start];
  return value & 128 ? value - 256 : value;
}
function uint16(decoder) {
  var start = decoder.reserve(2);
  var buffer = decoder.buffer;
  return buffer[start++] << 8 | buffer[start];
}
function int16(decoder) {
  var start = decoder.reserve(2);
  var buffer = decoder.buffer;
  var value = buffer[start++] << 8 | buffer[start];
  return value & 32768 ? value - 65536 : value;
}
function uint32(decoder) {
  var start = decoder.reserve(4);
  var buffer = decoder.buffer;
  return buffer[start++] * 16777216 + (buffer[start++] << 16) + (buffer[start++] << 8) + buffer[start];
}
function int32(decoder) {
  var start = decoder.reserve(4);
  var buffer = decoder.buffer;
  return buffer[start++] << 24 | buffer[start++] << 16 | buffer[start++] << 8 | buffer[start];
}
function read(len, method) {
  return function(decoder) {
    var start = decoder.reserve(len);
    return method.call(decoder.buffer, start, NO_ASSERT);
  };
}
function readUInt64BE(start) {
  return new Uint64BE(this, start).toNumber();
}
function readInt64BE(start) {
  return new Int64BE(this, start).toNumber();
}
function readUInt64BE_int64(start) {
  return new Uint64BE(this, start);
}
function readInt64BE_int64(start) {
  return new Int64BE(this, start);
}
function readFloatBE(start) {
  return ieee754.read(this, start, false, 23, 4);
}
function readDoubleBE(start) {
  return ieee754.read(this, start, false, 52, 8);
}
var readToken = {};
var ReadFormat = readFormat;
readToken.getReadToken = getReadToken;
function getReadToken(options) {
  var format = ReadFormat.getReadFormat(options);
  if (options && options.useraw) {
    return init_useraw(format);
  } else {
    return init_token(format);
  }
}
function init_token(format) {
  var i;
  var token = new Array(256);
  for (i = 0; i <= 127; i++) {
    token[i] = constant(i);
  }
  for (i = 128; i <= 143; i++) {
    token[i] = fix(i - 128, format.map);
  }
  for (i = 144; i <= 159; i++) {
    token[i] = fix(i - 144, format.array);
  }
  for (i = 160; i <= 191; i++) {
    token[i] = fix(i - 160, format.str);
  }
  token[192] = constant(null);
  token[193] = null;
  token[194] = constant(false);
  token[195] = constant(true);
  token[196] = flex(format.uint8, format.bin);
  token[197] = flex(format.uint16, format.bin);
  token[198] = flex(format.uint32, format.bin);
  token[199] = flex(format.uint8, format.ext);
  token[200] = flex(format.uint16, format.ext);
  token[201] = flex(format.uint32, format.ext);
  token[202] = format.float32;
  token[203] = format.float64;
  token[204] = format.uint8;
  token[205] = format.uint16;
  token[206] = format.uint32;
  token[207] = format.uint64;
  token[208] = format.int8;
  token[209] = format.int16;
  token[210] = format.int32;
  token[211] = format.int64;
  token[212] = fix(1, format.ext);
  token[213] = fix(2, format.ext);
  token[214] = fix(4, format.ext);
  token[215] = fix(8, format.ext);
  token[216] = fix(16, format.ext);
  token[217] = flex(format.uint8, format.str);
  token[218] = flex(format.uint16, format.str);
  token[219] = flex(format.uint32, format.str);
  token[220] = flex(format.uint16, format.array);
  token[221] = flex(format.uint32, format.array);
  token[222] = flex(format.uint16, format.map);
  token[223] = flex(format.uint32, format.map);
  for (i = 224; i <= 255; i++) {
    token[i] = constant(i - 256);
  }
  return token;
}
function init_useraw(format) {
  var i;
  var token = init_token(format).slice();
  token[217] = token[196];
  token[218] = token[197];
  token[219] = token[198];
  for (i = 160; i <= 191; i++) {
    token[i] = fix(i - 160, format.bin);
  }
  return token;
}
function constant(value) {
  return function() {
    return value;
  };
}
function flex(lenFunc, decodeFunc) {
  return function(decoder) {
    var len = lenFunc(decoder);
    return decodeFunc(decoder, len);
  };
}
function fix(len, method) {
  return function(decoder) {
    return method(decoder, len);
  };
}
var ExtBuffer = extBuffer.ExtBuffer;
var ExtUnpacker = extUnpacker;
var readUint8 = readFormat.readUint8;
var ReadToken = readToken;
var CodecBase = codecBase;
CodecBase.install({
  addExtUnpacker,
  getExtUnpacker,
  init
});
readCore.preset = init.call(CodecBase.preset);
function getDecoder(options) {
  var readToken2 = ReadToken.getReadToken(options);
  return decode2;
  function decode2(decoder) {
    var type = readUint8(decoder);
    var func = readToken2[type];
    if (!func)
      throw new Error("Invalid type: " + (type ? "0x" + type.toString(16) : type));
    return func(decoder);
  }
}
function init() {
  var options = this.options;
  this.decode = getDecoder(options);
  if (options && options.preset) {
    ExtUnpacker.setExtUnpackers(this);
  }
  return this;
}
function addExtUnpacker(etype, unpacker) {
  var unpackers = this.extUnpackers || (this.extUnpackers = []);
  unpackers[etype] = CodecBase.filter(unpacker);
}
function getExtUnpacker(type) {
  var unpackers = this.extUnpackers || (this.extUnpackers = []);
  return unpackers[type] || extUnpacker2;
  function extUnpacker2(buffer) {
    return new ExtBuffer(buffer, type);
  }
}
decodeBuffer.DecodeBuffer = DecodeBuffer$2;
var preset = readCore.preset;
var FlexDecoder = flexBuffer.FlexDecoder;
FlexDecoder.mixin(DecodeBuffer$2.prototype);
function DecodeBuffer$2(options) {
  if (!(this instanceof DecodeBuffer$2))
    return new DecodeBuffer$2(options);
  if (options) {
    this.options = options;
    if (options.codec) {
      var codec = this.codec = options.codec;
      if (codec.bufferish)
        this.bufferish = codec.bufferish;
    }
  }
}
DecodeBuffer$2.prototype.codec = preset;
DecodeBuffer$2.prototype.fetch = function() {
  return this.codec.decode(this);
};
decode$3.decode = decode$1;
var DecodeBuffer$1 = decodeBuffer.DecodeBuffer;
function decode$1(input, options) {
  var decoder = new DecodeBuffer$1(options);
  decoder.write(input);
  return decoder.read();
}
var eventLite = { exports: {} };
/**
 * event-lite.js - Light-weight EventEmitter (less than 1KB when gzipped)
 *
 * @copyright Yusuke Kawasaki
 * @license MIT
 * @constructor
 * @see https://github.com/kawanet/event-lite
 * @see http://kawanet.github.io/event-lite/EventLite.html
 * @example
 * var EventLite = require("event-lite");
 *
 * function MyClass() {...}             // your class
 *
 * EventLite.mixin(MyClass.prototype);  // import event methods
 *
 * var obj = new MyClass();
 * obj.on("foo", function() {...});     // add event listener
 * obj.once("bar", function() {...});   // add one-time event listener
 * obj.emit("foo");                     // dispatch event
 * obj.emit("bar");                     // dispatch another event
 * obj.off("foo");                      // remove event listener
 */
(function(module) {
  function EventLite2() {
    if (!(this instanceof EventLite2))
      return new EventLite2();
  }
  (function(EventLite3) {
    module.exports = EventLite3;
    var LISTENERS = "listeners";
    var methods = {
      on,
      once,
      off,
      emit
    };
    mixin(EventLite3.prototype);
    EventLite3.mixin = mixin;
    function mixin(target) {
      for (var key in methods) {
        target[key] = methods[key];
      }
      return target;
    }
    function on(type, func) {
      getListeners(this, type).push(func);
      return this;
    }
    function once(type, func) {
      var that = this;
      wrap.originalListener = func;
      getListeners(that, type).push(wrap);
      return that;
      function wrap() {
        off.call(that, type, wrap);
        func.apply(this, arguments);
      }
    }
    function off(type, func) {
      var that = this;
      var listners;
      if (!arguments.length) {
        delete that[LISTENERS];
      } else if (!func) {
        listners = that[LISTENERS];
        if (listners) {
          delete listners[type];
          if (!Object.keys(listners).length)
            return off.call(that);
        }
      } else {
        listners = getListeners(that, type, true);
        if (listners) {
          listners = listners.filter(ne);
          if (!listners.length)
            return off.call(that, type);
          that[LISTENERS][type] = listners;
        }
      }
      return that;
      function ne(test) {
        return test !== func && test.originalListener !== func;
      }
    }
    function emit(type, value) {
      var that = this;
      var listeners = getListeners(that, type, true);
      if (!listeners)
        return false;
      var arglen = arguments.length;
      if (arglen === 1) {
        listeners.forEach(zeroarg);
      } else if (arglen === 2) {
        listeners.forEach(onearg);
      } else {
        var args = Array.prototype.slice.call(arguments, 1);
        listeners.forEach(moreargs);
      }
      return !!listeners.length;
      function zeroarg(func) {
        func.call(that);
      }
      function onearg(func) {
        func.call(that, value);
      }
      function moreargs(func) {
        func.apply(that, args);
      }
    }
    function getListeners(that, type, readonly) {
      if (readonly && !that[LISTENERS])
        return;
      var listeners = that[LISTENERS] || (that[LISTENERS] = {});
      return listeners[type] || (listeners[type] = []);
    }
  })(EventLite2);
})(eventLite);
var EventLite$1 = eventLite.exports;
var EncodeBuffer = encodeBuffer.EncodeBuffer;
function Encoder(options) {
  if (!(this instanceof Encoder))
    return new Encoder(options);
  EncodeBuffer.call(this, options);
}
Encoder.prototype = new EncodeBuffer();
EventLite$1.mixin(Encoder.prototype);
Encoder.prototype.encode = function(chunk) {
  this.write(chunk);
  this.emit("data", this.read());
};
Encoder.prototype.end = function(chunk) {
  if (arguments.length)
    this.encode(chunk);
  this.flush();
  this.emit("end");
};
var EventLite = eventLite.exports;
var DecodeBuffer = decodeBuffer.DecodeBuffer;
function Decoder(options) {
  if (!(this instanceof Decoder))
    return new Decoder(options);
  DecodeBuffer.call(this, options);
}
Decoder.prototype = new DecodeBuffer();
EventLite.mixin(Decoder.prototype);
Decoder.prototype.decode = function(chunk) {
  if (arguments.length)
    this.write(chunk);
  this.flush();
};
Decoder.prototype.push = function(chunk) {
  this.emit("data", chunk);
};
Decoder.prototype.end = function(chunk) {
  this.decode(chunk);
  this.emit("end");
};
({
  preset: codecBase.preset
});
var encode = encode$3.encode;
var decode = decode$3.decode;
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
    const that = this;
    if (dynws) {
      Object.defineProperty(WebSocket.prototype, "hiddenSend", {
        value: WebSocket.prototype.send
      });
      Object.defineProperty(WebSocket.prototype, "send", {
        value: function(m) {
          if (that.socket == null)
            that.socket = this;
          const packEv = new PacketSendEvent(decode(new Uint8Array(m)));
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
            const packEv = new PacketSendEvent(decode(new Uint8Array(m)));
            that.emit("packetSend", packEv);
            if (packEv.isCanceled)
              return;
            if (packEv.type == C2SPacketType.SPAWN)
              that.alive = true;
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
      const packEvt = new PacketReceiveEvent(decode(new Uint8Array(m.data)));
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
        case S2CPacketType.REMOVE_OBJECT:
          this.emit("removeObject", new ObjectRemoveEvent(this.gameObjects[payload[0]], ObjectRemoveReason.BUILDINGBREAK));
          delete this.gameObjects[payload[0]];
          break;
        case S2CPacketType.REMOVE_ALL_OBJECTS:
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
    (_a = this.socket) == null ? void 0 : _a.send(encode(packet));
  }
  sendBasic(t, ...payload) {
    this.sendRaw([t, payload]);
  }
  sendHidden(t, ...payload) {
    var sock = this.socket;
    sock == null ? void 0 : sock.hiddenSend(encode([t, payload]));
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
  toggleAutoFire() {
    this.sendBasic(C2SPacketType.AUTO_ATTACK, 1);
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
    this.sendBasic(C2SPacketType.CHAT, text);
  }
  removeProjectile(projectileSid) {
    for (let i = 0; i < this.projectiles.length; i++) {
      if (this.projectiles[i].sid == projectileSid) {
        this.emit("removeProjectile", new ProjectileRemoveEvent(this.projectiles[i]));
        this.projectiles.splice(i, 1);
      }
    }
  }
}
MooMooAPI.SkinColours = SkinColours;
MooMooAPI.C2SPacketType = C2SPacketType;
MooMooAPI.S2CPacketType = S2CPacketType;
MooMooAPI.ObjectRemoveReason = ObjectRemoveReason;
MooMooAPI.ItemIds = ItemIds;
MooMooAPI.WeaponIds = WeaponIds;
MooMooAPI.Repeater = Repeater;
MooMooAPI.HatIds = HatIds;
MooMooAPI.AccessoryIds = AccessoryIds;
Object.defineProperty(window, "MooMooAPI", {
  value: MooMooAPI
});
export { MooMooAPI };
