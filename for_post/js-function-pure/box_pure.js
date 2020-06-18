var createBox = function (opt) {
    opt = opt || {};
    return {
        x: opt.x === undefined ? 0 : opt.x,
        y: opt.y === undefined ? 0 : opt.y,
        w: opt.w === undefined ? 32 : opt.w,
        h: opt.h === undefined ? 32 : opt.h
    };
};

var distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

var bx = createBox({
        x: 100,
        y: 50
    });

console.log( distance(0, 0, bx.x, bx.y) ); // 111.80339887498948
