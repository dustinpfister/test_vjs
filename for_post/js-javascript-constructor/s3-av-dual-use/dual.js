var Point = function (x, y) {
    // Point function is being used as a constructor
    // with the new keyword
    if (this.constructor.name === 'Point') {
        this.x = x;
        this.y = y;
    } else {
        // else The Point function is just being called
        return {
            x: x,
            y: y
        }
    }
};

Point.distance = function (pointA, pointB) {
    return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
};

Point.prototype.distance = function (pointB) {
    return Point.distance(this, pointB);
};


// Use examples
var pt1 = new Point(10, 10),
pt2 = Point(15, 10);

console.log( pt1.distance(pt2) ); // 5
console.log( Point.distance(pt1, pt2) ); // 5