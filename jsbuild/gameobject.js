import { Pos } from "@mathrandom7910/pos";
export class GameObject extends Pos {
    constructor(id, x, y, dir, scale, type, buildType, ownerSid) {
        super(x, y);
        this.id = id;
        this.dir = dir;
        this.scale = scale;
        this.type = type;
        this.buildType = buildType;
        this.ownerSid = ownerSid;
    }
}
/**
 * Reason an object was removed from the game
 */
export var ObjectRemoveReason;
(function (ObjectRemoveReason) {
    ObjectRemoveReason[ObjectRemoveReason["PLAYERLEAVE"] = 0] = "PLAYERLEAVE";
    ObjectRemoveReason[ObjectRemoveReason["BUILDINGBREAK"] = 1] = "BUILDINGBREAK";
})(ObjectRemoveReason || (ObjectRemoveReason = {}));
//# sourceMappingURL=gameobject.js.map