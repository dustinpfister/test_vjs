// simple constructor function example
//
function Box(x, y, w, h) {
    this.x = x === undefined ? 0 : x;
    this.y = y === undefined ? 0 : y;
    this.w = w === undefined ? 10 : w;
    this.h = h === undefined ? 10 : h;
};
 
Box.prototype.area = function () {
    return this.w * this.h;
};
 
var bx = new Box();
console.log(bx.area()); // 100
