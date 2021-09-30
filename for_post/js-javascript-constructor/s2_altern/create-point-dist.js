
var Points = {};

Points.create = function (x, y) {
    return {
        x: x === undefined ? 0 : x,
        y: y === undefined ? 0 : y
    };
};

Points.distance = function (point, a, b) {
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

var pt1 = Points.create(45, 20);

console.log( Points.distance(pt1, 0, 0) );
