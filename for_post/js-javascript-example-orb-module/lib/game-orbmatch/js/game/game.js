(function (api) {

    // create a player/ai object
    var createPlayerObject = function (opt) {
        opt = opt || {};
        var player = {};
        player.orbCollection = OrbCollection.create();
        player.slots = [];
        return player;
    };

    // create and return a new game object
    api.create = function (opt) {
        opt = opt || {};
        var game = {};

        // the start of a player object
        game.player = createPlayerObject();

        return game;
    };
}
    (this['gameMod'] = {}));
