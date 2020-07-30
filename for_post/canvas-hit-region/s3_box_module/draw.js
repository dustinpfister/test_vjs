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

draw.pool = function (ctx, pool) {
    var i = pool.length;
    while (i--) {
        draw.box(ctx, pool[i], pool[i].color, 'black');
    }
};
