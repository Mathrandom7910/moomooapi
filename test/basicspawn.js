const api = new MooMooAPI();

api.on("packetReceive", (e) => {
  if(e.type == "io-init") {
    /*         name             skin colors           more mats on spawn (100) */
    api.spawn("hello world!", MooMooAPI.SkinColours.blue, true);
  }
});
