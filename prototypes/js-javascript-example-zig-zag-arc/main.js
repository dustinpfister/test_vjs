
var draw = {};

draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.pool = function (ctx, game) {
    var pool = game.pool;
    ctx.fillStyle = 'red';
    pool.forEach(function (disp) {
        var bias = utils.linPerToBiasPer(disp.i / disp.iMax);
        if (disp.active) {
            ctx.globalAlpha = 0.25 + 0.75 * bias;
            ctx.fillRect(disp.x, disp.y, disp.w, disp.h);
        }
    });
    ctx.globalAlpha = 1;
};

var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var game = gameMod.create(canvas);
var lt = new Date();
var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
    gameMod.update(game, secs);

    draw.back(ctx, canvas);
    draw.pool(ctx, game);
    lt = now;
};

loop();
