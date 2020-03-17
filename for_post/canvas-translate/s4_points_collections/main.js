var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.translate(0.5, 0.5);
canvas.width = 320;
canvas.height = 240;

var dispObjects = [{
        x: 64,
        y: 64,
        r: Math.PI / 180 * 10,
        points: [-32, -32, 32, -32, 32, 32]
    }
];

draw.back(ctx, canvas);

var i = 0,
disp,
len = dispObjects.length;
while (i < len) {
    disp = dispObjects[i];
    ctx.save();
    ctx.translate(disp.x, disp.y);
    ctx.rotate(disp.r);
    draw.points(ctx, disp.points, true, 'white', 'red', 3);
    ctx.restore();
    i += 1;
}
