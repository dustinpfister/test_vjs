
var b = {};

b.createBallObject = function (opt) {
    var ball = {};
    opt = opt || {};
    ball.x = opt.x === undefined ? 0 : opt.x;
    ball.y = opt.y === undefined ? 0 : opt.y;
    ball.r = opt.r === undefined ? 5 : opt.r;
    ball.h = opt.h === undefined ? 0 : opt.h;
    ball.d = opt.d === undefined ? 0 : opt.d;
    return ball;
};
