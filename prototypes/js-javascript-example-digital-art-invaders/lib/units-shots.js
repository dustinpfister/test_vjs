unitsMod.load( (function () {

// THE OPTIONS OBJECT 
    var UNIT_OPTIONS = {
        typeKey: 'shots',
        count: 10,
        disableLifespan: true
    };

    // unit modes
    var UNIT_MODES = {};
   
    UNIT_MODES.atRange = {
        init: function(unit, pool, game){},
        update: function(unit, pool, game, secs){
            var uDat = unit.data;
            // purge shot
            poolMod.purge(unit, game);
        }
    };

    UNIT_MODES.hit = {
        init: function(unit, pool, game){},
        update: function(unit, pool, game, secs){
            var uDat = unit.data;
            var hitObjects = poolMod.getOverlaping(unit, uDat.hitPool);
            if(hitObjects.length > 0){
                hitObjects.forEach(function(target){
                    target.data.hp -= uDat.attack;
                    target.data.hp = target.data.hp < 0 ? 0 : target.data.hp;
                    if(target.data.hp === 0){
                        poolMod.purge(target, game);
                    }
                });
            }
            // purge shot
            poolMod.purge(unit, game);
        }
    };
 
    // move
    UNIT_MODES.move = {
        init: function(unit, pool, game){},
        update: function(unit, pool, game, secs){
            var uDat = unit.data;
            // distance from start position
            var ds = poolMod.distance(unit, uDat.sx, uDat.sy);
            // move and switch to at rangMode if set range is reached
            poolMod.moveByPPS(unit, secs);
            if(ds >= uDat.range){
                // make sure shot is at range, not beyond
                unit.x = uDat.sx + Math.cos(unit.heading) * uDat.range;
                unit.y = uDat.sy + Math.sin(unit.heading) * uDat.range;
                // switch to at range mode
                unitsMod.changeMode(unit, 'atRange', pool, game);
            }
            // check hit pool and switch to hitMode if one or more objects where hit
            if(uDat.hitPool){
                var hitObjects = poolMod.getOverlaping(unit, uDat.hitPool);
                if(hitObjects.length > 0){
                    unitsMod.changeMode(unit, 'hit', pool, game);
                }
            }
        }
    };

    UNIT_OPTIONS.modes = UNIT_MODES;

    // spawn a unit
    UNIT_OPTIONS.spawn = function (unit, pool, game, spawnOpt) {
        spawnOpt = spawnOpt || {};
        var canvas = game.sm.canvas,
        uDat = unit.data;
        // mode of the unit
        uDat.mode = spawnOpt.mode || 'move';
        // SHOT STATS
        uDat.attack = spawnOpt.attack === undefined ? 1 : spawnOpt.attack;
        uDat.range = spawnOpt.range === undefined ? 100: spawnOpt.range;
        // shot hitPool - a pool to check on each update to see if something that hot or not
        uDat.hitPool = spawnOpt.hitPool || null;
        // colors
        uDat.fillStyle = 'white'
        // alpha
        uDat.alpha = 1;
        // size
        unit.w = 4;
        unit.h = 4;
        // start position
        uDat.sx = spawnOpt.sx || 0;
        uDat.sy = spawnOpt.sy || 0;
        unit.x = uDat.sx;
        unit.y = uDat.sy;
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
