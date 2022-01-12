var gameMod = (function () {
    // the public api
    var api = {};
    // public create method
    api.create = function (opt) {
        opt = opt || {};
        var game = {
            sm: opt.sm || {}
        };
        // create game units
        game.units = unitsMod.create({
            type: 'attackers',
            game: game,
            count: 30
        });
        // spawn all for starters
        poolMod.spawnAll(game.units, game, {});
        return game;
    };
    // public update method
    api.update = function (game, secs) {
        // update units
        poolMod.update(game.units, secs, sm.game);
    };
    // return the public API
    return api;
}
    ());
