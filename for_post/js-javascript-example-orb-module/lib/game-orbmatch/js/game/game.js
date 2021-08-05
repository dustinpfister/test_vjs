(function (api) {

    // create a player/ai object
    var createPlayerObject = function (opt) {
        opt = opt || {};
        var playerObj = {};
        playerObj.orbCollection = OrbCollection.create();
        playerObj.slots = [];
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
