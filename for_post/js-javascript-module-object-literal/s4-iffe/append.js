var utils = {};

// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

// bounding box
utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        y1 + h1 < y2 ||
        y1 > y2 + h2 ||
        x1 + w1 < x2 ||
        x1 > x2 + w2);
};

// append box methods
(function (api) {
    // private create helper
    var createDefaultDataObject = function () {
        return {
            hp: {
                current: 10,
                max: 10
            }
        };
    };
    // create
    api.boxCreate = function (opt) {
        opt = opt || {};
        var box = {
            x: opt.x === undefined ? 0 : opt.x,
            y: opt.y === undefined ? 0 : opt.y,
            w: opt.w === undefined ? 32 : opt.w,
            h: opt.h === undefined ? 32 : opt.h,
            data: opt.data || createDefaultDataObject()
        };
        return box;
    };
    // overlap check
    api.boxOverlap = function (bx1, bx2) {
        return utils.boundingBox(bx1.x, bx1.y, bx1.w, bx1.h, bx2.x, bx2.y, bx2.w, bx2.h);
    };
}(utils));

// working good
var a = utils.boxCreate();
var b = utils.boxCreate({x: 5});
console.log(utils.boxOverlap(a, b)); // true
b.y = 64;
console.log(utils.boxOverlap(a, b)); // false