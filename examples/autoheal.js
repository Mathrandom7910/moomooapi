const api = new MooMooAPI();

api.on("health", (sid, health) => {
    if(sid == api.player.sid) {
        api.place(api.getFoodType());
    }
});