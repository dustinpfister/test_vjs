var waves = (function () {

    var api = {};

    var spawn = function (obj, pool, state, opt) {

        obj.lifespan = Infinity;
    };

    var update = function (obj, pool, state, secs) {

    };

    api.create = function (opt) {
        opt = opt || {};
        return {
            waveButtons: poolMod.create({
                spawn: spawn,
                update: update
            })
        };
    };

    return api;

}
    ());
