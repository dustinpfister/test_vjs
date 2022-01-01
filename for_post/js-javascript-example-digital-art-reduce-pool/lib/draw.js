var draw = {};
// draw the background
draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'gray';
    ctx.fillRect(-1, -1, canvas.width + 2, canvas.height + 2);
};
// draw the pool
draw.pool = function (game, ctx, canvas) {
    var pool = game.units;
    pool.objects.forEach(function (obj) {
        ctx.fillStyle = obj.data.fillStyle || 'white';
        ctx.strokeStyle = obj.data.strokeStyle || 'black';
        ctx.globalAlpha = obj.data.alpha === undefined ? 1: obj.data.alpha;
        if (obj.active) {
            var cx = obj.x + obj.w / 2,
            cy = obj.y + obj.h / 2;
            ctx.beginPath();
            ctx.arc(cx, cy, (obj.w + obj.h) / 2 / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }
    });
    ctx.globalAlpha = 1;
};
// draw version number
draw.ver = function (sm, ctx, canvas) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.font = '12px arial';
    ctx.fillText('version: ' + sm.ver, 5, canvas.height - 15);
};
