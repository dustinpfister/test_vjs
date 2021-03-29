var createPoint = function (x, y) {
    return {
        x: x,
        y: y
    };
};

var newPointFrom = function (pt, dx, dy) {
    return createPoint(pt.x + dx, pt.y + dy);
};

var pt = createPoint(15, 5);
// new point at position with given deltas
console.log(newPointFrom(pt, -5, 5)); // { x: 10, y: 10 }
// source point was not mutated
console.log(pt); // { x: 15, y: 5 }