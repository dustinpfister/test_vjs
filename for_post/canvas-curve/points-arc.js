var pointsArc = function (cx, cy, radius, start, end, counterClock, pointCount) {
    cx = cx === undefined ? 0 : cx;
    cy = cy === undefined ? 0 : cy;
    radius = radius === undefined ? 50 : radius;
    start = start === undefined ? 0 : start;
    end = end === undefined ? Math.PI * 2 : end;
    counterClock = counterClock === undefined ? false : counterClock;
    pointCount = pointCount === undefined ? 50 : pointCount;
    var rad,
    points = [],
    d = angle.dist(start, end),
    a = counterClock ? Math.PI * 2 - d : d,
    radDelta = a / (pointCount-1) * (counterClock ? -1: 1),
    i = 0,
    x,
    y;
    while (i < pointCount) {
        rad = start + radDelta * i;
        x = Math.cos(rad) * radius + cx;
        y = Math.sin(rad) * radius + cy;
        points.push(x, y);
        i += 1;
    }
    return points;
};