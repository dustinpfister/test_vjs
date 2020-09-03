var draw = {};
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
draw.targets = function (ctx, targets) {
    var i = targets.length,
    target,
    pl;
    while (i--) {
        target = targets[i];
        pl = target.pl;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(pl.x, pl.y, pl.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'blue';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(i, pl.x, pl.y);
    }
};
