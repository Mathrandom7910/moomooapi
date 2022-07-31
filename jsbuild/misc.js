/**
 * Possible skin colours to choose from
 */
export var SkinColours;
(function (SkinColours) {
    SkinColours[SkinColours["BROWN"] = 0] = "BROWN";
    SkinColours[SkinColours["BEIGE"] = 1] = "BEIGE";
    SkinColours[SkinColours["DARKBROWN"] = 2] = "DARKBROWN";
    SkinColours[SkinColours["PEACH"] = 3] = "PEACH";
    SkinColours[SkinColours["WHITE"] = 4] = "WHITE";
    SkinColours[SkinColours["RED"] = 5] = "RED";
    SkinColours[SkinColours["BLACK"] = 6] = "BLACK";
    SkinColours[SkinColours["PINK"] = 7] = "PINK";
    SkinColours[SkinColours["BLUE"] = 8] = "BLUE";
    SkinColours[SkinColours["GREEN"] = 9] = "GREEN";
    SkinColours["SECRETLIGHTBLUE"] = "length";
})(SkinColours || (SkinColours = {}));
/**
 * Repeater class used to repeat a specific action
 */
export class Repeater {
    /**
     * Repeater constructor
     * @param cb Callback function to call on every interval
     * @param msInterval The time (milliseconds) to repeat the action
     * @param keyCode The keycode on if it should start or stop on action
     */
    constructor(cb, msInterval, keyCode) {
        this.cb = cb;
        this.msInterval = msInterval;
        this.keyCode = keyCode;
        this.intervalId = null;
    }
    /**
     * Starts the repeater if the given keycode matches the one input
     * @param keyCode The keycode to check
     */
    start(keyCode) {
        if (this.keyCode != keyCode || this.intervalId != null)
            return;
        this.intervalId = setInterval(this.cb, this.msInterval);
    }
    /**
     * Stops the reapeater if the keycode matches the one input
     * @param keyCode The keycode to check
     */
    stop(keyCode) {
        if (this.keyCode != keyCode || this.intervalId == null)
            return;
        clearInterval(this.intervalId);
        this.intervalId = null;
    }
}
//# sourceMappingURL=misc.js.map