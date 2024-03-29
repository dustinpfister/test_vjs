unitsMod.load( (function () {

    var SHOT_MAX_ACCURACY_HEADING_DELTA = utils.degToRad(20),
    SHOT_DEFAULTS = {
        range: 100,
        attack: 1,
        subType: 'shot.bullet'
    }

   var subTypes = {};
   
   subTypes.shot = {};
   
   subTypes.shot.bullet = {
       // check for one or more hits of any target in hitPool when moving and do not
       // care about any end point position
       hitCheck: true,
       endPointCheck: false,
       // a bullet will purge if at range
       atRange : function(unit, pool, game, secs){
            poolMod.purge(unit, game);
       },
       // when one or more objects are hit
       onHit : function(unit, pool, game, secs, hitObjects){
            var uDat = unit.data;
            if(hitObjects.length > 0){
                // bullets are single hit
                var target = hitObjects[hitObjects.length - 1];
                //hitObjects.forEach(function(target){
                    target.data.hp -= uDat.attack;
                    target.data.hp = target.data.hp < 0 ? 0 : target.data.hp;
                    if(target.data.hp === 0){
                        poolMod.purge(target, game);
                    }
                //});
            }
            // purge shot
            poolMod.purge(unit, game);
       },
       onEndPoint: function(unit, pool, game, secs){

       }
   };
   
   subTypes.shot.shell = {
       // no hit detection while moving, but check endPoint
       hitCheck: false,
       endPointCheck: true,
       atRange : function(unit, pool, game, secs){
           // purging for now, but the shot should switch to blast mode
           // also it should not even get to this point
           poolMod.purge(unit, game);
       },
       onHit : function(unit, pool, game, secs, hitObjects){},
       onEndPoint: function(unit, pool, game, secs){
            var uDat = unit.data;
            // blast!
            var blastRadius = 32;
            unit.w = blastRadius * 2;
            unit.h = blastRadius * 2;
            var hitObjects = poolMod.getOverlaping(unit, uDat.hitPool);
            hitObjects.forEach(function(target){
                var d = poolMod.distance(unit, target);
                d = d > blastRadius ? blastRadius: d;
                var damagePer = 1 - (d / blastRadius);
                target.data.hp -= uDat.attack * damagePer;
                target.data.hp = target.data.hp < 0 ? 0 : target.data.hp;
                if(target.data.hp === 0){
                    poolMod.purge(target, game);
                }
           });
           poolMod.purge(unit, game);
       }
   };


// THE OPTIONS OBJECT 
    var UNIT_OPTIONS = {
        typeKey: 'shots',
        count: 10,
        disableLifespan: true
    };

    // unit modes
    var UNIT_MODES = {};
   
    // The atRange mode is what needs to happen when a shot is at or beyond the max range of the shot
    UNIT_MODES.atRange = {
        init: function(unit, pool, game){},
        update: function(unit, pool, game, secs){
            // call at range method for the current subType
            unit.data.subTypeObj.atRange(unit, pool, game, secs);
        }
    };

    // a shot enters hit mode when a shot hits one ore more units in the hitPool of the shot
    UNIT_MODES.hit = {
        init: function(unit, pool, game){},
        update: function(unit, pool, game, secs){
            var uDat = unit.data;
            var hitObjects = poolMod.getOverlaping(unit, uDat.hitPool);
            unit.data.subTypeObj.onHit(unit, pool, game, secs, hitObjects);
        }
    };
 
    // The general move mode of a shot
    UNIT_MODES.move = {
        init: function(unit, pool, game){},
        update: function(unit, pool, game, secs){
            var uDat = unit.data;
            // distance from start position
            var ds = poolMod.distance(unit, uDat.sx, uDat.sy);
            // move and switch to at rangMode if set range is reached
            poolMod.moveByPPS(unit, secs);
            // if distance from start point is at or over range
            if(ds >= uDat.range){
                // make sure shot is at range, not beyond
                unit.x = uDat.sx + Math.cos(unit.heading) * uDat.range;
                unit.y = uDat.sy + Math.sin(unit.heading) * uDat.range;
                // switch to at range mode
                unitsMod.changeMode(unit, 'atRange', pool, game);
            }
            // end point check
            if(uDat.subTypeObj.endPointCheck){
               // is the distance from the start point greater than that distance to the end point?
               var de = utils.distance(uDat.sx, uDat.sy, uDat.ex, uDat.ey);
               if(ds >= de){
                   
                   unit.x = uDat.sx + Math.cos(unit.heading) * de;
                   unit.y = uDat.sy + Math.sin(unit.heading) * de;
                   uDat.subTypeObj.onEndPoint(unit, pool, game, secs);
               }
            }
            // check hit pool and switch to hitMode if one or more objects where hit
            if(uDat.hitPool && uDat.subTypeObj.hitCheck){
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
        // current mode of the unit
        uDat.mode = spawnOpt.mode || 'move';
        // SHOT STATS
        // core stats
        unitsMod.coreStats(unit, spawnOpt, SHOT_DEFAULTS);
        uDat.subTypeObj = utils.getPath(subTypes, uDat.subType, {});
        // shot hitPool - a pool to check on each update to see if something that hot or not
        uDat.hitPool = spawnOpt.hitPool || null;
        // colors
        uDat.strokeStyle = spawnOpt.strokeStyle || 'white';
        uDat.fillStyle = spawnOpt.fillStyle || 'white';
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
        // end x and y used for shells
        uDat.ex = spawnOpt.ex;
        uDat.ey = spawnOpt.ey;
        // heading and speed not used
        unit.heading = spawnOpt.heading || 0;
        // apply accuracy
        var delta = SHOT_MAX_ACCURACY_HEADING_DELTA,
        accuracy = spawnOpt.accuracy === undefined ? 0 : spawnOpt.accuracy;
        delta = delta * -1 + delta * 2 * Math.random();
        unit.heading += delta * (1 - accuracy);
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
