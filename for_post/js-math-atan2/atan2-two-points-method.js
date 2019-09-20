
var p1 = {
    x: 50,
    y: 50
},
p2 = {
    x: 75,
    y: 100

};

var findAngle = function (x1, y1, x2, y2) {
    return Math.atan2(y1 - y2, x1 - x2) + Math.PI;
};

console.log(findAngle(p1.x, p1.y, p2.x, p2.y) / Math.PI * 180); // 63.43
