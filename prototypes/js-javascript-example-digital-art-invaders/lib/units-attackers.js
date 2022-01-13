unitsMod.load( (function () {

// HELPERS
    var getAttackerStartPos = function(game){
        var canvas = game.sm.canvas,
        cx = canvas.width / 2,
        cy = canvas.height / 2,
        pos = {},
        radian = unitsMod.randomHeading();
        pos.x = cx + Math.cos(radian) * 180;
        pos.y = cy + Math.sin(radian) * 180;
        return pos;
    };

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

  

            // move and wrap
            poolMod.moveByPPS(unit, secs);
            //poolMod.wrap(unit, game.sm.canvas, unit.w);
        }
    };

    // idle mode - what an attacker should do while it is active, but does not have any kind
    // of task such as seeking a target, moving to a new location ect.
    UNIT_MODES.idle = {
        init: function(unit, pool, game){

        },
        update: function(unit, pool, game, secs){

            unit.data.fillStyle = 'blue';
            unit.data.overlapCount = poolMod.getOverlaping(unit, pool).length;
            if(unit.data.overlapCount > 0){
                unit.data.fillStyle = 'red';
            }

            // move and wrap
            //poolMod.moveByPPS(unit, secs);
            //poolMod.wrap(unit, game.sm.canvas, unit.w);
        }
    };

    UNIT_OPTIONS.modes = UNIT_MODES;

    // spawn a unit
    UNIT_OPTIONS.spawn = function (unit, pool, game, spawnOpt) {
        spawnOpt = spawnOpt || {};
        var canvas = game.sm.canvas;
        // mode of the unit
        unit.data.mode = spawnOpt.mode || 'idle';
        // colors
        unit.data.fillStyle = '#aa0000';
        // alpha
        unit.data.alpha = 1;
        // size
        unit.w = 32;
        unit.h = 32;
        // start position
        Object.assign(unit,getAttackerStartPos(game));
        //unit.x = canvas.width / 2;
        //unit.y = canvas.height / 2;
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
