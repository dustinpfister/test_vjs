(function (api) {
    // create and return a new game object
    api.create = function (opt) {
        opt = opt || {};
        var game = {};

        // the start of a player object
        game.player = {};
        game.player.orbCollection = OrbCollection.create();
        game.player.slots = [];

        return game;
    };
}
    (this['gameMod'] = {}));
