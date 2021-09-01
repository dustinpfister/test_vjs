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
    api.createBox = function (opt) {
        opt = opt || {};
        return {
            x: 0,
            y: 0,
            w: 32,
            h: 32,
            data: opt.data || createDefaultDataObject()
        };
    };

}
    (utils))

var box = utils.createBox();

console.log(box);
