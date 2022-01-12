var unitsMod = (function () {
 
//  CONST VALUES

    var UNIT_PPS_MIN = 32,
    UNIT_PPS_MAX = 64;
 
//  HELPERS
 
    // random heading helper
    var randomHeading = function(){
       return Math.PI * 2 * Math.random();
    };
    // random ppx helper
    var randomPPS = function(){
       return UNIT_PPS_MIN + Math.round((UNIT_PPS_MAX - UNIT_PPS_MIN) * Math.random());
    };
    // change the mode of a current unit
    var changeMode = function(unit, modeKey, pool, game){
        var uDat = unit.data;
        uDat.mode = modeKey;
        var modeObj = UNIT_MODES[uDat.mode];
        uDat.modeTime = 0;
        uDat.lastRoll = 0;
        // call init hook of new mode obj
        modeObj.init.call(unit, unit, pool, game);
    };
 
//  UNITS MODES AND OPTIONS
 
    // unit modes
    var UNIT_MODES = {};
    
    // a simple move mode where the unit will just move by current PPS and heading values
    UNIT_MODES.move = {
        init: function(unit, pool, game){
            unit.data.overlapCount = 0;
        },
        update: function(unit, pool, game, secs){
            unit.data.fillStyle = 'blue';
            unit.data.overlapCount = poolMod.getOverlaping(unit, pool).length;
            if(unit.data.overlapCount > 0){
                unit.data.fillStyle = 'red';
            }
            // move and wrap
            poolMod.moveByPPS(unit, secs);
            poolMod.wrap(unit, game.sm.canvas, unit.w);
        }
    };
    // the unit pool options object
    var UNIT_OPTIONS = {
        count: 6,
        disableLifespan: true
    };
    // spawn a unit
    UNIT_OPTIONS.spawn = function (unit, pool, game, spawnOpt) {
        spawnOpt = spawnOpt || {};
        var canvas = game.sm.canvas;
        // mode of the unit
        unit.data.mode = spawnOpt.mode || 'move';
        // colors
        unit.data.fillStyle = 'white'
        // alpha
        unit.data.alpha = 1;
        // size
        unit.w = 64;
        unit.h = 64;
        // start position
        unit.x = Math.floor( canvas.width * Math.random());
        unit.y = Math.floor( canvas.height * Math.random());
        // heading
        unit.heading = randomHeading();
        // speed
        unit.pps = randomPPS();
        // chance mode
        changeMode(unit, unit.data.mode, pool, game);
    };
    // update a unit
    UNIT_OPTIONS.update = function (unit, pool, game, secs) {
        var modeObj = UNIT_MODES[unit.data.mode];
        // call the current mode update method
        modeObj.update(unit, pool, game, secs);
    };
    // purge a unit
    //UNIT_OPTIONS.purge = function (obj, pool, game) {};
    // what to do after all the objects have been updated
    //UNIT_OPTIONS.afterUpdate = function(pool, secs, game){};
 
//  PUBLIC API
 
    // the public api
    var api = {};
    // public create method
    api.create = function (opt) {
        opt = opt || {};
        var options = Object.assign({}, UNIT_OPTIONS, opt);
        return poolMod.create(options);
    };
    // public update method
    api.update = function (units, secs) {
        // update units
        poolMod.update(units, secs);
    };
    // return the public API
    return api;
}
    ());
