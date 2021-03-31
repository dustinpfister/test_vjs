var waves = (function () {

    var api = {};

    var spawn = function (obj, pool, state, opt) {

        obj.lifespan = Infinity;
    };

    var update = function (obj, pool, state, secs) {};

    api.create = function (opt) {
        opt = opt || {};
        return {
            waveCount: opt.waveCount || 30, // total number of waves
            waveButtons: poolMod.create({
                count: 10, // max number of buttons on the canvas
                spawn: spawn,
                update: update
            })
        };
    };

    return api;

}
    ());
