
var genPoints = function (count, width, height) {
    count = count === undefined ? 10 : count;
    width = width === undefined ? 160 : width;
    height = height === undefined ? 120 : height;
    var points = [];
    var i = 0;
    while (i < count) {
        points.push({
            x: Math.random() * width,
            y: Math.random() * height
        })
        i += 1;
    }
    return points;
};

var draw = {};

draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.points = function (ctx, points) {
    ctx.fillStyle = 'red';
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

var points = genPoints(20, canvas.width, canvas.height);

draw.background(ctx, canvas);
draw.points(ctx, points);
