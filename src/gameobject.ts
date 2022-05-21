export interface IObject {
    id: number,
    x: number,
    y: number,
    dir: number,
    scale: number,
    type: number,
    buildType: number,
    ownerSid: number
}

export enum ObjectRemoveReason {
    PLAYERLEAVE,
    BUILDINGBREAK
}