var gameMod = (function () {
    var UNIT_PPS = 32;
    var api = {};

    // on unit spawn
    var unitSpawn = function (obj, pool, sm, opt) {
        obj.heading = Math.PI * 0.5;
        obj.x = sm.canvas.width / 2;
        obj.lifespan = 5;
    };

    // on unit update
    var unitUpdate = function (obj, pool, sm, secs) {
        obj.pps = UNIT_PPS;
    };

    var onWaveStart = function (waveObj, sm) {
        console.log(waveObj.data);
        poolMod.spawn(sm.game.unitPool, sm, waveObj);
    };

    api.create = function () {
        return {
            unitPool: poolMod.create({
                count: 100,
                spawn: unitSpawn,
                update: unitUpdate,
                data: {}
            }),
            waveButtons: waveMod.create({
                startY: 64,
                waveCount: 99
            }),
            onWaveStart: onWaveStart
        };
    };

    api.update = function (sm, secs) {

        // update wave buttons
        waveMod.update(sm, secs);

    };

    return api;
}
    ());
