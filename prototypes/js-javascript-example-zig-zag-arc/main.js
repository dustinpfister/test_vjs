
var draw = {};

draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.pool = function (ctx, game) {
    var pool = game.pool;
    ctx.fillStyle = 'red';
    pool.forEach(function (disp) {
        if (disp.active) {
            ctx.fillRect(disp.x, disp.y, disp.w, disp.h);
        }
    });
};

var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var game = gameMod.create(canvas);

var loop = function () {

    requestAnimationFrame(loop);
    gameMod.update(game, 0.1);

    draw.back(ctx, canvas);
    draw.pool(ctx, game);
};

loop();
