
var p1 = {
    x: 50,
    y: 50
},
p2 = {
    x: 75,
    y: 50
};

// a findAngle method that takes four arguments and returns and angle in degrees
var findAngle = function (x1, y1, x2, y2, scale) {
    scale = scale === undefined ? 360 : scale;
    var radian = Math.atan2(y1 - y2, x1 - x2) + Math.PI;
    return (radian / (Math.PI * 2) * scale ) % scale;
};

var a = findAngle(p1.x, p1.y, p2.x, p2.y),
b = findAngle(p2.x, p2.y, p1.x, p1.y);
console.log(a, b); // 0 180
