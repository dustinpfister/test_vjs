var draw = {};

draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.points = function (ctx, points, close, stroke, fill, lw) {

    close = close === undefined ? true : close;
    stroke = stroke === undefined ? 'black' : stroke;
    fill = fill === undefined ? false : fill;
    ctx.lineWidth = lw === undefined ? 1 : lw;

    ctx.beginPath();
    ctx.moveTo(points[0], points[1]);

    var i = 2,
    len = points.length;
    while (i < len) {
        ctx.lineTo(points[i], points[i + 1]);
        i += 2;
    }
    if (close) {
        ctx.closePath();
    }
    if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
    }
    if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.stroke();
    }
};
