import * as msgpack from "./msgpack"
var mLoc = <any> msgpack;
export const msgpack2 = <typeof msgpack> mLoc.msgpack;

export enum SkinColors {
    brown,
    beige,
    darkBrown,
    peach,
    white,
    red,
    black,
    pink,
    blue,
    green,
    secretLightBlue = "length"
}