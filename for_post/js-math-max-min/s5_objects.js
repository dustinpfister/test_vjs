// get an array of numbers from a set of objects
var getAxisValues = function (points, axis) {
    axis = axis === undefined ? 'x' : axis;
    return points.map(function (obj) {
        return obj[axis];
    });
};

// get low or high
var getLorHofAxis = function (points, axis, minMax) {
    axis = axis === undefined ? 'x' : axis;
    minMax = minMax === undefined ? 'min' : minMax;
    return Math[minMax].apply(null, getAxisValues(points, axis));
};

var points = [{x: 20, y: 35},{x: -15, y: 83},{x: 7, y: 0}],
xLow = getLorHofAxis(points),
yHi = getLorHofAxis(points, 'y', 'max');
console.log(xLow); // -15
console.log(yHi); // 83
