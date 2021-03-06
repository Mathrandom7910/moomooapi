const api = new MooMooAPI();

//But be careful with interceptions like this! Infinite loops can be caused very easily if you do something as simple as change the spawn name to something different!
//To avoid this, use api.sendHidden() to send raw data to the server, for more info, view the docs
//This also can be a bad method to use, since some aspects of the api (namely the alive detection) require listening to outgoing packets
api.on("packetSend", (e) => {
    if(e.type == MooMooAPI.C2SPacketType.SPAWN && e.payload[0].name != "override") {
        api.spawn("override");
    }
});