import {MooMooAPI} from "../src/main"

const api = new MooMooAPI();

api.on("packetReceive", (e) => {
  if(e.type == "io-init") {
    /*         name             skin colors           more mats on spawn (100) */
    api.spawn("hello world!", MooMooAPI.SkinColors.blue, true);
  }
});
