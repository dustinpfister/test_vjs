
var gameMod = (function () {
    // the public api
    var api = {};
    // some constants
    var UNIT_SIZE_RANGE = [32, 256],
    UNIT_TRANSFER_RATE = 150,
    UNIT_TRANSFER_MODE_MAX_PPS = 256,
    UNIT_TRANSFER_MODE_MAX_DIST = 100,
    UNIT_SPLIT_DELAY = 5,
    UNIT_CHASE_PPS_DELTA = 64,
    UNIT_PPS_RANGE = [32, 128],
    UNIT_MASS_PER = 50,
    UNIT_COUNT = 50,
    UNIT_MAX_ALPHA = 0.7,
    UNIT_COLORS = ['red', 'lime', 'blue', 'white', 'purple', 'pink'],
    BUG0_TEMP = [1.90, 0.10];          // bug #0 temp fix values used in updateByMass helper
    // the unit pool options object
    var UNIT_OPT = {
        count: UNIT_COUNT,
        disableLifespan: true
    }; 
    // get adjusted center helper
    var getAdjustedCenter = function(game, obj){
        var canvas = game.sm.canvas;
        return {
            x : canvas.width / 2 - obj.x - obj.w / 2,
            y : canvas.height / 2 - obj.y - obj.h / 2 
        };
    };
    // distToCenter helper
    var distToCenter = function(game, obj){
        var centerPos = getAdjustedCenter(game, obj);
        return utils.distance(0, 0, centerPos.x, centerPos.y);
    };
    // random heading helper
    var randomHeading = function(){
       return Math.PI * 2 * Math.random();
    };
    // parse heading helper
    var parseHeading = function(heading, obj, game){
        // if heading is a string
        if(typeof heading === 'string'){
            // for 'center' value set heading to adjusted center
            if(heading === 'center'){
                var pos = getAdjustedCenter(game, obj);
                return Math.atan2(pos.y, pos.x);
            }
            // for random heading
            if(heading === 'random'){
                return randomHeading()
            }
        }
        // return heading value
        return heading;
    };
    // get total mass helper (actual or exspcted)
    var getTotalMass = function(game){
        return game.units.objects.reduce(function(acc, unit){
            return acc + unit.data.mass;
        }, 0);
    };
    var getExpectedTotalMass = function(){
        return UNIT_COUNT * UNIT_MASS_PER;
    };
    // get the size of the given unit object
    var getSize = function (unit) {
        var totalMass = getExpectedTotalMass(); //UNIT_COUNT * UNIT_MASS_PER,
        sizePer = unit.data.mass / totalMass,
        size = UNIT_SIZE_RANGE[0] + (UNIT_SIZE_RANGE[1] - UNIT_SIZE_RANGE[0]) * sizePer;
        return size;
    };
    var randomPPS = function(unit){
        var ppsMin = UNIT_PPS_RANGE[0],
        ppsMax = UNIT_PPS_RANGE[1];
        return ppsMin + Math.floor( (ppsMax - ppsMin) * Math.random());
    };
    var chasePPS = function(unit){
        var ud = unit.data;
        if(ud.target){
            if(ud.target.active){
                return ud.speed.basePPS + UNIT_CHASE_PPS_DELTA;
            }
        }
        return ud.speed.basePPS;
    };
    // move unit helper
    var moveUnit = function(game, obj, secs){
        // parse heading first
        obj.heading = parseHeading(obj.heading, obj, game);
        // move by pps
        poolMod.moveByPPS(obj, secs);
        // wrap
        var size = UNIT_SIZE_RANGE[1];
        var size = obj.w;
        obj.x = utils.wrapNumber(obj.x, size * -1, game.sm.canvas.width + size);
        obj.y = utils.wrapNumber(obj.y, size * -1, game.sm.canvas.height + size);

    };
    // update unit helper
    var updateByMass = function(obj){
        // center position
        var cx = obj.x + obj.w / 2;
        cy = obj.y + obj.h / 2;
        // new size
        var size = getSize(obj);
        obj.w = size;
        obj.h = size;
        // adjust postion
        // !!! TEMP fix for bug #0 
        obj.x = cx - obj.w / (BUG0_TEMP[0] + BUG0_TEMP[1] * Math.random());
        obj.y = cy - obj.h / (BUG0_TEMP[0] + BUG0_TEMP[1] * Math.random());
    };
    // seek unit helper
    var seekUnit = function(game, unit){
        var ud = unit.data,
        getNewTarget = false;
        getNewTarget = ud.target === null ? true : getNewTarget;
        if(ud.target){
           getNewTarget = !ud.target.active ? true: getNewTarget;
        }
        // new new target
        if(getNewTarget){
            var activeUnits = poolMod.getActiveObjects(game.units).filter(function(target){
                return target.i != unit.i;
            }),
            i = activeUnits.length;
            if(activeUnits.length >= 1){
                ud.target = activeUnits[0];
            }
        }
    };
    // unit modes
    var UNIT_MODES = {};
    // move mode
    UNIT_MODES.move = {
        update: function(obj, pool, game, secs){
            // target
            var ud = obj.data;
            if(ud.target === null){
                // seek
                seekUnit(game, obj);
            }
            // if we have a target
            if(ud.target){
                if(ud.target.active){
                    // set heading for target
                    obj.heading = Math.atan2(ud.target.y - obj.y, ud.target.x - obj.x);
                }else{
                    ud.target = null;
                }
            }
            // set pps by chasePPS at this point
            obj.pps = chasePPS(obj);
            // still no target? The this should be the last active div
            if(ud.target === null && game.activeCount === 1){
                obj.heading = 'center';
                var d = distToCenter(game, obj),
                per = d / 300;
                per = per > 1 ? 1 : per;
                obj.pps = UNIT_PPS_RANGE[1] * per;
            }
            // move the unit
            moveUnit(game, obj, secs);
            // if any other unit is under this one switch them over to transfer mode
            // and make it so that the transfer target is this current unit
            var under = poolMod.getOverlaping(obj, pool);
            if (under.length > 0) {
                under.forEach(function (underUnit) {
                    var uud = underUnit.data;
                    // set unit into transfer mode
                    if(uud.mode === 'move'){
                        uud.mode = 'transfer';
                        uud.transferTarget = obj;
                    }
                });
            }
            // if active count is 1, set this last move mode unit to splitup mode
            if(game.activeCount === 1){
                game.splitDelay -= secs;
                if(game.splitDelay <= 0){
                    game.splitDelay = UNIT_SPLIT_DELAY;
                    obj.data.mode = 'splitup';
                }
            }
        }
    };
    // transfer mode
    UNIT_MODES.transfer = {
        update: function(obj, pool, game, secs){
            var target = obj.data.transferTarget;
            // reduce mass
            if(obj.data.mass > 0){
                var mDelta = Math.floor(UNIT_TRANSFER_RATE * secs);
                mDelta = mDelta === 0 ? 1 : mDelta;
                if(obj.data.mass - mDelta < 0){
                    mDelta = Math.round(obj.data.mass);
                }
                obj.data.mass = obj.data.mass - mDelta;
                target.data.mass = target.data.mass + mDelta;
            }else{
                poolMod.purge(pool, obj, game);
            }
            // adjust alpha
            var per = obj.data.mass / UNIT_MASS_PER;
            per = per > 1 ? 1 : per;
            obj.data.alpha = UNIT_MAX_ALPHA * per;
            // update size on unit and target unit
            updateByMass(obj);
            updateByMass(target);
            // how to update heading and speed
            var x1 = obj.x + obj.w / 2,
            y1 = obj.y + obj.h / 2,
            x2 = target.x + target.w / 2,
            y2 = target.y + target.h / 2;
            var d = utils.distance(x1, y1, x2, y2);
            var a = Math.atan2(y2 - y1, x2 - x1);
            obj.heading = a;
            // pps
            var per = d / UNIT_TRANSFER_MODE_MAX_DIST,
            per = per > 1 ? 1 : per;
            obj.pps = UNIT_TRANSFER_MODE_MAX_PPS * per;
            // moce the unit
            moveUnit(game, obj, secs);
        }
    };
    // splitup mode
    UNIT_MODES.splitup = {
        update: function(obj, pool, game, secs){
            // move the unit
            moveUnit(game, obj, secs);
            updateByMass(obj);
            // subtract from delay
            pool.data.splitDelay -= secs;
            // if active count is below UNIT COUNT then spawn new units
            if(game.activeCount < UNIT_COUNT){
                poolMod.getActiveObjects(pool).forEach(function(aObj){
                   aObj.data.mass = UNIT_MASS_PER;
                   updateByMass(aObj);
                });
                var len = UNIT_COUNT - game.activeCount,
                i = 0;
                while(i < len){
                    poolMod.spawn(game.units, game, {
                        mode: 'splitup',
                        mass: UNIT_MASS_PER,
                        heading: 'random',
                        x: obj.x,
                        y: obj.y
                    });
                    i += 1;
                }
            }
        }
    };
    // spawn a unit
    UNIT_OPT.spawn = function (obj, pool, game, spawnOpt) {
        spawnOpt = spawnOpt || {};
        var canvas = game.sm.canvas;
        // start in move mode by default
        obj.data.mode = spawnOpt.mode || 'move';
        obj.data.transferTarget = null;
        obj.data.target = null;
        obj.data.alpha = spawnOpt.alpha === undefined ? UNIT_MAX_ALPHA: spawnOpt.alpha;
        // random colors for now
        obj.data.fillStyle = UNIT_COLORS[ Math.floor(UNIT_COLORS.length * Math.random()) ];
        // heading
        obj.heading = spawnOpt.heading || 'random';
        // speed
        obj.data.speed = {
            basePPS: randomPPS(obj)
        };
        obj.pps = obj.data.speed.basePPS;
        // start mass
        obj.data.mass = spawnOpt.mass === undefined ? UNIT_MASS_PER : spawnOpt.mass;	
        // random pos from center by default
        var r = canvas.height * 0.4,
        a = Math.PI * 2 * Math.random();
        x = canvas.width / 2 - obj.w / 2 + Math.cos(a) * r,
        y = canvas.height / 2 - obj.h / 2 + Math.sin(a) * r;
        // use spawnOpt to set start postion, esle go with random from center
        obj.x = spawnOpt.x === undefined ? x : spawnOpt.x;
        obj.y = spawnOpt.y === undefined ? y : spawnOpt.y;
        // update size and positon based on mass
        updateByMass(obj);
        // move unit by 0 secs this will parse heading for first time
        // as well as prefroming any wrapping of obj.x, and obj.y that might need to happen
        moveUnit(game, obj, 0);
    };
    // update a unit
    UNIT_OPT.update = function (obj, pool, game, secs) {
        // move the unit my pps and wrap
        UNIT_MODES[obj.data.mode].update(obj, pool, game, secs);
    };
    // purge a unit
    UNIT_OPT.purge = function (obj, pool, game) {};
    // what to do after all the objects have been updated
    UNIT_OPT.afterUpdate = function(pool, secs, game){
        // set units back to move if in split up mode
        if(game.activeCount === UNIT_COUNT && game.units.objects[0].data.mode === 'splitup'){
            game.splitDelay -= secs;
            if(game.splitDelay <= 0){
                game.units.objects.forEach(function(obj){
                    obj.data.mode = 'move';
                });
                game.splitDelay = UNIT_SPLIT_DELAY;
            }
        }
    };
    // public create method
    api.create = function (opt) {
        opt = opt || {};
        var game = {
            sm: opt.sm || {},
            units: poolMod.create(UNIT_OPT),
            activeCount: 0,
            totalMass: 0,
            splitDelay: UNIT_SPLIT_DELAY
        };
        // spawn all for starters
        poolMod.spawnAll(game.units, game, {});
        game.activeCount = poolMod.getActiveCount(game.units);
        return game;
    };
    // public update method
    api.update = function (game, secs) {
        game.activeCount = poolMod.getActiveCount(game.units);
        game.totalMass = getTotalMass(game);
        // update units
        poolMod.update(game.units, secs, sm.game);
    };
    // return the public API
    return api;
}
    ());
