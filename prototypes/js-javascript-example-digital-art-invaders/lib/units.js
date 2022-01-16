var unitsMod = (function () {
 
//  CONST VALUES
    var UNIT_STATS_DEFAULTS = {
        range: 100,
        attack: 1
    },
    UNIT_PPS_MIN = 32,
    UNIT_PPS_MAX = 64;
    // the unit types object that is to be extended
    // by calling unitsMod.load
    var UNIT_TYPES = {};
 
//  PUBLIC API
    // the public api
    var api = {};

    // parse core stats for a unit
    api.coreStats = function(unit, spawnOpt, defaults){
        defaults = defaults || UNIT_STATS_DEFAULTS;
        var uDat = unit.data;
        uDat.attack = spawnOpt.attack === undefined ? defaults.attack : spawnOpt.attack;
        uDat.range = spawnOpt.range === undefined ? defaults.range: spawnOpt.range;
    };

    // totalPower of a pool
    api.totalPower = function(pool){
        var power = 0;
        // for each active object
        poolMod.getActiveObjects(pool, true).forEach(function(unit){
           var uDat = unit.data;
           // dps
           power += uDat.attack / uDat.fireRate;
           // 
        });
        return Math.round(power);
    };

    // get a target or set current to default null value
    api.getTarget = function(unit, targetPool, game){
        // defualt to no target
        unit.data.target = null;
        // get current active buildings and sort by distance
        var targets = poolMod.getActiveObjects(targetPool).sort(function(a, b){
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
        // if we have one or more targets set a target
        if(targets.length >= 1){
            unit.data.target = targets[0];
        }
    };

    // fire at target method
    api.fireAtTarget = function(unit, opt){
        opt = opt || {};
        opt.onNoTarget = opt.onNoTarget || function(unit, game){};
        opt.secs = opt.secs || 0;
        opt.game = opt.game || {};
        var uDat = unit.data;
        var target = uDat.target;
        // if target is null call onNoTarget
        if(target === null){
            opt.onNoTarget(unit, opt.game);
        }else{
            // if target is longer active, set target back to null, and call onNoTarget
            if(!target.active){
                uDat.target = null;
                opt.onNoTarget(unit, opt.game);
            }else{
                // attack target!
                uDat.fireSecs += opt.secs;
                if(uDat.fireSecs >= uDat.fireRate){
                    uDat.fireSecs = utils.mod(uDat.fireSecs, uDat.fireRate);
                    // spawn a shot
                    poolMod.spawn(opt.game.shots, opt.game, {
                        strokeStyle: opt.strokeStyle || 'yellow',
                        fillStyle: opt.fillStyle || 'yellow',
                        attack: uDat.attack,
                        sx: unit.x,
                        sy: unit.y,
                        heading: poolMod.getAngleTo(unit, target),
                        accuracy: uDat.accuracy,
                        range: uDat.range,
                        hitPool: opt.hitPool
                    });
                }
            }
        }
    };

    // load a unit type 
    api.load = function(typeOptions){
        var typeKey = typeOptions.typeKey || Object.keys(UNIT_TYPES).length; 
        console.log('setting the given typeOptions object at key: ' + typeKey);
        // just ref the object for now if that works okay
        UNIT_TYPES[typeKey] = typeOptions;
    };
    // change the mode of a given unit
    api.changeMode = function(unit, modeKey, pool, game){
        var uDat = unit.data;
        uDat.mode = modeKey;
        var modeObj = pool.data.modes[uDat.mode]; //UNIT_MODES[uDat.mode];
        uDat.modeTime = 0;
        uDat.lastRoll = 0;
        // call init hook of new mode obj
        modeObj.init.call(unit, unit, pool, game);
    };
    // random heading helper
    api.randomHeading = function(){
       return utils.PI2 * Math.random();
    };
    // random ppx helper
    api.randomPPS = function(){
       return UNIT_PPS_MIN + Math.round((UNIT_PPS_MAX - UNIT_PPS_MIN) * Math.random());
    };
    // public create method
    api.create = function (opt) {
        opt = opt || {};
        var typeOptions = UNIT_TYPES[opt.type];
        var unitOpt = typeOptions ? typeOptions : UNIT_OPTIONS;
        var options = Object.assign({}, unitOpt, opt);
        // data object should have the modes
        options.data = {
            modes: options.modes
        };
        return poolMod.create(options);
    };
    // public update method
    api.update = function (units, secs) {
        // update units
        poolMod.update(units, secs);
    };
    // return the public API
    return api;
}
    ());
