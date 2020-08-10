
var gameMod = (function () {

    var dispUpdateMethods = [
        function (disp, state, secs) {
            var per = disp.i / disp.iMax,
            arcPer = utils.linPerToArcPer(per),
            h = state.mainBox.height - disp.h;
            disp.x = 32;
            disp.y = h - h * arcPer;
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
            updateMethodIndex: 0
        };
        return disp;
    };

    var createPool = function () {
        var pool = [];
        pool.push(createDispObject());
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
            pool: createPool()
        };
        return state;
    };

    // update
    api.update = function (state, secs) {

        var disp = getNextInactive(state.pool);

        // make inactive disps active
        if (disp) {
            disp.active = true;
            disp.i = 0;
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
