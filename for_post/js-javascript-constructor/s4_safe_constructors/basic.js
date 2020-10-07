var Point = function (x, y) {

    if (!(this instanceof Point)) {
        return new Point(x, y);
    }
    this.x = x;
    this.y = y;
};

var a = new Point(10, 10),
b = Point(10, 10);

console.log( a instanceof Point); // true
console.log( b instanceof Point); // true