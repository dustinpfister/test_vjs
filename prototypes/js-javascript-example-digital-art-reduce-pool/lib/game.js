
var gameMod = (function () {

    var api = {};

    var UNIT_OPT = {
        count: 15,
        disableLifespan: true
    };

    UNIT_OPT.spawn = function (obj, pool, game, opt) {

        var canvas = game.sm.canvas;
        // size and position
        obj.w = 32;
        obj.h = 32;
        var r = canvas.height * 0.4,
        a = Math.PI * 2 * Math.random();
        obj.x = canvas.width / 2 - obj.w / 2 + Math.cos(a) * r;
        obj.y = canvas.height / 2 - obj.h / 2 + Math.sin(a) * r;

        // speed and heading
        obj.pps = 32;
        obj.heading = Math.PI * 2 * Math.random();
    };

    UNIT_OPT.update = function (obj, pool, game, secs) {
        poolMod.moveByPPS(obj, secs);
        obj.x = utils.wrapNumber(obj.x, -32, game.sm.canvas.width + 32);
        obj.y = utils.wrapNumber(obj.y, -32, game.sm.canvas.height + 32);

        var over = poolMod.getOverlaping(obj, pool);
        if (over.length > 0) {
            console.log(over.length);
            over.forEach(function () {
                poolMod.purge(pool, obj, game)
            })
        }

    };

    UNIT_OPT.purge = function (obj, pool, game) {}

    api.create = function (opt) {
        opt = opt || {};
        var game = {
            sm: opt.sm || {},
            units: poolMod.create(UNIT_OPT)
        };
        // spawn all for starters
        poolMod.spawnAll(game.units, game)
        return game;
    };

    api.update = function (game, secs) {

        poolMod.update(game.units, secs, sm.game)

    };

    return api;

}
    ());
