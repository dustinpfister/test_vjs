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
            ctx.save();
            ctx.translate(disp.x, disp.y);
            ctx.globalAlpha = 0.25 + 0.75 * bias;
            ctx.fillRect(disp.w / 2 * -1, disp.h / 2 * -1, disp.w, disp.h);
            ctx.restore();
        }
    });
};
