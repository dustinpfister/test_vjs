var pointMod = (function () {
    // private hard coded defaults
    var hard = {
        xDefault: 0,
        yDefault: 0,
        angleScale: 360
    };
    // starting out with an function expression which is also a kind of object in javaScript
    var API = function (x, y) {
        return {
            x: x === undefined ? hard.xDefault : x,
            y: y === undefined ? hard.yDefault : y
        };
    };
    // move a point
    API.move = function (point, dx, dy) {
        // create a new Point
        var newPoint = API(point.x, point.y);
        // mutate the new point, and not the source point
        newPoint.x += dx;
        newPoint.y += dy;
        // return the newPoint without mutating the given source point
        return newPoint;
    };
    // private helper for new move method
    var angleToRadian = function (angle, scale) {
        return Math.PI * 2 * (angle / scale);
    };
    // new move method
    API.moveByAngleAndDist = function (point, angle, dist, scale) {
        scale = scale == undefined ? hard.angleScale : scale;
        dist = dist === undefined ? 1 : dist;
        angle = angle === undefined ? 0 : angle;
        // create a new Point
        var newPoint = API(point.x, point.y),
        radian = angleToRadian(angle, scale);
        newPoint.x += Math.cos(radian) * dist;
        newPoint.y += Math.sin(radian) * dist;
        return newPoint;
    };
    // distance
    API.distance = function (pointA, pointB) {
        return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
    };
    // return the public API
    return API;
}
    ());

var a = pointMod(10, 10);
a = pointMod.moveByAngleAndDist(a, 90, 10);

console.log(a);
// { x: 10, y: 20 }
