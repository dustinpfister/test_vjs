var waveMod = (function () {

    var BUTTON_HEIGHT = 128,
    BUTTON_BASE_PPS = 16,
    BUTTON_RUSH_PPS = 32;

    var api = {};

    // spawn an update methods
    var spawn = function (obj, pool, sm, opt) {
        obj.heading = Math.PI * 1.5;
        obj.pps = opt.pps || BUTTON_BASE_PPS;
        obj.h = BUTTON_HEIGHT;
        obj.lifespan = Infinity;
        obj.x = opt.x || 0;
        obj.y = opt.startY;

        obj.data.waveNumber = pool.data.waveNumber || 0;

        pool.data.waveNumber += 1;
        pool.data.toSpawn -= 1;
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
                    waveNumber: 1,
                    waveCount: opt.waveCount || 0, // total number of waves
                    toSpawn: opt.waveCount,
                    activeCount: 4
                }
            });
        // set all to active
        //poolMod.setActiveStateForAll(pool, true);
        pool.objects.map(function (obj, i) {
            // if i is less than wave count then start the object
            // off as active
            if (i < opt.waveCount) {
                poolMod.spawn(pool, sm, {
                    x: opt.x,
                    startY: opt.startY + i * BUTTON_HEIGHT
                });
            }
        });
        return {
            x: opt.x || 0, // the upper left position of the wave bar
            y: opt.y || 0,
            pool: pool
        };
    };

    var getLowsetActive = function (pool) {
        var lowest = {
            y: 0,
            obj: {}
        };
        pool.objects.forEach(function (obj, i) {
            if (obj.active && obj.y > lowest.y) {
                lowest.y = obj.y;
                lowest.obj = obj;
            }
        });
        return lowest.obj;
    };

    api.update = function (sm, secs) {
        // get pool
        var pool = sm.game.waveButtons.pool;
        // update all buttons
        poolMod.update(pool, secs, sm);
        // spawn next button
        pool.data.activeCount = poolMod.activeCount(pool);
        if (pool.data.activeCount < pool.objects.length && pool.data.toSpawn > 0) {
            var lowest = getLowsetActive(pool);
            poolMod.spawn(pool, sm, {
                startY: lowest.y + BUTTON_HEIGHT //sm.canvas.height
            });
        }
    };

    return api;

}
    ());
