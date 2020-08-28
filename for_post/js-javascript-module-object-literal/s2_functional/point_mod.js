var pointMod = {
    // no state object in the module, but a method to create
    create: function (x, y) {
        return {
            x: x,
            y: y
        };
    },
    move: function (point, dx, dy) {
        // create a new Point
        var newPoint = this.create(point.x, point.y);
        // mutate the new point, and not the source point
        newPoint.x += dx;
        newPoint.y += dy;
        // return the newPoint without mutating the given source point
        return newPoint;
    }
};

var a = pointMod.create(0, 0);
var b = pointMod.move(a, 5, 7);
b = pointMod.move(b, 0, 3);


console.log(a.x, a.y);
console.log(b.x, b.y);
// 5 10
