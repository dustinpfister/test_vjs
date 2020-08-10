var draw = {};

draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.pool = function (ctx, game) {
    var pool = game.pool;
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    pool.forEach(function (disp) {
        var bias = utils.linPerToBiasPer(disp.i / disp.iMax);
        if (disp.active) {
            ctx.save();
            ctx.translate(disp.x, disp.y);
            ctx.globalAlpha = 0.25 + 0.75 * bias;
            ctx.beginPath();
            ctx.rect(disp.w / 2 * -1, disp.h / 2 * -1, disp.w, disp.h);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }
    });
};

draw.info = function (ctx, game) {
    ctx.fillStyle = 'gray';
    ctx.textBaseline = 'top';
    ctx.font = '10px courier';
    ctx.fillText('v' + game.ver, 5, game.mainBox.height - 15);
};
