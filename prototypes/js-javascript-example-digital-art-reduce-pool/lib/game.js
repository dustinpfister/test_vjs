
var gameMod = (function () {

    var api = {};

    var UNIT_OPT = {
        count: 15,
        disableLifespan: true
    };

    UNIT_OPT.spawn = function (obj, pool, state, opt) {}

    UNIT_OPT.update = function (obj, pool, state, secs) {}

    UNIT_OPT.purge = function (obj, pool, state) {}

    api.create = function (opt) {
		opt = opt || {};
        var game = {
			sm: opt.sm || {},
            units: poolMod.create(UNIT_OPT)
        };
		
		poolMod.spawnAll(game.units, game)
		
        return game;
    };

    api.update = function (game, secs) {};

    return api;

}
    ());
