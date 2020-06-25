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
            worth: opt.worth === undefined ? 10
        };
    };

    // create a new item by combining two pre-existing items
    api.combine = function (item1, item2) {
        return api.create({
            worth: item1.worth + item2.worth
        });
    };

    return api;

}
    ());
