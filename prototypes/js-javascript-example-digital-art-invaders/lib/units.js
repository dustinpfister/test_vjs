var unitsMod = (function () {
 

    // the public api
    var api = {};

    // the unit types object that is to be extended
    // by calling unitsMod.load
    var UNIT_TYPES = {};


//  CONST VALUES

    var UNIT_PPS_MIN = 32,
    UNIT_PPS_MAX = 64;
 
//  HELPERS
 
    // random heading helper
    api.randomHeading = function(){
       return Math.PI * 2 * Math.random();
    };
    // random ppx helper
    api.randomPPS = function(){
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

        },
        update: function(unit, pool, game, secs){

            // move and wrap
            poolMod.moveByPPS(unit, secs);
            poolMod.wrap(unit, game.sm.canvas, unit.w);
        }
    };
    // the unit pool options object
    var UNIT_OPTIONS = {
        count: 10,
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
        unit.heading = api.randomHeading();
        // speed
        unit.pps = api.randomPPS();
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
 
    api.load = function(typeOptions){
        var typeKey = typeOptions.typeKey || Object.keys(UNIT_TYPES).length; 
        console.log('setting the given typeOptions object at key: ' + typeKey);
        // just ref the object for now if that works okay
        UNIT_TYPES[typeKey] = typeOptions;
    };
    // public create method
    api.create = function (opt) {
        opt = opt || {};
        var typeOptions = UNIT_TYPES[opt.type];
        var unitOpt = typeOptions ? typeOptions : UNIT_OPTIONS;
        var options = Object.assign({}, unitOpt, opt);
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
