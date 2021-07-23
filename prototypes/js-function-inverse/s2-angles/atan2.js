// get d when normalized x, and y are known
var getD = function (x, y) {
    var n = Math.atan2(y, x),
    radian = n < 0 ? Math.PI + (Math.PI - Math.abs(n)) : n;
    return radian / (Math.PI * 2) * 360;
};

// get a normalized position when d is known
var getPos = function (d) {
    var radian = Math.PI / 180 * d;
    return {
        x: Math.cos(radian),
        y: Math.sin(radian)
    };
};

var d = getD(0.9396926207859084, 0.3420201433256687);
console.log(d); // 20

var pos = getPos(20);
console.log(pos);
// { x: 0.9396926207859084, y: 0.3420201433256687 }