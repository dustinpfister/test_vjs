
var p1 = {
    x: 50,
    y: 50
},
p2 = {
    x: 75,
    y: 100
};

// a findAngle method that takes four arguments and returns and angle in degrees
var findAngle = function (x1, y1, x2, y2) {
    return ( Math.atan2(y1 - y2, x1 - x2) + Math.PI )  / Math.PI * 180;
};
var a = findAngle(p1.x, p1.y, p2.x, p2.y);
console.log(a); // 63.43
