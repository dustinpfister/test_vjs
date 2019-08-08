var pointer = function () {
    // point variable local to Pointer function
    var point = {
        x: 5,
        y: 5
    };

    // another global
    var api = {
        dx: 5,
        dy: 5
    };

    // move the point
    api.movePoint = function (dx, dy) {
        // accessing a global variable from within
        // this other nested function within the api
        // object
        point.x += dx === undefined ? this.dx: dx;
        point.y += dy === undefined ? this.dy: dy;
    };

    api.log = function () {
        console.log(point.x, point.y);
    };

    // return api
    return api;

};

var pt = pointer();

pt.log();
// 5 5
pt.movePoint();
pt.log();
// 10 10
pt.movePoint(-10,-10);
pt.log();
// 0 0