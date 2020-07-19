var points = (function () {

    var api = {};

    // generate some points
    api.gen = function (count, width, height) {
        count = count === undefined ? 10 : count;
        width = width === undefined ? 160 : width;
        height = height === undefined ? 120 : height;
        var points = [];
        var i = 0;
        while (i < count) {
            points.push({
                x: Math.floor(Math.random() * width),
                y: Math.floor(Math.random() * height)
            })
            i += 1;
        }
        return points;
    };

    // get an array of numbers from a set of objects
    var getAxisValues = function (points, axis) {
        axis = axis === undefined ? 'x' : axis;
        return points.map(function (obj) {
            return obj[axis];
        });
    };

    api.getLorH = function (points, minMax) {
        minMax = minMax === undefined ? 'min' : minMax;
        return {
            x: Math[minMax].apply(null, getAxisValues(points, 'x')),
            y: Math[minMax].apply(null, getAxisValues(points, 'y'))
        }
    };

    // get ranges for each axis
    api.getAxisRanges = function (points) {
        var xValues = getAxisValues(points, 'x'),
        yValues = getAxisValues(points, 'y');
        return {
            x: Math.max.apply(null, xValues) - Math.abs(Math.min.apply(null, xValues)),
            y: Math.max.apply(null, yValues) - Math.abs(Math.min.apply(null, yValues))
        }
    };

    // normalize points
    var normalize = function (points) {
        var range = api.getAxisRanges(points);
        return points.map(function (pt) {
            return {
                x: pt.x / range.x,
                y: pt.y / range.y
            }
        });
    };

    // move and scale points
    api.move = function (points, x, y, w, h) {
        return normalize(points).map(function (pt) {
            return {
                x: x + pt.x * w,
                y: y + pt.y * h
            };
        });
    };

    return api;

}
    ());
