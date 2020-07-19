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

// get canvas can 2d context
var container = document.getElementById('canvas-min-max'),
canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;

var p = points.gen(20, canvas.width, canvas.height);

draw.background(ctx, canvas);
draw.points(ctx, p);
draw.points(ctx, points.move(p, 32, 32, 128, 64), 'blue');
