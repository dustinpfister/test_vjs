
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

var player = Box.create({
        x: 150,
        y: 50
    }),
pool = [Box.create({
        x: canvas.width / 1.5 - 50,
        y: 120,
        w: 100
    }),
    Box.create({
        x: 5,
        y: 20,
        w: 75,
        h: 75
    }),
    Box.create({
        x: 80,
        y: 20,
        w: 75,
        h: 50
    })];

var poolHitCheck = function (p, bx, secs) {
    var i = p.length;
    while (i--) {
        p[i].hitCheck(bx, secs);
    }
};

var lt = new Date(),
heading = 45;
var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);

    player = Box.moveByHeading(player, Math.PI / 180 * heading, 32 * secs);
    poolHitCheck(pool, player, secs)
    heading += 25 * secs;
    heading %= 360;

    draw.back(ctx, canvas);
    //draw.box(ctx, pool[0], pool[0].color);
    draw.pool(ctx, pool);
    draw.box(ctx, player, player.color);
    draw.info(ctx, canvas, player, pool);
    lt = now;
};

loop();
