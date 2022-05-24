
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

export class Repeater {
    intervalId = -1;
    constructor(readonly cb: Function, readonly int: number, readonly keyCode: number) {

    }

    start(keyCode: number) {
        if(this.keyCode != keyCode) return;
        this.intervalId = setInterval(this.cb, this.int);
    }

    stop(keyCode: number) {
        if(this.keyCode != keyCode) return;
        clearInterval(this.intervalId);
        this.intervalId = -1;
    }
}