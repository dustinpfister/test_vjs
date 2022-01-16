unitsMod.load( (function () {

    ATTACKER_SPAWN_RADIUS = [450, 600];

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
   
    // attack the current target switching back to idle if the target is null of not active
    UNIT_MODES.attackTarget = {
        init: function(unit, pool, game){},
        update: function(unit, pool, game, secs){
            var uDat = unit.data;
            // set overlap color in move mode also for now
            setOverlapColor(unit);
            // fire at target
            unitsMod.fireAtTarget(unit, {
                game: game,
                secs: secs,
                hitPool: game.buildings,
                onNoTarget: function(unit, game){
                    unitsMod.changeMode(unit, 'idle', pool, game);
                }
            });
        }
    };

    // move to the current target, and switch to attackTarget mode when it range. For othe cases switch back to idle
    UNIT_MODES.moveToTarget = {
        init: function(unit, pool, game){

        },
        update: function(unit, pool, game, secs){
            // set overlap color in move mode also for now
            setOverlapColor(unit);
            // update target?
            unitsMod.getTarget(unit, game.buildings, game);
            // ref to target
            var target = unit.data.target;
            // if target is null return to idle mode
            if(target === null){
                unitsMod.changeMode(unit, 'idle', pool, game);
            }else{
                // if target is no longer active, set target back to null, and go back to idle mode
                if(!target.active){
                    unit.data.target = null;
                    unitsMod.changeMode(unit, 'idle', pool, game);
                }else{
                    // distance and abgle
                    var d = poolMod.distance(unit, unit.data.target),
                    a = poolMod.getAngleTo(unit, unit.data.target);
                    // set heading of unit to move to target
                    unit.heading = a;
                    // if distance to building is greater that range move
                    if(d > 120){
                        poolMod.moveByPPS(unit, secs);
                    }else{
                       // else the unit is in range, and thus can attack
                       unitsMod.changeMode(unit, 'attackTarget', pool, game);
                    }
                }
            }
        }
    };

    // get a target and switch to move to target, or back to idle
    UNIT_MODES.getTarget = {
        init: function(unit, pool, game){
            unit.data.target = null;
        },
        update: function(unit, pool, game, secs){
            // try to get a target
            unitsMod.getTarget(unit, game.buildings, game);
            // if we have a target move to it
            if(unit.data.target){
                unitsMod.changeMode(unit, 'moveToTarget', pool, game);
            }else{
                // no active targets? return to idle
                unitsMod.changeMode(unit, 'idle', pool, game);
            }
        }
    };

    UNIT_MODES.moveOut = {
        init: function(unit, pool, game){
            unit.heading += Math.PI;
            unit.heading = utils.mod(unit.heading, utils.PI2);

            unit.data.yaw = Math.PI / 180 * (-10 + 20 * Math.random())
        },
        update: function(unit, pool, game, secs){
            var canvas = game.sm.canvas;
            // set overlap color in move mode also for now
            setOverlapColor(unit);
            var targets = poolMod.getActiveObjects(game.buildings),
            targetCount = targets.length;
            if(targetCount > 5){
                unitsMod.changeMode(unit, 'idle', pool, game);
            }
            // distance from center
            var dc = poolMod.distance(unit, canvas.width / 2, canvas.height / 2);
            if(dc < ATTACKER_SPAWN_RADIUS[0]){
                unit.heading += unit.data.yaw * secs;
                unit.heading = utils.mod(unit.heading, utils.PI2);
                poolMod.moveByPPS(unit, secs);
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
            // set overlap color for now in this mode
            setOverlapColor(unit);
            // if there are targets switch to getTarget mode
            var targets = poolMod.getActiveObjects(game.buildings),
            targetCount = targets.length;
            if(targetCount > 0){
                unitsMod.changeMode(unit, 'getTarget', pool, game);
            }else{
                // if no targets
                unitsMod.changeMode(unit, 'moveOut', pool, game);
            }
        }
    };

    UNIT_OPTIONS.modes = UNIT_MODES;

    // spawn a unit
    UNIT_OPTIONS.spawn = function (unit, pool, game, spawnOpt) {
        spawnOpt = spawnOpt || {};
        var canvas = game.sm.canvas,
        uDat = unit.data;
        // STATS
        uDat.attack = 1;
        uDat.range = 150;

        uDat.fireRate = 0.25;
        uDat.fireSecs = 0;
        uDat.accuracy = 0.25;
        uDat.hpMax = 10;
        uDat.hp = unit.data.hpMax;

        // the current target to attack
        uDat.target = null;
        // mode of the unit
        uDat.mode = spawnOpt.mode || 'idle';
        // colors
        uDat.fillStyle = '#aa0000';
        // alpha
        uDat.alpha = 1;
        // size
        unit.w = 32;
        unit.h = 32;
        // start position
        Object.assign(unit, getAttackerStartPos(game));
        // heading
        unit.heading = unitsMod.randomHeading();
        // speed
        unit.pps = 128; //unitsMod.randomPPS();
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
        poolMod.spawn(pool, game, {});
    }

    // return the OPTIONS object to use to create
    // this type of unit
    return UNIT_OPTIONS;
}
    ()) );
