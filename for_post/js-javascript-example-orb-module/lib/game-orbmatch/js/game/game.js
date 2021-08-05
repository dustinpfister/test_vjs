(function (api) {

    // create a player/ai object
    var createPlayerObject = function (opt) {
        opt = opt || {};
        var playerObj = {};
        playerObj.orbCollection = OrbCollection.create({
                count: 8
            });
        playerObj.slots = OrbCollection.create({
                count: 4,
                points: [0, 0, 0, 0],
                level: 0
            });

        // position slots
        playerObj.slots.orbs.forEach(function (orb, i) {
            orb.y = 240 + 60;
            orb.x = 32 + (640 - 32) / 4 * i;
        });

        return playerObj;
    };

    // create and return a new game object
    api.create = function (opt) {
        opt = opt || {};
        var game = {};
        // the start of a player object
        game.player = createPlayerObject();
        // start the ai object
        game.ai = createPlayerObject();
        return game;
    };
}
    (this['gameMod'] = {}));
