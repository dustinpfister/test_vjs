var waves = (function () {

    var api = {};

    var spawn = function (obj, pool, state, opt) {

        obj.lifespan = Infinity;
    };

    var update = function (obj, pool, state, secs) {};

    api.create = function (opt) {
        opt = opt || {};
        var waveButtons = poolMod.create({
                count: 10, // max number of buttons on the canvas
                spawn: spawn,
                update: update,
                x: 0,
                y: opt.startY || 0,
                data: {
                    waveCount: opt.waveCount || 30, // total number of waves
                }
            });
        return {
            x: opt.x || 0, // the upper left position of the wave bar
            y: opt.y || 0,
            waveButtons: waveButtons
        };
    };

    return api;

}
    ());
