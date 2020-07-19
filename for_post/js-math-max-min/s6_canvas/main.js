// get canvas can 2d context
var container = document.getElementById('canvas-min-max'),
canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;

var p = points.gen(20, canvas.width, canvas.height),
//p = [{x:32, y: 32},{x:150, y: 150}];


pMoved = points.move(p, 32, 32, 64, 64);

console.log(points.getAxisRanges(pMoved));
console.log(points.getLorH(pMoved, 'max'));


draw.background(ctx, canvas);
draw.points(ctx, p);
draw.box(ctx,32,32,64,64,'rgba(0,0,255,0.4)')
draw.points(ctx, pMoved, 'blue');
draw.lowAndHigh(ctx, pMoved);
