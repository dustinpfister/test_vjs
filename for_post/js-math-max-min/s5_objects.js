var getLorHofAxis = function (points, axis, minMax) {
    axis = axis === undefined ? 'x' : axis;
    minMax = minMax === undefined ? 'min' : minMax;
    return Math[minMax].apply(null, points.map(function (obj) {
            return obj[axis];
        }));

};

var points = [{x: 20, y: 35},{x: -15, y: 83},{x: 7, y: 0}],
xLow = getLorHofAxis(points),
yHi = getLorHofAxis(points, 'y', 'max');
console.log(xLow); // -15
console.log(yHi); // 83
