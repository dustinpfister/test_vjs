var pointsExp = function (sx, sy, base, powStart, powEnd, xMulti, yMulti) {
    sx = sx === undefined ? 0 : sx;
    sy = sy === undefined ? 0 : sy;
    base = base === undefined ? 2 : base;
    powStart = powStart === undefined ? 0 : powStart;
    powEnd = powEnd === undefined ? 5 : powEnd;
    xMulti = xMulti === undefined ? 10 : xMulti;
    yMulti = yMulti === undefined ? -1 : yMulti;

    var points = [],
    i = 0,
    len = powEnd - powStart,
    x,
    y;
    while (i < len) {
        x = sx + i * xMulti;
        y = sy + Math.pow(base, powStart + i) * yMulti;
        points.push(x, y);
        i += 1;
    }
    return points;
};
