let Point = function (x, y) {

    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;

    if (!(this instanceof Point)) {
        return {
            x: x,
            y: y
        }
    }

};

console.log(new Point(5, 5));
// Point { x: 5, y: 5, dx: 0, dy: 0 }
console.log(Point(5, 5));
// { x: 5, y: 5}
