//var pointsExp = function (sx, sy, base, expStart, expEnd, xMulti, yMulti, iStep) {
var pointsExp = function (opt) {
    opt = opt || {};

    var sx = opt.sx === undefined ? 0 : opt.sx,
    sy = opt.sy === undefined ? 0 : opt.sy,
    base = opt.base === undefined ? 2 : opt.base,
    expStart = opt.expStart === undefined ? 0 : opt.expStart,
    expEnd = opt.expEnd === undefined ? 8 : opt.expEnd,
    xMulti = opt.xMulti === undefined ? 30 : opt.xMulti,
    yMulti = opt.yMulti === undefined ? 1 : opt.yMulti,
    iStep = opt.iStep === undefined ? 1 : opt.iStep;

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
