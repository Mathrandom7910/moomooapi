const api = new MooMooAPI();

api.on("health", (e) => {
    if(e.sid == api.player.sid && e.health != 100) {
        setTimeout(()=>api.placeItem(api.player.getFoodType()), 150);
    }
});