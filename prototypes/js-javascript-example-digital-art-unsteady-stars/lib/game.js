
var gameMod = (function () {
    // the public api
    var api = {};

    // random heading helper
    var randomHeading = function(){
       return Math.PI * 2 * Math.random();
    };

    // unit modes
    var UNIT_MODES = {};
    // move mode
    UNIT_MODES.move = {
        update: function(obj, pool, game, secs){
            // move by pps
            poolMod.moveByPPS(obj, secs);
        }
    };
    // the unit pool options object
    var UNIT_OPTIONS = {
        count: 11,
        disableLifespan: true
    };
    // spawn a unit
    UNIT_OPTIONS.spawn = function (unit, pool, game, spawnOpt) {
        spawnOpt = spawnOpt || {};
        var canvas = game.sm.canvas;
        // mode of the unit
        unit.data.mode = spawnOpt.mode || 'move';

        // alpha
        unit.data.alpha = 0.5;
        // size
        unit.w = 64;
        unit.h = 64;
        // start position
        unit.x = canvas.width / 2 - unit.w / 2;
        unit.y = canvas.height / 2 - unit.h / 2;
        // heading
        unit.heading = randomHeading();
        // start points for the unit
/*
        unit.data.points = starMod.create1({
            radius : 32,
            radiusInner: 16,
            radianAjust: unit.heading
        });
*/


        unit.data.points = starMod.unsteady({
            radius : 32,
            radiusInner: 16,
            radianAjust: unit.heading
        });

        starMod.unsteady.update(unit.data.points, 0);

    };
    // update a unit
    UNIT_OPTIONS.update = function (unit, pool, game, secs) {
        starMod.unsteady.update(unit.data.points, secs);
        // move the unit my pps and wrap
        UNIT_MODES[unit.data.mode].update(unit, pool, game, secs);
        // wrap and unit that goes out of the canvas in any mode
        poolMod.wrap(unit, game.sm.canvas, unit.w / 2);
    };
    // purge a unit
    UNIT_OPTIONS.purge = function (obj, pool, game) {};
    // what to do after all the objects have been updated
    UNIT_OPTIONS.afterUpdate = function(pool, secs, game){};

    // public create method
    api.create = function (opt) {
        opt = opt || {};
        var game = {
            sm: opt.sm || {},
            units: poolMod.create(UNIT_OPTIONS)
        };
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
