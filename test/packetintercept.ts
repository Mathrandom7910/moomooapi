import {MooMooAPI} from "../src/main"

const api = new MooMooAPI();

api.on("packetSend", (e) => {
    if(e.type == "sp" && e.payload[0].name != "override") {
        api.spawn("override");
    }
});