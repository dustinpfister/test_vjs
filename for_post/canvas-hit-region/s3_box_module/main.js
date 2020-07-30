
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

var bx = Box.create({
        x: 100,
        y: 0
    }),
bx2 = Box.create({
        x: canvas.width / 2 - 50,
        y: 80,
        w: 100
    });

var lt = new Date(),
heading = 45;
var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);

    bx = Box.moveByHeading(bx, Math.PI / 180 * heading, 32 * secs);
    heading += 25 * secs;
    heading %= 360;

    draw.back(ctx, canvas);

    bx2.onHit(bx);
    draw.box(ctx, bx2, bx2.color);
    draw.box(ctx, bx, bx.color);
    lt = now;
};

loop();
