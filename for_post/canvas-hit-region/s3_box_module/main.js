
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

var player = Box.create({
        x: 100,
        y: 0
    }),
pool = [Box.create({
        x: canvas.width / 2 - 50,
        y: 80,
        w: 100
    })];

var poolHitCheck = function (p, bx) {
    var i = p.length;
    while (i--) {
        p[i].onHit(bx);
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
    //pool[0].onHit(player);
    poolHitCheck(pool, player)
    heading += 25 * secs;
    heading %= 360;

    draw.back(ctx, canvas);
    draw.box(ctx, pool[0], pool[0].color);
    draw.box(ctx, player, player.color);
    lt = now;
};

loop();
