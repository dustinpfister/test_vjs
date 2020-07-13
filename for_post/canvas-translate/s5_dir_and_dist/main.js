var transByDirDist = function (ctx, dir, dist, scale) {
    scale = scale === undefined ? 360 : scale;
    var rad = dir / scale * (Math.PI * 2);
    ctx.translate(Math.cos(rad) * dist, Math.sin(rad) * dist);
};

var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;

var i = 0, a, d = 150, count = 10;
while (i < count) {
    ctx.save();
    a = 90 / count * i;
    transByDirDist(ctx, a, d);
    ctx.fillStyle = 'red';
    ctx.fillRect(-8, -8, 16, 16);
    ctx.restore();
    i += 1;
}
