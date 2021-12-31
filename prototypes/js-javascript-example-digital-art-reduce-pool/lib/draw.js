var draw = {};

draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(-1, -1, canvas.width + 2, canvas.height + 2);
};

draw.pool = function (game, ctx, canvas) {
    var pool = game.units;
    pool.objects.forEach(function (obj) {
        ctx.fillStyle = obj.data.fillStyle || 'white';
        ctx.strokeStyle = obj.data.strokeStyle || 'black';
        if (obj.active) {
            var cx = obj.x + obj.w / 2,
            cy = obj.y + obj.h / 2;
            ctx.beginPath();
            ctx.arc(cx, cy, (obj.w + obj.h) / 2 / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }
    });
};
