var gameMod = (function () {
    var UNIT_PPS = 32,
    UNIT_RELEASE_RATE = 1;
    var api = {};

    // on unit spawn
    var unitSpawn = function (obj, pool, sm, opt) {
        obj.heading = Math.PI * 0.5;
        var delta = sm.canvas.width * 0.5 * Math.random();
        obj.x = sm.canvas.width * 0.25 + delta;
        obj.y = 0;
        obj.lifespan = Infinity;
    };

    // on unit update
    var unitUpdate = function (obj, pool, sm, secs) {
        obj.pps = UNIT_PPS;
        poolMod.moveByPPS(obj, secs);
        if (obj.y >= sm.canvas.height - 50) {
            obj.lifespan = 0;
        }
    };

    var onWaveStart = function (waveObj, sm) {
        sm.game.unitQueue.unitCount += waveObj.data.unitCount;
    };

    api.create = function () {
        return {
            unitQueue: {
                unitCount: 0,
                secs: 0
            },
            unitPool: poolMod.create({
                count: 100,
                spawn: unitSpawn,
                update: unitUpdate,
                data: {}
            }),
            waveButtons: waveMod.create({
                startY: 64,
                waveCount: 99,
                baseUnitCount: 10
            }),
            onWaveStart: onWaveStart
        };
    };

    api.update = function (sm, secs) {

        if (sm.game.unitQueue.unitCount > 0) {
            sm.game.unitQueue.secs += secs;
            if (sm.game.unitQueue.secs > UNIT_RELEASE_RATE) {
                var unit = poolMod.spawn(sm.game.unitPool, sm, {});
                if (unit) {
                    sm.game.unitQueue.unitCount -= 1;
                }
                sm.game.unitQueue.secs = 0;
            }
        }

        // update wave buttons
        waveMod.update(sm, secs);

        //
        poolMod.update(sm.game.unitPool, secs, sm);

    };

    return api;
}
    ());
