var utils = {};

utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

// bounding box
utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < y2 ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};

// is browser?
utils.isBrowser = (function(global){
    return function () {
        try {
            return global === window;
        } catch (e) {
            return false;
        }
    };
}(this));

// if nodejs, export utils
if (!utils.isBrowser()) {
    module.exports = utils;
}

