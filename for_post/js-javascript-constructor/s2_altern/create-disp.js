
var utils = {};

utils.createPoint = function (x, y) {
    return {
        x: x === undefined ? 0 : x,
        y: y === undefined ? 0 : y
    };
};

utils.distance = function (point, a, b) {
    var x = 0,
    y = 0;
    if (typeof a === 'number') {
        x = a;
        y = b === undefined ? 0 : b;
    }
    if (typeof a === 'object') {
        x = a.x;
        y = a.y;
    }
    return Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
};

var pt1 = utils.createPoint(45, 20);
console.log( utils.distance(pt1, 0, 0) );
