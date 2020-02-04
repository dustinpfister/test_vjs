var BX = (function () {

    // a private method
    var getCenterPoint = function (bx) {
        return {
            x: bx.x + bx.w / 2,
            y: bx.y + bx.h / 2
        };
    };

    // a public main api a function
    var api = function (opt) {
        opt = opt || {};
        opt.x = opt.x === undefined ? 0 : opt.x;
        opt.y = opt.y === undefined ? 0 : opt.y;
        opt.w = opt.w === undefined ? 32 : opt.w;
        opt.h = opt.h === undefined ? 32 : opt.h;
        return opt;
    };

    // a public static method
    api.distance = function (bx1, bx2) {
        var pos1 = getCenterPoint(bx1),
        pos2 = getCenterPoint(bx2);
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
    };

    return api;

}
    ());

bx1 = BX(),
bx2 = BX({
        x: 32,
        y: 32
    });

console.log(BX.distance(bx1, bx2).toFixed(2)); // 45.25
