/**
 * Possible skin colours to choose from
 */
export declare enum SkinColours {
    BROWN = 0,
    BEIGE = 1,
    DARKBROWN = 2,
    PEACH = 3,
    WHITE = 4,
    RED = 5,
    BLACK = 6,
    PINK = 7,
    BLUE = 8,
    GREEN = 9,
    SECRETLIGHTBLUE = "length"
}
/**
 * Repeater class used to repeat a specific action
 */
export declare class Repeater<T> {
    cb: Function;
    msInterval: number;
    code: T;
    intervalId: numull;
    /**
     * Repeater constructor
     * @param cb Callback function to call on every interval
     * @param msInterval The time (milliseconds) to repeat the action
     * @param code The keycode on if it should start or stop on action
     */
    constructor(cb: Function, msInterval: number, code: T);
    /**
     * Starts the repeater if the given keycode matches the one input
     * @param code The code to check
     */
    start(code: T): void;
    /**
     * Stops the reapeater if the keycode matches the one input
     * @param keyCode The keycode to check
     */
    stop(keyCode: T): void;
}
export declare const StringRepeater: {
    new (cb: Function, msInterval: number, code: string): Repeater<string>;
};
export declare type numu = number | undefined;
export declare type numull = number | null;
