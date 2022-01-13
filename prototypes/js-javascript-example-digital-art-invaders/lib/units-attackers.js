unitsMod.load( (function () {

    ATTACKER_SPAWN_RADIUS = [200, 300];

// HELPERS
    var getAttackerStartPos = function(game){
        var canvas = game.sm.canvas,
        cx = canvas.width / 2,
        cy = canvas.height / 2,
        pos = {},
        radian = unitsMod.randomHeading(),
        radius = utils.valueByRange(Math.random(), ATTACKER_SPAWN_RADIUS)
        pos.x = cx + Math.cos(radian) * radius;
        pos.y = cy + Math.sin(radian) * radius;
        return pos;
    };

    var setOverlapColor = function(unit){
        unit.data.fillStyle = 'blue';
        var overlap = poolMod.getOverlaping(unit, unit.pool).length;
        if(overlap > 0){
            unit.data.fillStyle = 'red';
        }
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
    UNIT_MODES.moveToTarget = {
        init: function(unit, pool, game){

        },
        update: function(unit, pool, game, secs){

            setOverlapColor(unit);

            // move and wrap
            poolMod.moveByPPS(unit, secs);
            //poolMod.wrap(unit, game.sm.canvas, unit.w);
        }
    };

    // get a target
    UNIT_MODES.getTarget = {
        init: function(unit, pool, game){
            unit.data.target = null;
        },
        update: function(unit, pool, game, secs){
            // get current active buildings and sort by distance
            var targets = poolMod.getActiveObjects(game.buildings).sort(function(a, b){
                var d1 = poolMod.distance(unit, a),
                d2 = poolMod.distance(unit, b);
                if(d1 < d2){
                    return -1;
                }
                if(d1 > d2){
                    return 1;
                }
                return 0;
            });
            // just get top target by distance
            if(targets.length >= 1){
                unit.data.target = targets[0];
                unitsMod.changeMode(unit, 'moveToTarget', pool, game);
            }else{
                // no active targets? return to idle
                unitsMod.changeMode(unit, 'idle', pool, game);
            }
        }
    };

    // idle mode - what an attacker should do while it is active, but does not have any kind
    // of task such as seeking a target, moving to a new location ect, attacking a building ect.
    UNIT_MODES.idle = {
        init: function(unit, pool, game){
            unit.data.target = null;
        },
        update: function(unit, pool, game, secs){

            setOverlapColor(unit);
            var targets = poolMod.getActiveObjects(game.buildings),
            targetCount = targets.length;

            if(targets.length > 0){
                unitsMod.changeMode(unit, 'getTarget', pool, game);
            }
            // move and wrap
            //poolMod.moveByPPS(unit, secs);
            //poolMod.wrap(unit, game.sm.canvas, unit.w);
        }
    };

    // repositon and set back to idle
/*
    UNIT_MODES.repos = {
        init: function(unit, pool, game){

        },
        update: function(unit, pool, game, secs){

            overClapCount = poolMod.getOverlaping(unit, pool).length;
            if(overClapCount > 0){
                var newPos = getAttackerStartPos(game);
                var areaDisp = poolMod.createDisp(newPos) 
                if( poolMod.getOverlaping(areaDisp, pool).length === 0){
                    Object.assign(unit, newPos);
                    unitsMod.changeMode(unit, 'idle', pool, game);
                }
            }else{
                    unitsMod.changeMode(unit, 'idle', pool, game);
            }

        }
    };
*/

    UNIT_OPTIONS.modes = UNIT_MODES;

    // spawn a unit
    UNIT_OPTIONS.spawn = function (unit, pool, game, spawnOpt) {
        spawnOpt = spawnOpt || {};
        var canvas = game.sm.canvas;
        // the current target to attack
        unit.data.target = null;
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
