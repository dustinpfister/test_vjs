
var Box = (function () {

    var clone = function (bx) {
        return JSON.parse(JSON.stringify(bx));
    };

    var api = {};

    api.create = function (opt) {
        opt = opt || {};
        return {
            x: opt.x === undefined ? 0 : opt.x,
            y: opt.y === undefined ? 0 : opt.y,
            w: opt.w === undefined ? 32 : opt.w,
            h: opt.h === undefined ? 32 : opt.h
        };
    };

    api.moveByHeading = function (bx, heading, delta) {
        heading = heading === undefined ? 0 : heading;
        delta = delta === undefined ? 1 : delta;
        var nbx = clone(bx);
        nbx.x = nbx.x + nbx.w / 2 + Math.cos(heading) * delta;
        nbx.y = nbx.y + nbx.h / 2 + Math.sin(heading) * delta;
        return nbx;
    };

    return api;

}
    ());
