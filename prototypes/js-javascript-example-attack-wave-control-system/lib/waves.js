var waveMod = (function () {

    var api = {};

    // spawn an update methods
    var spawn = function (obj, pool, sm, opt) {
        obj.heading = Math.PI * 1.5;
        obj.pps = 32; //4;
        obj.h = 128;
        obj.lifespan = Infinity;
    };

    var update = function (obj, pool, sm, secs) {

        poolMod.moveByPPS(obj, secs);
        if (obj.y <= 0) {
            obj.active = false;
        }

    };

    // create a waveButtons pool
    api.create = function (opt) {
        opt = opt || {};
        opt.startY = opt.startY || 0;
        var pool = poolMod.create({
                count: 4, // max number of buttons on the canvas
                spawn: spawn,
                update: update,
                data: {
                    waveCount: opt.waveCount || 0, // total number of waves
                    toSpawn: opt.waveCount
                }
            });
        // set all to active
        //poolMod.setActiveStateForAll(pool, true);
        pool.objects.map(function (obj, i) {
            spawn(obj, pool, {}, {});
            obj.x = opt.x || 0;
            obj.y = opt.startY + obj.h * i;
            // if i is less than wave count then start the object
            // off as active
            if (i < opt.waveCount) {
                obj.active = true;
                pool.data.toSpawn -= 1;
            }
        });
        return {
            x: opt.x || 0, // the upper left position of the wave bar
            y: opt.y || 0,
            pool: pool
        };
    };

    api.update = function (sm, secs) {

        poolMod.update(sm.game.waveButtons.pool, secs, sm);

    };

    return api;

}
    ());
