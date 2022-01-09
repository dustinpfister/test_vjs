
var gameMod = (function () {

    var UNIT_COLORS = ['red', 'green', 'blue', 'pink', 'purple', 'orange', 'black'];

/*  HELPERS */

    var changeMode = function(unit, modeKey, pool, game){
        var uDat = unit.data;
        // old mode object
        var oldModeObj = UNIT_MODES[uDat.mode];
        // update mode key of unit and get new modeObj
        uDat.mode = modeKey;
        var modeObj = UNIT_MODES[uDat.mode];
        // call init hook of new mode obj
        modeObj.init.call(unit, unit, pool, game);
    };

    var randomColor = function(){
        return UNIT_COLORS[ Math.floor(UNIT_COLORS.length * Math.random()) ];
    };

    // random heading helper
    var randomHeading = function(){
       return Math.PI * 2 * Math.random();
    };

    var randomPPS = function(){
       return 16 + Math.round(32 * Math.random());
    };

/*  UNITS MODES AND OPTIONS */

    // unit modes
    var UNIT_MODES = {};

    // in rebirth mode the unit will translation from one set of values to another
    UNIT_MODES.rebirth = {
        init: function(unit, pool, game){
            console.log('init for rebirth mode ');
        },
        update: function(unit, pool, game, secs){
            // heading
            unit.heading = randomHeading();
            // speed
            unit.pps = randomPPS();
        }
    };
    // a simple move mode where the unit will just move by current PPS and heading values
    UNIT_MODES.move = {
        init: function(unit, pool, game){
            console.log('init for move mode ');
        },
        update: function(unit, pool, game, secs){
            // move by pps
            poolMod.moveByPPS(unit, secs);
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
        unit.data.modeTime = 0; // the total amount of time the unit has been in the current mode
        unit.data.lastRoll = 0; // the amount of time sense the last roll (used for mode switching)
        unit.data
        // colors
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
        unit.pps = randomPPS();
        // start points for the unit
        unit.data.points = starMod.unsteady({
            pointCount: 5 + Math.round(5 * Math.random()),
            radius : size / 2,
            radiusInner: size / 4,
            radianAjust: unit.heading,
            nprMin: 2,
            nprMax: 6
        });
        // call init for current mode
        //UNIT_MODES[unit.data.mode].init.call(unit, unit, pool, game);
		changeMode(unit, unit.data.mode, pool, game);
    };
    // update a unit
    UNIT_OPTIONS.update = function (unit, pool, game, secs) {
        var uDat = unit.data,
        modeKey = uDat.mode,
        modeObj = UNIT_MODES[modeKey];
        // update mode time and last roll
        uDat.modeTime += secs;
        uDat.lastRoll += secs;
        // crude yet effective mode switching
        if(uDat.modeTime >= 3 & uDat.lastRoll >= 2){
            var roll = Math.random();
            if(roll > 0.5){
                uDat.mode = uDat.mode === 'move' ? 'rebirth' : 'move';
                //modeObj.init.call(unit, unit, pool, game);
                //uDat.modeTime = 0;
                changeMode(unit, unit.data.mode, pool, game);
            }
            uDat.lastRoll = 0;
        }
        // call update method for star mod
        starMod.unsteady.update(unit.data.points, secs);
        // call the current mode update method
        modeObj.update(unit, pool, game, secs);

        // wrap and unit that goes out of the canvas in any mode
        poolMod.wrap(unit, game.sm.canvas, unit.w);
    };
    // purge a unit
    UNIT_OPTIONS.purge = function (obj, pool, game) {};
    // what to do after all the objects have been updated
    UNIT_OPTIONS.afterUpdate = function(pool, secs, game){};
 
/*  PUBLIC API */
 
    // the public api
    var api = {};

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
