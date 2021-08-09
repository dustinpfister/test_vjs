(function (api) {

    // create a player/ai object
    var createPlayerObject = function (opt) {
        opt = opt || {};
        var playerObj = {
            faction: opt.faction || 'ai'
        };
        playerObj.pouch = OrbCollection.create({
                key: 'pouch',
                faction: playerObj.faction,
                count: 8
            });
        playerObj.slots = OrbCollection.create({
                key: 'slots',
                faction: playerObj.faction,
                count: 4,
                points: [0, 0, 0, 0],
                level: 0
            });
        // position slots
        playerObj.slots.orbs.forEach(function (orb, i) {
            orb.data.homeX = 32 + (640 - 32) / 4 * i;
            orb.data.homeY = 240 + 60 * (playerObj.faction === 'player' ? 1 : -1);
            orb.x = orb.data.homeX;
            orb.y = orb.data.homeY;
        });
        return playerObj;
    };

    // create and return a new game object
    api.create = function (opt) {
        opt = opt || {};
        var game = {
            turnNumber: 0,
            currentState: 'playerTurn'
        };
        // the start of a player object
        game.player = createPlayerObject({
                faction: 'player'
            });
        // start the ai object
        game.ai = createPlayerObject({
                faction: 'ai'
            });
        return game;
    };
}
    (this['gameMod'] = {}));
