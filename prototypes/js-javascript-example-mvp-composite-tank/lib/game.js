
var gameMod = (function () {

    var api = {};

    // the unit pool options object
    var UNIT_OPT = {
        count: 10,
        disableLifespan: true
    }; 
    // random heading helper
    var randomHeading = function(){
       return Math.PI * 2 * Math.random();
    };

    // unit modes
    var UNIT_MODES = {};
    // move mode
    UNIT_MODES.move = {

        update: function(obj, pool, game, secs){
            poolMod.moveByPPS(obj, secs);
            poolMod.wrap(obj, game.sm.canvas, obj.w);
        }
    };

    // spawn a unit
    UNIT_OPT.spawn = function (obj, pool, game, spawnOpt) {
        spawnOpt = spawnOpt || {};
        var canvas = game.sm.canvas;
        // start in move mode by default
        obj.data.mode = spawnOpt.mode || 'move';
        obj.data.alpha = 1;
        // random colors for now
        obj.data.fillStyle = 'white';

        // heading
        obj.heading = randomHeading();
        obj.pps = 32 + 128 * Math.random();
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
    };
    // public create method
    api.create = function (opt) {
        opt = opt || {};
        var game = {
            sm: opt.sm || {},
            units: poolMod.create(UNIT_OPT)
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
