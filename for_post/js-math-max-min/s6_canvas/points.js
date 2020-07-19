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
                y: Math.floor(Math.random() * height),
                heading: Math.random() * (Math.PI * 2),
                pps: 32
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
        yValues = getAxisValues(points, 'y'),
        xLow = Math.min.apply(null, xValues),
        yLow = Math.min.apply(null, yValues);
        return {
            x: (Math.max.apply(null, xValues) - Math.abs(xLow)),
            y: (Math.max.apply(null, yValues) - Math.abs(yLow))
        }
    };

    // normalize points
    var normalize = function (points, canvas) {
        var range = api.getAxisRanges(points);
        //l = api.getLorH(points, 'min');
        canvas = canvas || {
            width: range.x,
            height: range.y
        };
        return points.map(function (pt) {
            return {
                //x: (pt.x - l.x) / range.x,
                //y: (pt.y - l.y) / range.y
                x: pt.x / canvas.width,
                y: pt.y / canvas.height
            }
        });
    };

    // move and scale points
    api.move = function (points, x, y, w, h, canvas) {
        return normalize(points, canvas).map(function (pt) {
            return {
                x: x + pt.x * w,
                y: y + pt.y * h
            };
        });
    };

    api.wrap = function (points, canvas) {
        return points.map(function (pt) {
            var x = pt.x,
            y = pt.y;
            x = x < 0 ? canvas.width + x : x;
            y = y < 0 ? canvas.height + y : y;
            x = x >= 320 ? x % 320 : x;
            y = y >= 240 ? y % 240 : y;
            return {
                x: x,
                y: y,
                heading: pt.heading,
                pps: pt.pps
            }
        });
    };

    return api;

}
    ());
