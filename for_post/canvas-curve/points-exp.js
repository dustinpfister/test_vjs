var pointsExp = function (sx, sy, base, expStart, expEnd, xMulti, yMulti, iStep) {
    sx = sx === undefined ? 0 : sx;
    sy = sy === undefined ? 0 : sy;
    base = base === undefined ? 2 : base;
    expStart = expStart === undefined ? 0 : expStart;
    expEnd = expEnd === undefined ? 5 : expEnd;
    xMulti = xMulti === undefined ? 10 : xMulti;
    yMulti = yMulti === undefined ? -1 : yMulti;
    iStep = iStep === undefined ? 1 : iStep;
    var points = [],
    i = 0,
    len = expEnd - expStart,
    x,
    y;
    while (i < len) {
        x = sx + i * xMulti;
        y = sy + Math.pow(base, expStart + i) * yMulti;
        points.push(x, y);
        i += iStep;
    }
    return points;
};
