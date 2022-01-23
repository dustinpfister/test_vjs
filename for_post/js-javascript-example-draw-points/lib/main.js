
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
