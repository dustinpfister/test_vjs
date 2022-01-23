
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('canvas-app').appendChild(canvas);
canvas.width = 640;
canvas.height = 480;

var sm = {
   ver: 'r3'
};
// using the pointMod.createEllipse method
var ellipse = pointMod.createEllipse({
    points: 40,
    r1: 300,
    r2: 75
});
// creating a points object manually
var arr = [
    [25, 75, 175, 50, 17, 110, 'fill:red', 'stroke:lime'],
    [100, 20, 165, 25, 22, 130, 300, 130, 300, 20, 'fill:false', 'close:false']
];
// drawing
draw.background(ctx, canvas, 'blue');
// using the draw points method
draw.points(ctx, ellipse, canvas.width / 2, canvas.height / 2);
draw.points(ctx, arr, 100, 10);
draw.ver(sm, ctx, canvas);


/*
// literal of a points array
var points = [
    [25, 75, 175, 50, 17, 210, 'fill:red', 'stroke:lime'],
    [100, 20, 165, 55, 22, 200, 'fill:false']
];

// method that will create a points array
var demoMethod = function () {
    var i = 0,
    radius = 100,
    radian,
    arr,
    x,
    y,
    count = 8,
    points = [];
    while (i < count) {
        radian = Math.PI * 2 / count * i;
        x = Math.cos(radian) * radius;
        y = Math.sin(radian) * radius;
        arr = [Math.round(x), Math.round(y), 0, 0, 'stroke:white', 'close:false', 'lineWidth:' + (2 + i * 2)];
        points.push(arr);
        i += 1;
    }
    return points
};
*/
//draw.background(ctx, canvas, 'blue');
//draw.points(ctx, points, 80, 5);
//draw.ver(sm, ctx, canvas);
//draw.points(ctx, demoMethod(), 300, 150);
