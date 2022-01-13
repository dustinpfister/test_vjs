unitsMod.load( (function () {

// HELPERS

    // spawn building helper
    var spawnBuilding = function(game, pool){
        // spawn buidling
        var canvas = game.sm.canvas,
        space = 5,
        unitsPerAxis = 5,
        sx = canvas.width / 2 - ((32 + space) * (unitsPerAxis - 1 ) / 2),
        sy = canvas.height / 2 - ((32 + space) * ( unitsPerAxis - 1) / 2);
        // get a random area
        var areaDisp = poolMod.createDisp({
            x: sx + (32 + space) * Math.floor( unitsPerAxis * Math.random()) ,
            y: sy + (32 + space) * Math.floor( unitsPerAxis * Math.random())
        });
        // check to see of area if not taken
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
        // if we have a good location spawn
        if(good){
            poolMod.spawn(pool, game, {x: areaDisp.x, y: areaDisp.y});
        }
    }

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
        var canvas = game.sm.canvas,
        uDat = unit.data;
        // mode of the unit
        uDat.mode = spawnOpt.mode || 'idle';
        // STATS
        uDat.hpMax = 10;
        uDat.hp = unit.data.maxHP;
        // colors
        uDat.fillStyle = 'white'
        // alpha
        uDat.alpha = 1;
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
        unitsMod.changeMode(unit, uDat.mode, pool, game);
    };
    // update a unit
    UNIT_OPTIONS.update = function (unit, pool, game, secs) {
        var modeObj = pool.data.modes[unit.data.mode];
        // call the current mode update method
        modeObj.update(unit, pool, game, secs);
    };

    UNIT_OPTIONS.beforeUpdate = function(pool, secs, game){

        // set spawn secs of not there
        pool.data.spawnSecs = pool.data.spawnSecs === undefined ? 0 : pool.data.spawnSecs; 

        pool.data.spawnSecs += secs;

        if(pool.data.spawnSecs > 4){
            spawnBuilding(game, pool);
            pool.data.spawnSecs = 0;
        }

    };

    // return the OPTIONS object to use to create
    // this type of unit
    return UNIT_OPTIONS;
}
    ()) );
