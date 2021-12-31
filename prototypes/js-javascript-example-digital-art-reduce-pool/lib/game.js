
var gameMod = (function () {

    var api = {};

    UNIT_SIZE_RANGE = [32, 128]

    var UNIT_OPT = {
        count: 25,
        disableLifespan: true
    };

    // set the size of the given unit object
    var getSize = function (unit) {
        var totalMass = 25 * 50,
        sizePer = unit.data.mass / totalMass,
        size = UNIT_SIZE_RANGE[0] + (UNIT_SIZE_RANGE[1] - UNIT_SIZE_RANGE[0]) * sizePer;
        return size;
    };

    UNIT_OPT.spawn = function (obj, pool, game, opt) {
        var canvas = game.sm.canvas;
        // start mass
        obj.data.mass = 50;
        // size and position
        var size = getSize(obj);
        obj.w = size;
        obj.h = size;
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

        var under = poolMod.getOverlaping(obj, pool);
        if (under.length > 0) {
            under.forEach(function (underUnit) {
                obj.data.mass += underUnit.data.mass;
                poolMod.purge(pool, underUnit, game)
            });
            var size = getSize(obj);
            obj.w = size;
            obj.h = size;
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
