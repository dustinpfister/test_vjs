var degreeToRadian = function (deg) {
    return Math.PI / 180 * deg;
};

var getCirclePoint = function (cx, cy, radius, radian) {
    return {
        x: cx + Math.cos(radian) * radius,
        y: cy + Math.sin(radian) * radius
    }
};

var radian = degreeToRadian(45);
var pt = getCirclePoint(0,0, 10, radian);

console.log(pt);
// { x: 7.0710678118654755, y: 7.071067811865475 }