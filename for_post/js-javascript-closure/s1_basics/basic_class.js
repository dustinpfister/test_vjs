
var Point = function (x, y) {
    this.x = x;
    this.y = y;
};

Point.prototype.move = function (dx, dy) {
   this.x += dx;
   this.y += dy;
   return this;
};

var pt = new Point(15, 5);

console.log(pt.move(-5, 5)); // Point { x: 10, y: 10 }
