var pt = {
    x: 0,
    y: 0
};
pt.distance = function (x, y) {
    return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
};
console.log( pt.distance(10, 5).toFixed(2) ); // 11.18