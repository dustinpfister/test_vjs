var draw = {};

draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.box = function (ctx, x, y, w, h, fill) {
    ctx.fillStyle = fill || 'black';
    ctx.fillRect(x, y, w, h);
};

draw.lowAndHigh = function (ctx, p) {
    ctx.strokeStyle = 'white';
    var l = points.getLorH(p, 'min'),
    h = points.getLorH(p, 'max');

    ctx.beginPath();
    ctx.arc(l.x, l.y, 3, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(h.x, h.y, 9, 0, Math.PI * 2);
    ctx.stroke();
}

draw.points = function (ctx, p, fill) {
    ctx.fillStyle = fill || 'red';
    var i = p.length,
    pt;
    while (i--) {
        pt = p[i];
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
};
