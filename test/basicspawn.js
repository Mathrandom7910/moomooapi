
const api = new MooMooAPI();

api.on("packetReceive", (e) => {
  if(e.type == "io-init") {
    api.sendBasic("sp", {name: "helloworld", skin: 3, moofol: 1});
  }
});
