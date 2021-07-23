// get degree and radian function
//var getDegree = function (radian) {
//    return radian / (Math.PI * 2) * 360;
//};
var getRadian = function (degree) {
    return degree / 360 * (Math.PI * 2);
};
var getD = function (x, y) {
    var n = Math.atan2(y, x),
    radian = n < 0 ? Math.PI + (Math.PI - Math.abs(n)) : n;
    return radian / (Math.PI * 2) * 360;
};
// A distance function
var distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

// get position when distance and degree are known
var getPosition = function (dist, degree) {
    var radian = getRadian(degree);
    return {
        x: Math.cos(radian) * dist,
        y: Math.sin(radian) * dist
    }
};

// get distance and degree when position is known
var getDistAngle = function (x, y) {
    var dist = distance(0, 0, x, y);
    return {
        dist: dist,
        degree: getD(x, y)
    }
};


var pos = getPosition(9, 20);
console.log(pos);
// { x: 8.457233587073176, y: 3.0781812899310186 }

var da = getDistAngle(pos.x, pos.y);
console.log(da);
// { dist: 9, degree: 20 }