// starting out with an object literal, and some hard coded defaults
var pointMod = {
    xDefault: 0,
    yDefault: 0
};
// no state object in the module, but a method to create
pointMod.create = function (x, y) {
    return {
        x: x === undefined ? pointMod.xDefault : x,
        y: y === undefined ? pointMod.yDefault : y
    };
};
// move a point
pointMod.move = function (point, dx, dy) {
    // create a new Point
    var newPoint = this.create(point.x, point.y);
    // mutate the new point, and not the source point
    newPoint.x += dx;
    newPoint.y += dy;
    // return the newPoint without mutating the given source point
    return newPoint;
};
// distance
pointMod.distance = function (pointA, pointB) {
	console.log(pointA);
    return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
};

var origin = pointMod.create(),
a = pointMod.move(origin, 10, 5),
b = pointMod.move(origin, 25, 17),
d = pointMod.distance(a, b);
console.log(d.toFixed(2)); // '19.21'
