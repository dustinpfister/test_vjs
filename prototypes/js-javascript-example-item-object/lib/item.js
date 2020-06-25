var item = (function () {

    var createBox = function (opt) {
        opt = opt || {};
        return {
            x: opt.x === undefined ? 0 : opt.x,
            y: opt.y === undefined ? 0 : opt.y,
            w: opt.w === undefined ? 32 : opt.w,
            h: opt.h === undefined ? 32 : opt.h
        };
    }

    var api = {};

    // create an item object
    api.create = function (opt) {
        opt = opt || {};
        return {
            bx: createBox(opt),
            worth: 10
        };
    };

    return api;

}
    ());
