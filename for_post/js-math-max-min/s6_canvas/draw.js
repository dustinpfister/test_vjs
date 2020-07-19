var draw = {};

draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.points = function (ctx, points, fill) {
    ctx.fillStyle = fill || 'red';
    var i = points.length,
    pt;
    while (i--) {
        pt = points[i];
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
};
