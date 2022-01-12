unitsMod.load( (function () {

// THE OPTIONS OBJECT 
    var UNIT_OPTIONS = {
        typeKey: 'buildings',
        count: 10,
        disableLifespan: true
    };

    // unit modes
    var UNIT_MODES = {};
    
    // idle
    UNIT_MODES.idle = {
        init: function(unit, pool, game){},
        update: function(unit, pool, game, secs){}
    };

    UNIT_OPTIONS.modes = UNIT_MODES;

    // spawn a unit
    UNIT_OPTIONS.spawn = function (unit, pool, game, spawnOpt) {
        spawnOpt = spawnOpt || {};
        var canvas = game.sm.canvas;
        // mode of the unit
        unit.data.mode = spawnOpt.mode || 'idle';
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
        // heading and speed not used
        unit.heading = 0;
        unit.pps = 0;
        // chance mode
        unitsMod.changeMode(unit, unit.data.mode, pool, game);
    };
    // update a unit
    UNIT_OPTIONS.update = function (unit, pool, game, secs) {
        var modeObj = pool.data.modes[unit.data.mode];
        // call the current mode update method
        modeObj.update(unit, pool, game, secs);
    };

    UNIT_OPTIONS.beforeUpdate = function(pool, secs, game){

poolMod.spawn(pool, game, {})


    };

    // return the OPTIONS object to use to create
    // this type of unit
    return UNIT_OPTIONS;
}
    ()) );
