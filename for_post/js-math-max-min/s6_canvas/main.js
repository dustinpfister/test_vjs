// get canvas can 2d context
var container = document.getElementById('canvas-min-max'),
canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;

var p = points.gen(20, canvas.width, canvas.height),
pMoved = points.move(p, 32, 32, 64, 64);

draw.background(ctx, canvas);
draw.points(ctx, p);
draw.points(ctx, pMoved, 'blue');
draw.lowAndHigh(ctx, pMoved);
