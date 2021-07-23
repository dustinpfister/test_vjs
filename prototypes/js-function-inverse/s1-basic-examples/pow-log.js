// get x when I know y and base
var getX = function (y, base) {
    return Math.pow(base, y);
};
// get y when I know x and base
var getY = function (x, base) {
    return Math.log(x) / Math.log(base);
};
// looks good
var x = getX(4, 2);
console.log(x); // 16
var y = getY(x, 2);
console.log(y); // 4