

var utils = {};

// get distance between two points
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

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

utils.getTargetMetrics = function (unit, target, scale) {
    scale = scale === undefined ? 360 : scale;
    var angleToEnemy = utils.getAngleTo(player, enemy, scale);
    return {
        unit: unit,
        target: target,
        angleToEnemey: angleToEnemy,
        angleFromEnemy: utils.getAngleTo(enemy, player, scale),
        distanceToEnemey: utils.distance(player.x, player.y, enemy.x, enemy.y),
        angleDistToEnemy: utils.getAngleDistance(player.heading, angleToEnemy, scale),
        dirToEnemy: utils.getShortestAngleDirection(player.heading, angleToEnemy, scale)
    };
};

// a player object
var player = {
    x: 0,
    y: 0,
    heading: 20
};

var enemy = {
    x: 45,
    y: 45,
    heading: 0
};

var metrics = utils.getTargetMetrics(player, enemy, 360);
console.log(metrics);

/*
{
    unit: {
        x: 0,
        y: 0,
        heading: 20
    },
    target: {
        x: 45,
        y: 45,
        heading: 0
    },
    angleToEnemey: 45,
    angleFromEnemy: 225,
    distanceToEnemey: 63.63961030678928,
    angleDistToEnemy: 25,
    dirToEnemy: 1
}
*/