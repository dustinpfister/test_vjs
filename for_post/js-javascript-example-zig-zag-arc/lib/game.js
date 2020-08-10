
var gameMod = (function () {

    var dispUpdateMethods = [
        function (disp, state, secs) {
            var per = disp.i / disp.iMax,
            arcPer = utils.linPerToArcPer(per),
            h = state.mainBox.height - disp.h / 2;
            disp.y = h - h * arcPer;
        },
        function (disp, state, secs) {
            var per = disp.i / disp.iMax,
            zigPer = utils.linPerToZigZagPer(per, disp.waves),
            w = state.mainBox.width - disp.w / 2,
            h = state.mainBox.height - disp.h;
            disp.x = disp.w / 2 + w * zigPer;
            disp.y = h * per;
        }
    ];

    var api = {};

    var createDispObject = function () {
        var disp = {
            active: false,
            x: 0,
            y: 0,
            w: 32,
            h: 32,
            i: 0,
            iMax: 200,
            updateMethodIndex: 1
        };
        return disp;
    };

    var createPool = function (count) {
        var pool = [],
        i = 0;
        while (i < count) {
            pool.push(createDispObject());
            i += 1;
        }
        return pool;
    };

    var getNextInactive = function (pool) {
        var i = 0,
        len = pool.length;
        while (i < len) {
            if (!pool[i].active) {
                return pool[i];
            }
            i += 1;
        }
        return false;
    };

    // create
    api.create = function (mainBox) {
        mainBox = mainBox || {
            width: 320,
            height: 240
        };
        var state = {
            ver: '0.0.0',
            mainBox: mainBox,
            spawn: {
                rate: 0.5,
                secs: 0
            },
            pool: createPool(20)
        };
        return state;
    };

    // update
    api.update = function (state, secs) {

        state.spawn.secs += secs;
        if (state.spawn.secs >= state.spawn.rate) {
            // make inactive disps active
            var disp = getNextInactive(state.pool),
            w;
            if (disp) {
                disp.active = true;
                disp.i = 0;
                disp.waves = 2 + Math.floor(3 * Math.random());
                w = state.mainBox.width - (disp.w / 2);
                disp.x = disp.w / 2 + w - w * Math.random();
                disp.updateMethodIndex = Math.floor(dispUpdateMethods.length * Math.random());
            }
            state.spawn.secs %= state.spawn.rate;
        }

        // update disps
        var i = 0,
        len = state.pool.length,
        disp;
        while (i < len) {
            disp = state.pool[i];
            if (disp.active) {
                disp.i += 1;
                if (disp.i >= disp.iMax) {
                    disp.active = false;
                } else {
                    dispUpdateMethods[disp.updateMethodIndex](disp, state, secs);
                }
            }
            i += 1;
        }

    };

    return api;

}
    ());
