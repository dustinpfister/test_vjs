unitsMod.load( (function () {

// THE OPTIONS OBJECT 
    var UNIT_OPTIONS = {
        typeKey: 'attackers',
        count: 6,
        disableLifespan: true
    };

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

    UNIT_OPTIONS.modes = UNIT_MODES;

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
        unit.w = 32;
        unit.h = 32;
        // start position
        unit.x = Math.floor( canvas.width * Math.random());
        unit.y = Math.floor( canvas.height * Math.random());
        // heading
        unit.heading = unitsMod.randomHeading();
        // speed
        unit.pps = unitsMod.randomPPS();
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
        poolMod.spawn(pool, game, {});
    }

    // return the OPTIONS object to use to create
    // this type of unit
    return UNIT_OPTIONS;
}
    ()) );
