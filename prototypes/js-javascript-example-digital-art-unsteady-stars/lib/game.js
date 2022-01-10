var gameMod = (function () {
 
    var UNIT_COLORS = ['red', 'green', 'blue', 'pink', 'purple', 'orange', 'black'],
    UNIT_ALPHA = 0.8,
    UNIT_SIZE_MIN = 32,
    UNIT_SIZE_MAX = 256,
    //UNIT_NPR_MIN = 4,
    //UNIT_NPR_MAX = 7,
    UNIT_NPR_RATIO_MIN = 0.025, // Unit New Point Radius Min + Max values used for new points to create 'unsteady star' effect
    UNIT_NPR_RATIO_MAX = 0.05;
 
/*  HELPERS */
 
    var changeMode = function(unit, modeKey, pool, game){
        var uDat = unit.data;
        // old mode object
        //var oldModeObj = UNIT_MODES[uDat.mode];
        // update mode key of unit and get new modeObj
        uDat.mode = modeKey;
        var modeObj = UNIT_MODES[uDat.mode];
        uDat.modeTime = 0;
        uDat.lastRoll = 0;
        // call init hook of new mode obj
        modeObj.init.call(unit, unit, pool, game);
    };
    // random unit color helper
    var randomColor = function(){
        return UNIT_COLORS[ Math.floor(UNIT_COLORS.length * Math.random()) ];
    };
    // random heading helper
    var randomHeading = function(){
       return Math.PI * 2 * Math.random();
    };
    // random ppx helper
    var randomPPS = function(){
       return 32 + Math.round(64 * Math.random());
    };
    var randomSize = function(){
        return Math.round(UNIT_SIZE_MIN + (UNIT_SIZE_MAX - UNIT_SIZE_MIN) * Math.random());
    };
 
/*  UNITS MODES AND OPTIONS */
 
    // unit modes
    var UNIT_MODES = {};
 
    // in rebirth mode the unit will translation from one set of values to another
    UNIT_MODES.rebirth = {
        init: function(unit, pool, game){
            unit.data.oldSize = unit.data.size;
            unit.data.newSize = randomSize();
            unit.data.sizeDelta = -100; // size delta
            unit.data.cx = unit.x + unit.w / 2;
            unit.data.cy = unit.y + unit.h / 2;
            // set frame to zero in order to keep a bug #0 from happening
            // This is something I might want to look into more at some point maybe
            var points = unit.data.points;
            points.frame = 0;
        },
        update: function(unit, pool, game, secs){
            var uDat = unit.data;
            uDat.size += uDat.sizeDelta * secs;
            // clamp size
            uDat.size = uDat.size < 0 ? 0 : uDat.size;
            var size = uDat.size > uDat.newSize ? uDat.newSize : uDat.size;

            // update disp object w and h to size
            unit.w = size;
            unit.h = size;
            unit.x = uDat.cx - size / 2;
            unit.y = uDat.cy - size / 2;
            if(uDat.size === 0){
                uDat.sizeDelta = 100;
                // new heading and speed
                unit.heading = randomHeading();
                unit.pps = randomPPS();
                unit.data.fillStyle = randomColor();
                unit.data.pointsOpt = {
                    fill: randomColor()
                };
                // new points
                unit.data.points = starMod.unsteady({
                    pointCount: 5 + Math.round(5 * Math.random()),
                    radius : size / 2,
                    radiusInner: size / 4,
                    radianAjust: unit.heading,
                    nprMin: Math.round(UNIT_NPR_RATIO_MIN * uDat.newSize), //UNIT_NPR_MIN,
                    nprMax: Math.round(UNIT_NPR_RATIO_MAX * uDat.newSize) //UNIT_NPR_MAX
                });
            }
            if(uDat.sizeDelta > 0){
                size = uDat.size = uDat.size > uDat.newSize ? uDat.newSize : uDat.size;
            }
            unit.data.points = starMod.resizeUnsteady(uDat.points, uDat.size, 2, 4);
            if(size === uDat.newSize && uDat.sizeDelta > 0){
                changeMode(unit, 'move2', pool, game);
            }
        }
    };
    // a more advanced move2 mode where the heading and pps values will change over time
    UNIT_MODES.move2 = {
        init: function(unit, pool, game){
            var uDat = unit.data;

            uDat.oldHeading = unit.heading;
            uDat.targetHeading = randomHeading();
            uDat.targetDir = utils.shortestAngleDirection(unit.heading, uDat.targetHeading);
            uDat.targetDist = utils.angleDistance(unit.heading, uDat.targetHeading, Math.PI * 2);
            uDat.radiansPerSec = Math.PI / 180 * (10 + 80 * Math.random());
            uDat.headingSecs = 0;
        },
        update: function(unit, pool, game, secs){
            var uDat = unit.data;

            uDat.headingSecs += secs;
            var totalSecs = uDat.targetDist / uDat.radiansPerSec;
            var per = uDat.headingSecs / totalSecs;
            per = per > 1 ? 1 : per;
            unit.heading = uDat.oldHeading + uDat.targetDist * uDat.targetDir * per;
            if(per === 1){
                changeMode(unit, 'move2', pool, game);
            }
            // move and wrap
            poolMod.moveByPPS(unit, secs);
            poolMod.wrap(unit, game.sm.canvas, unit.w);
            // update only in move mode
            starMod.unsteady.update(unit.data.points, secs);
        }
    };
    // a simple move mode where the unit will just move by current PPS and heading values
    UNIT_MODES.move = {
        init: function(unit, pool, game){
        },
        update: function(unit, pool, game, secs){
            // move and wrap
            poolMod.moveByPPS(unit, secs);
            poolMod.wrap(unit, game.sm.canvas, unit.w);
            // update only in move mode
            starMod.unsteady.update(unit.data.points, secs);
        }
    };
    // the unit pool options object
    var UNIT_OPTIONS = {
        count: 20,
        disableLifespan: true
    };
    // spawn a unit
    UNIT_OPTIONS.spawn = function (unit, pool, game, spawnOpt) {
        spawnOpt = spawnOpt || {};
        var canvas = game.sm.canvas;
        // mode of the unit
        unit.data.mode = spawnOpt.mode || 'move2';
        unit.data.modeTime = 0; // the total amount of time the unit has been in the current mode
        unit.data.lastRoll = 0; // the amount of time sense the last roll (used for mode switching)
        // colors
        unit.data.fillStyle = randomColor();
        unit.data.pointsOpt = {
            fill: randomColor()
        };
        // alpha
        unit.data.alpha = UNIT_ALPHA;
        // size
        var size = unit.data.size = randomSize();
        unit.w = size;
        unit.h = size;
        // start position
        unit.x = Math.floor( canvas.width * Math.random());
        unit.y = Math.floor( canvas.height * Math.random());
        // heading
        unit.heading = randomHeading();
        // speed
        unit.pps = randomPPS();
        // start points for the unit
        unit.data.points = starMod.unsteady({
            pointCount: 5 + Math.round(5 * Math.random()),
            radius : size / 2,
            radiusInner: size / 4,
            radianAjust: unit.heading,
            nprMin: Math.round(UNIT_NPR_RATIO_MIN * size),
            nprMax: Math.round(UNIT_NPR_RATIO_MAX * size)
        });
        // chance mode
        changeMode(unit, unit.data.mode, pool, game);
    };
    // update a unit
    UNIT_OPTIONS.update = function (unit, pool, game, secs) {
        var uDat = unit.data;
        /*
        modeKey = uDat.mode,
        modeObj = UNIT_MODES[modeKey];
        */
        // update mode time and last roll
        uDat.modeTime += secs;
        uDat.lastRoll += secs;
        // crude yet effective mode switching
        if(uDat.modeTime >= 3 & uDat.lastRoll >= 2){
            var roll = Math.random();
            if(roll > 0.5){
                //uDat.mode = uDat.mode === 'move' ? 'rebirth' : 'move';
                if(uDat.mode === 'move2'){
                    changeMode(unit, 'rebirth', pool, game);
                }
            }
            uDat.lastRoll = 0;
        }
        var modeKey = uDat.mode,
        modeObj = UNIT_MODES[modeKey];
        
        // call update method for star mod
        //starMod.unsteady.update(unit.data.points, secs);
        // call the current mode update method
        modeObj.update(unit, pool, game, secs);
        // wrap and unit that goes out of the canvas in any mode
        //poolMod.wrap(unit, game.sm.canvas, unit.w);
    };
    // purge a unit
    UNIT_OPTIONS.purge = function (obj, pool, game) {};
    // what to do after all the objects have been updated
    UNIT_OPTIONS.afterUpdate = function(pool, secs, game){};
 
/*  PUBLIC API */
 
    // the public api
    var api = {};
 
    // public create method
    api.create = function (opt) {
        opt = opt || {};
        var game = {
            sm: opt.sm || {},
            units: poolMod.create(UNIT_OPTIONS)
        };
        // spawn all for starters
        poolMod.spawnAll(game.units, game, {});
        return game;
    };
    // public update method
    api.update = function (game, secs) {
        // update units
        poolMod.update(game.units, secs, sm.game);
    };
    // return the public API
    return api;
}
    ());
