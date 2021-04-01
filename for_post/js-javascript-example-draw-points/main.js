
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('canvas-app').appendChild(canvas);

canvas.width = 320;
canvas.height = 240;

var points = [
    [25, 75, 175, 50, 17, 210, 'fill:green','stroke:lime'],
    [30, 80, 165, 55, 22, 200, 'fill:red']
];

draw.background(ctx, canvas, 'blue');
draw.points(ctx, points, 80, 5);
