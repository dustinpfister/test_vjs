
var gameMod = (function () {

    var UNIT_COLORS = ['red', 'green', 'blue', 'pink', 'purple', 'orange', 'black'];

    // the public api
    var api = {};

    var randomColor = function(){
        return UNIT_COLORS[ Math.floor(UNIT_COLORS.length * Math.random()) ];
    };

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
        count: 20,
        disableLifespan: true
    };
    // spawn a unit
    UNIT_OPTIONS.spawn = function (unit, pool, game, spawnOpt) {
        spawnOpt = spawnOpt || {};
        var canvas = game.sm.canvas;
        // mode of the unit
        unit.data.mode = spawnOpt.mode || 'move';


        unit.data.fillStyle = randomColor();
        unit.data.pointsOpt = {
            fill: randomColor()
        };

        // alpha
        unit.data.alpha = 0.5;
        // size
        var size = Math.round(64 + 128 * Math.random());
        unit.w = size;
        unit.h = size;
        // start position
        unit.x = Math.floor( canvas.width * Math.random());
        unit.y = Math.floor( canvas.height * Math.random());
        // heading
        unit.heading = randomHeading();
        // speed
        unit.pps = 16 + Math.round(32 * Math.random());
        // start points for the unit
        unit.data.points = starMod.unsteady({
            pointCount: 5 + Math.round(5 * Math.random()),
            radius : size / 2,
            radiusInner: size / 4,
            radianAjust: unit.heading
        });
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
