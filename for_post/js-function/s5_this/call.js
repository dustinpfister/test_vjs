var pt = {
    x: 0,
    y: 0
};
pt.distance = function (x, y) {
    return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
};
var pt2 = {
    x: -10,
    y: -10
}
console.log(pt.distance(0, 0).toFixed(2)); // 0.00
console.log(pt.distance.call(pt2, 0, 0).toFixed(2)); // 14.14
