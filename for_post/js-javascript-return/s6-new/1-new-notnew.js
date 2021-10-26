var Point = function (x, y) {
    this.x = x;
    this.y = y;
    if (this.constructor.name != 'Point') {
        return {
            x: x,
            y: y
        };
    }
};

Point.prototype.toString = function () {
    return '(' + this.x + ',' + this.y + ')';
};

var pt = new Point(5, 5),
obj = Point(5, 5);

console.log(pt.x, pt.y, String(pt), pt.constructor.name);
// 5,5 Point
console.log(obj.x, obj.y, String(obj), obj.constructor.name);
// [object Object] Object
