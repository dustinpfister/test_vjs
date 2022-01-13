unitsMod.load( (function () {

// THE OPTIONS OBJECT 
    var UNIT_OPTIONS = {
        typeKey: 'shots',
        count: 10,
        disableLifespan: true
    };

    // unit modes
    var UNIT_MODES = {};
    
    // idle
    UNIT_MODES.move = {
        init: function(unit, pool, game){},
        update: function(unit, pool, game, secs){
            poolMod.moveByPPS(unit, secs);
        }
    };

    UNIT_OPTIONS.modes = UNIT_MODES;

    // spawn a unit
    UNIT_OPTIONS.spawn = function (unit, pool, game, spawnOpt) {
        spawnOpt = spawnOpt || {};
        var canvas = game.sm.canvas,
        uDat = unit.data;
        // mode of the unit
        uDat.mode = spawnOpt.mode || 'idle';
        // colors
        uDat.fillStyle = 'white'
        // alpha
        uDat.alpha = 1;
        // size
        unit.w = 4;
        unit.h = 4;
        // start position
        unit.x = spawnOpt.x || 0;
        unit.y = spawnOpt.y || 0;
        // heading and speed not used
        unit.heading = spawnOpt.heading || 0;
        unit.pps = 128;
        // chance mode
        unitsMod.changeMode(unit, uDat.mode, pool, game);
    };
    // update a unit
    UNIT_OPTIONS.update = function (unit, pool, game, secs) {
        var modeObj = pool.data.modes[unit.data.mode];
        // call the current mode update method
        modeObj.update(unit, pool, game, secs);
    };
    // return the Options object
    return UNIT_OPTIONS;
}
    ()) );
