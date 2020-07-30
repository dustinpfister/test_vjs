
var Box = (function () {

    var clone = function (bx) {
        return JSON.parse(JSON.stringify(bx));
    };

    var api = {};

    api.create = function (opt) {
        opt = opt || {};
        return {
            ver: '0.1.0',
            x: opt.x === undefined ? 0 : opt.x,
            y: opt.y === undefined ? 0 : opt.y,
            w: opt.w === undefined ? 32 : opt.w,
            h: opt.h === undefined ? 32 : opt.h,
            color: 'white',
            damage: 0,
            DPS: opt.DPS || 5,
            hitCheck: opt.hitCheck || function (bx, secs) {
                this.color = 'white';
                if (api.boundingBox(bx, this)) {
                    this.color = 'red';
                    this.damage += bx.DPS * secs;
                }
            }
        };
    };

    api.boundingBox = function (bx1, bx2) {
        return !((bx1.y + bx1.h) < bx2.y ||
            bx1.y > (bx2.y + bx2.h) ||
            (bx1.x + bx1.w) < bx2.x ||
            bx1.x > (bx2.x + bx2.w));
    };

    api.moveByHeading = function (bx, heading, delta) {
        heading = heading === undefined ? 0 : heading;
        delta = delta === undefined ? 1 : delta;
        var nbx = clone(bx);
        nbx.x = nbx.x + Math.cos(heading) * delta;
        nbx.y = nbx.y + Math.sin(heading) * delta;
        return nbx;
    };

    return api;

}
    ());
