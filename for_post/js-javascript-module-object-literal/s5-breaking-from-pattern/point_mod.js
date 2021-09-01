// starting out with an function expression which is also a kind of object in javaScript
var pointMod = function (x, y) {
    return {
        x: x === undefined ? pointMod.xDefault : x,
        y: y === undefined ? pointMod.yDefault : y
    };
};
// so we can append static methods to it
pointMod.xDefault = 0;
pointMod.yDefault = 0;
// move a point
pointMod.move = function (point, dx, dy) {
    // create a new Point
    var newPoint = pointMod(point.x, point.y);
    // mutate the new point, and not the source point
    newPoint.x += dx;
    newPoint.y += dy;
    // return the newPoint without mutating the given source point
    return newPoint;
};
// distance
pointMod.distance = function (pointA, pointB) {
    return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
};
// so we can not create points like this
var origin = pointMod();
// and my methods still work fine
console.log(pointMod.move(origin,5,10)); // { x: 5, y: 10 }
