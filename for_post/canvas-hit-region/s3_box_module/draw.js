var draw = {};
draw.back = function (ctx, canvas) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
// draw a box
draw.box = function (ctx, bx, fill, stroke) {
    ctx.fillStyle = fill || '#ffffff';
    ctx.strokeStyle = stroke || '#000000';
    ctx.beginPath();
    ctx.rect(bx.x, bx.y, bx.w, bx.h);
    ctx.fill();
    ctx.stroke();
};
// raw pool of box objects
draw.pool = function (ctx, pool) {
    var i = pool.length,
    bx;
    while (i--) {
        bx = pool[i];
        draw.box(ctx, bx, bx.color, 'black');
        ctx.fillStyle = 'black';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';
        ctx.font = '10px courier';
        ctx.fillText(Math.floor(bx.damage), bx.x + bx.w / 2, bx.y + bx.h / 2 - 5)
    }
};
draw.info = function (ctx, canvas, player, pool) {
    ctx.fillStyle = 'lime';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.font = '10px courier';
    ctx.fillText('v' + player.ver, 10, canvas.height - 10);
};
