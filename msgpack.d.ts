export namespace msgpack {
    export { serialize as encode };
    export { deserialize as decode };
}
declare function serialize(data: any): Uint8Array;
declare function deserialize(array: any): any;
export {};
