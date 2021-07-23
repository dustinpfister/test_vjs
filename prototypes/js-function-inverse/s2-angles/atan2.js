// get a when normalized x, and y are known
var getA = function (x, y) {
    var n = Math.atan2(y, x),
    radian = n < 0 ? Math.PI + (Math.PI - Math.abs(n)) : n;
    return radian / (Math.PI * 2) * 360;
};
/*
// get x, and y, when a is known
var getY = function (x, base) {
return Math.log(x) / Math.log(base);
};
 */

console.log(getA(10, 0));
console.log(getA(0, 10));
console.log(getA(-10, 0));
console.log(getA(10, -10));
