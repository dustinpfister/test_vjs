

var utils = {};

utils.mod = function (x, m) {
    return (x % m + m) % m;
};

utils.normalizeHalf = function (n, scale) {
    scale = scale === undefined ? 360 : scale;
    var h = scale / 2;
    return utils.mod(n + h, scale) - h;
};

utils.getAngleTo = function (unit, target, scale) {
    scale = scale === undefined ? 360 : scale;
    var radian = Math.atan2(unit.y - target.y, unit.x - target.x) + Math.PI;
    return (radian / (Math.PI * 2) * scale) % scale;
};

utils.getAngleDistance = function (a, b, scale) {
    scale = scale === undefined ? 360 : scale;
    var h = scale / 2;
    var diff = utils.normalizeHalf(a - b);
    if (diff > h) {
        diff = diff - scale;
    }
    return Math.abs(diff);
};

utils.getShortestAngleDirection = function (from, to, scale) {
    var z = from - to;
    if (from === to) {
        return 0;
    } else if (utils.normalizeHalf(z, scale) < 0) {
        return 1; // clockWise
    } else {
        return -1; // Counter clock wise
    }
};

console.log(utils.getAngleDistance(0, 300, 360)); // 60
console.log( utils.getShortestAngleDirection(45, 0, 360) ); // -1
console.log( utils.getShortestAngleDirection(45, 90, 360) ); // 1
