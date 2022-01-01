
var gameMod = (function () {
    // the public api
    var api = {};
    // some constants
    var UNIT_SIZE_RANGE = [16, 256],
    UNIT_COUNT = 30;
    // the unit pool options object
    var UNIT_OPT = {
        count: UNIT_COUNT,
        disableLifespan: true
    };
    // set the size of the given unit object
    var getSize = function (unit) {
        var totalMass = UNIT_COUNT * 50,
        sizePer = unit.data.mass / totalMass,
        size = UNIT_SIZE_RANGE[0] + (UNIT_SIZE_RANGE[1] - UNIT_SIZE_RANGE[0]) * sizePer;
        return size;
    };

    var modeUnit = function(game, obj, secs){
        poolMod.moveByPPS(obj, secs);
        var size = UNIT_SIZE_RANGE[1];
        obj.x = utils.wrapNumber(obj.x, size * -1, game.sm.canvas.width + size);
        obj.y = utils.wrapNumber(obj.y, size * -1, game.sm.canvas.height + size);
    };

    var UNIT_MODES = {};

    // transfer mode
    UNIT_MODES.transfer = {
        update: function(obj, pool, game, secs){
            var target = obj.data.transferTarget;
            if(obj.data.mass > 0){
                obj.data.mass -= 1;
                target.data.mass += 1;
            }else{
                poolMod.purge(pool, obj, game);
            }
            var size = getSize(obj);
            obj.w = size;
            obj.h = size;
            var size = getSize(target);
            target.w = size;
            target.h = size;
        }
    };

    // move mode
    UNIT_MODES.move = {
        update: function(obj, pool, game, secs){
modeUnit(game, obj, secs);
            // if any other unit is under this one add the mass of them and purge them
            var under = poolMod.getOverlaping(obj, pool);
            if (under.length > 0) {
                under.forEach(function (underUnit) {
                    // set unit into transfer mode
                    if(underUnit.data.mode === 'move'){
                        underUnit.data.mode = 'transfer';
                        underUnit.data.transferTarget = obj;
                    }
                });
            }
        }
    };

    // spawn a unit
    UNIT_OPT.spawn = function (obj, pool, game, spawnOpt) {
        spawnOpt = spawnOpt || {};
        var canvas = game.sm.canvas;
        // start in move mode by default
        obj.data.mode = spawnOpt.mode || 'move';
        obj.data.transferTarget = null;
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
        obj.pps = 64;
        obj.heading = Math.PI * 2 * Math.random();
    };
    // update a unit
    UNIT_OPT.update = function (obj, pool, game, secs) {
        // move the unit my pps and wrap
        UNIT_MODES[obj.data.mode].update(obj, pool, game, secs)
    };
    // purge a unit
    UNIT_OPT.purge = function (obj, pool, game) {};
    // public create method
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
    // public update method
    api.update = function (game, secs) {
        poolMod.update(game.units, secs, sm.game)
    };
    // return the public API
    return api;
}
    ());
