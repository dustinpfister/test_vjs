var p = {};

// scale points
p.scale = function (points, scale, dx, dy) {
    if (!points) {
        return [];
    }
    scale = scale == undefined ? 1 : scale;
    dx = dx == undefined ? 0 : dx;
    dy = dy == undefined ? 0 : dy;
    var i = 0,
    len = points.length,
    scaled = [];
    while (i < len) {
        scaled.push(
            points[i] * scale + dx,
            points[i + 1] * scale + dy);
        i += 2;
    }
};

// get ranges
p.getRanges = function (points) {
    var min = [Infinity, Infinity],
    max = [-Infinity, -Infinity],
    i = 0,
    len = points.length;
    while (i < len) {
        var x = points[i],
        y = points[i + 1];
        min[0] = x < min[0] ? x : min[0];
        min[1] = y < min[1] ? y : min[1];
        max[0] = x > max[0] ? x : max[0];
        max[1] = y > max[1] ? y : max[1];
        i += 2;
    }
    return {
        min: min,
        max: max
    };
};

// normalize points
p.normalize = function (points, center) {
    if (!points) {
        return [];
    }
    center = center === undefined ? true : false;
    var ranges = getRanges(points),
    dx = ranges.min[0] > 0 ? -ranges.min[0] : Math.abs(ranges.min[0]),
    dy = ranges.min[1] > 0 ? -ranges.min[1] : Math.abs(ranges.min[1]),
    w = Math.abs(ranges.max[0] - ranges.min[0]),
    h = Math.abs(ranges.max[1] - ranges.min[1]),
    normals = [],
    i = 0,
    len = points.length,
    ajustAxis = center ? -0.5 : 0;
    while (i < len) {
        normals.push(
            (points[i] + dx) / w + ajustAxis,
            (points[i + 1] + dy) / h + ajustAxis);
        i += 2
    }
    return normals;
};

console.log(normalize([-64, -64, -32, -64, -32, -32, -64, -32]));
console.log(normalize([-32, -32, 0, -32, 0, 0, -32, 0]));
console.log(normalize([-16, -16, 16, -16, 16, 16, -16, 16]));
console.log(normalize([0, 0, 32, 0, 32, 32, 0, 32]));
console.log(normalize([32, 32, 64, 32, 64, 64, 32, 64]));
