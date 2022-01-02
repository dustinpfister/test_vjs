
var gameMod = (function () {
    // the public api
    var api = {};
    // some constants
    var UNIT_SIZE_RANGE = [32, 256],
    UNIT_TRANSFER_RATE = 600,
    UNIT_TRANSFER_MODE_MAX_PPS = 256,
    UNIT_TRANSFER_MODE_MAX_DIST = 100,
    UNIT_COUNT = 50;
    // the unit pool options object
    var UNIT_OPT = {
        count: UNIT_COUNT,
        disableLifespan: true
    };
    // get the size of the given unit object
    var getSize = function (unit) {
        var totalMass = UNIT_COUNT * 50,
        sizePer = unit.data.mass / totalMass,
        size = UNIT_SIZE_RANGE[0] + (UNIT_SIZE_RANGE[1] - UNIT_SIZE_RANGE[0]) * sizePer;
        return size;
    };
    // move unit helper
    var moveUnit = function(game, obj, secs){
        poolMod.moveByPPS(obj, secs);
        var size = UNIT_SIZE_RANGE[1];
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
        obj.x = cx - obj.w / 2;
        obj.y = cy - obj.h / 2;
    };

    var UNIT_MODES = {};

    // move mode
    UNIT_MODES.move = {
        update: function(obj, pool, game, secs){
            //var activeCount = poolMod.getActiveCount(pool);
            // move the unit
            moveUnit(game, obj, secs);
            // if any other unit is under this one add the mass of them and purge them
            var under = poolMod.getOverlaping(obj, pool);
            if (under.length > 0) {
                under.forEach(function (underUnit) {
                    var uud = underUnit.data;
                    // set unit into transfer mode
                    if(uud.mode === 'move'){
                        uud.mode = 'transfer';
                        uud.transferTarget = obj;
                        uud.a = Math.atan2(obj.y - underUnit.y, obj.x - underUnit.x) + Math.PI;
                        uud.d = utils.distance(underUnit.x, underUnit.y, obj.x, obj.y);
                        uud.m = uud.mass;
                    }
                });
            }
            // if active count is 1, set this last move mode unit to splitup mode
            if(game.activeCount === 1){
                obj.data.mode = 'splitup';
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
            obj.data.alpha = obj.data.mass / 50;
            obj.data.alpha = obj.data.alpha > 1 ? 1 : obj.data.alpha;
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
            // if active count is below UNIT COUNT then spawn a new unit
            if(game.activeCount < UNIT_COUNT){
                var hMass = Math.floor(obj.data.mass / 2),
                r = obj.data.mass - hMass * 2;
                // this cuttent unit should be halfMass plus any remainder
                obj.data.mass = hMass + r;
                poolMod.spawn(game.units, game, {
                    mode: 'splitup',
                    mass: hMass,
                    heading: 'random'
                });
            }
            // update size and positon by mass
            updateByMass(obj);
        }
    };

    // spawn a unit
    UNIT_OPT.spawn = function (obj, pool, game, spawnOpt) {
        spawnOpt = spawnOpt || {};
        var canvas = game.sm.canvas;
        // start in move mode by default
        obj.data.mode = spawnOpt.mode || 'move';
        obj.data.transferTarget = null;
        obj.data.alpha = 1;
        // start mass
        obj.data.mass = spawnOpt.mass === undefined ? 50 : spawnOpt.mass;	
        // size and position
        var size = getSize(obj);
        obj.w = size;
        obj.h = size;
        // random pos from center by default
        var r = canvas.height * 0.4,
        a = Math.PI * 2 * Math.random();
        x = canvas.width / 2 - obj.w / 2 + Math.cos(a) * r,
        y = canvas.height / 2 - obj.h / 2 + Math.sin(a) * r;
        // use spawnOpt to set start postion, esle go with random from center
        obj.x = spawnOpt.x === undefined ? x : spawnOpt.x;
        obj.y = spawnOpt.y === undefined ? y : spawnOpt.y;
        // speed and heading
        obj.pps = 32 + Math.floor(64 * Math.random());
        obj.heading = spawnOpt.heading || 'center';
        // heading to center
        if(typeof obj.heading === 'string'){
            if(obj.heading === 'center'){
                obj.heading = Math.atan2(canvas.height / 2 - obj.y, canvas.width / 2 - obj.x);
            }
            if(obj.heading === 'random'){
                obj.heading = Math.PI * 2 * Math.random();
            }
        }
    };
    // update a unit
    UNIT_OPT.update = function (obj, pool, game, secs) {
        // move the unit my pps and wrap
        UNIT_MODES[obj.data.mode].update(obj, pool, game, secs);
    };
    // purge a unit
    UNIT_OPT.purge = function (obj, pool, game) {};
    // public create method
    api.create = function (opt) {
        opt = opt || {};
        var game = {
            sm: opt.sm || {},
            units: poolMod.create(UNIT_OPT),
            activeCount: 0,
            totalMass: 0,
            splitDelay: 3
        };
        // spawn all for starters
        poolMod.spawnAll(game.units, game, {});
        game.activeCount = poolMod.getActiveCount(game.units);
        return game;
    };
    // public update method
    api.update = function (game, secs) {
        game.activeCount = poolMod.getActiveCount(game.units);
        game.totalMass = game.units.objects.reduce(function(acc, unit){
            if(String(unit.data.mass).indexOf('.') != -1){

            }
            return acc + unit.data.mass;
        }, 0);
        // update units
        poolMod.update(game.units, secs, sm.game);


if(game.activeCount === UNIT_COUNT && game.units.objects[0].data.mode === 'splitup'){
    game.splitDelay -= secs;
    if(game.splitDelay <= 0){
        game.units.objects.forEach(function(obj){
            obj.data.mode = 'move';
        });
        game.splitDelay = 3;
    }
}else{
    game.splitDelay = 3;
}


    };
    // return the public API
    return api;
}
    ());