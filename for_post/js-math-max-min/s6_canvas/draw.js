var draw = {};

draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.pointBack = function (ctx, p) {};

draw.lowPoint = function (ctx, p) {
    ctx.strokeStyle = 'white';
    var pt = points.getLow(p);
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
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
