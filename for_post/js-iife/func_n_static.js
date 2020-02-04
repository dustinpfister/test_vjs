var bx = (function () {

    // making the api a function
    var api = function (opt) {
        opt = opt || {};
        opt.x = opt.x === undefined ? 0 : opt.x;
        opt.y = opt.y === undefined ? 0 : opt.y;
        opt.w = opt.w === undefined ? 32 : opt.w;
        opt.h = opt.h === undefined ? 32 : opt.h;
    };

    api.distance = function (bx1, bx2) {
        var x1 = bx1.x + bx1.w / 2,
        y1 = bx1.y + bx1.h / 2,
        x2 = bx2.x + bx2.w / 2,
        y2 = bx2.y + bx2.h / 2;
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };

    return api;

}
    ());
