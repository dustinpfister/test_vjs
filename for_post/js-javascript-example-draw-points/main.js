
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('canvas-app').appendChild(canvas);

canvas.width = 320;
canvas.height = 240;

// literal
var points = [
    [25, 75, 175, 50, 17, 210, 'fill:green', 'stroke:lime'],
    [30, 80, 165, 55, 22, 200, 'fill:red']
];

// method
var demoMethod = function () {
    var i = 0,
    radius = 50,
    radian,
    arr,
    x,
    y,
    count = 5,
    points = [];
    while (i < count) {
        radian = Math.PI * 2 / count * i;
        x = Math.cos(radian) * radius;
        y = Math.sin(radian) * radius;
        arr = [Math.round(x), Math.round(y), 0, 0, 'stroke:white', 'close:false'];
        points.push(arr);
        i += 1;
    }
    return points
};

draw.background(ctx, canvas, 'blue');
draw.points(ctx, points, 80, 5);

console.log(demoMethod());

draw.points(ctx, demoMethod(), 80, 5);
