(function (api) {

    // create a player/ai object
    var createPlayerObject = function (opt) {
        opt = opt || {};
        var playerObj = {
            faction: opt.faction || 'ai'
        };
        playerObj.orbCollection = OrbCollection.create({
                faction: playerObj.faction,
                count: 8
            });
        playerObj.slots = OrbCollection.create({
                faction: playerObj.faction,
                count: 4,
                points: [0, 0, 0, 0],
                level: 0
            });
        // position slots
        playerObj.slots.orbs.forEach(function (orb, i) {
            orb.y = 240 + 60 * (playerObj.faction === 'player' ? 1 : -1);
            orb.x = 32 + (640 - 32) / 4 * i;
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
