var pointMod = (function () {

    var pointDefaults = {
        x: 0,
        y: 0
    };

    var create = function (x, y) {
        return {
            x: x === undefined ? pointDefaults.x : x,
            y: y === undefined ? pointDefaults.y : y
        };
    };

    // plain object api
    return {
        // make create public
        create: create,
        // move a point
        move: function (point, dx, dy) {
            var newPoint = create(point.x, point.y);
            newPoint.x += dx;
            newPoint.y += dy;
            return newPoint;
        },
        // print a point
        print: function (point) {
            console.log('(' + point.x + ',' + point.y + ')')
        }
    };
}
    ());

// use example
var a = pointMod.create();

var b = pointMod.move(a, 10, 35);

pointMod.print(a);
pointMod.print(b);
// (0,0)
// (10, 35)