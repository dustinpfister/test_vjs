var unitsMod = (function () {
 
//  CONST VALUES
    var UNIT_PPS_MIN = 32,
    UNIT_PPS_MAX = 64;
    // the unit types object that is to be extended
    // by calling unitsMod.load
    var UNIT_TYPES = {};
 
//  PUBLIC API
    // the public api
    var api = {};
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
