var gameMod = (function () {
    // the public api
    var api = {};
    // public create method
    api.create = function (opt) {
        opt = opt || {};
        var game = {
            sm: opt.sm || {},
            power: {
               buildings: 0,
               attackers: 0
            }
        };
        // create game units
        game.buildings = unitsMod.create({
            type: 'buildings',
            game: game,
            count: 20
        });
        // create game units
        game.attackers = unitsMod.create({
            type: 'attackers',
            game: game,
            count: 10
        });
        // create game units
        game.shots = unitsMod.create({
            type: 'shots',
            game: game,
            count: 100
        });
        return game;
    };
    // public update method
    api.update = function (game, secs) {
        // update units
        poolMod.update(game.shots, secs, sm.game);
        poolMod.update(game.attackers, secs, sm.game);
        poolMod.update(game.buildings, secs, sm.game);
        // power stats
        game.power.buildings = unitsMod.totalPower(game.buildings);
        game.power.attackers = unitsMod.totalPower(game.attackers);
    };
    // return the public API
    return api;
}
    ());
