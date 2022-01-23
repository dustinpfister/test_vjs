var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('canvas-app').appendChild(canvas);
canvas.width = 640; canvas.height = 480;
var sm = {
   ver: 'r4',
   objects: []
};
// using the pointMod.createEllipse method
sm.objects.push(pointMod.createEllipse({
    points: 40,
    r1: 300, r2: 75,
    x: canvas.width / 2, y: canvas.height / 2
}));
// creating a points object manually
sm.objects.push([
    [25, 75, 175, 50, 17, 110, 'fill:red', 'stroke:lime'],
    [100, 20, 165, 25, 22, 130, 300, 130, 300, 20, 'fill:false', 'close:false']
]);
// drawing
draw.background(ctx, canvas, 'blue');
// using the draw points method
sm.objects.forEach(function(points){
    draw.points(ctx, points, 0, 0);
});
draw.ver(sm, ctx, canvas);
