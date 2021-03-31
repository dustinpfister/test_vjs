var waveMod = (function () {

    var api = {};

    var spawn = function (obj, pool, state, opt) {

        obj.lifespan = Infinity;
    };

    var update = function (obj, pool, state, secs) {};

    api.create = function (opt) {
        opt = opt || {};
        opt.startY = opt.startY || 0;
        var pool = poolMod.create({
                count: 10, // max number of buttons on the canvas
                spawn: spawn,
                update: update,
                data: {
                    waveCount: opt.waveCount || 30, // total number of waves
                }
            });

        // set all to active
        poolMod.setActiveStateForAll(pool, true);

        pool.objects.map(function (obj, i) {

            obj.x = opt.x || 0;
            obj.y = opt.startY + obj.h * i

        });

        return {
            x: opt.x || 0, // the upper left position of the wave bar
            y: opt.y || 0,
            pool: pool
        };
    };

    return api;

}
    ());
