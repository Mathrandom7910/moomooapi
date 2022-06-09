
/**
 * Possible skin colours to choose from
 */

export enum SkinColours {
    BROWN,
    BEIGE,
    DARKBROWN,
    PEACH,
    WHITE,
    RED,
    BLACK,
    PINK,
    BLUE,
    GREEN,
    SECRETLIGHTBLUE = "length"
}

/**
 * Repeater class used to repeat a specific action
 */

 export class Repeater {
    intervalId: numull = null;

    /**
     * Repeater constructor
     * @param cb Callback function to call on every interval
     * @param msInterval The time (milliseconds) to repeat the action
     * @param keyCode The keycode on if it should start or stop on action
     */
    constructor(public cb: Function, public msInterval: number, public keyCode: number) {

    }

    /**
     * Starts the repeater if the given keycode matches the one input
     * @param keyCode The keycode to check
     */

    start(keyCode: number) {
        if(this.keyCode != keyCode || this.intervalId != null) return;
        this.intervalId = setInterval(this.cb, this.msInterval);
    }

    /**
     * Stops the reapeater if the keycode matches the one input
     * @param keyCode The keycode to check
     */

    stop(keyCode: number) {
        if(this.keyCode != keyCode || this.intervalId == null) return;
        clearInterval(this.intervalId);
        this.intervalId = null;
    }
}

export type numu = number | undefined;
export type numull = number | null;