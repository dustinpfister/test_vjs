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
        unit.w = 32;
        unit.h = 32;
        // start position
        unit.x = spawnOpt.x;
        unit.y = spawnOpt.y;
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


        var areaDisp = poolMod.createDisp({
            x: 128 + (32 + 1) * Math.floor( 5 * Math.random()) ,
            y: 128 + (32 + 1) * Math.floor( 5 * Math.random())
        });

        var active = poolMod.getActiveObjects(pool),
        ai = active.length,
        good = true;

        while(ai--){
            var disp = active[ai];
            if(poolMod.boundingBox(areaDisp, disp)){
                good = false;
                break;
            }
        }

        if(good){
            poolMod.spawn(pool, game, {x: areaDisp.x, y: areaDisp.y});
        }


    };

    // return the OPTIONS object to use to create
    // this type of unit
    return UNIT_OPTIONS;
}
    ()) );
