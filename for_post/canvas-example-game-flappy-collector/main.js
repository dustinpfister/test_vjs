

var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;

ctx.translate(0.5, 0.5);

// STATE

var bird = {
    x: 32,
    y: 0,
    size: 32,
    pps: 64,
    lt: new Date(),
    berries: [],
    berriesLastSpawn: new Date(),
    berriesDelay: 1,
    berriesMax: 4
};

var bb = function (a, b) {
    return !(
        ((a.y + a.size) < (b.y)) ||
        (a.y > (b.y + b.size)) ||
        ((a.x + a.size) < b.x) ||
        (a.x > (b.x + b.size)));
};

var flap = function (bird) {
    bird.y -= 32;
    if (bird.y < 0) {
        bird.y = 0;
    }
};

var spawnBerry = function (bird, canvas) {
    var count = bird.berries.length,
    now = new Date(),
    secs = (now - bird.berriesLastSpawn) / 1000;
    if (secs >= bird.berriesDelay) {
        if (count < bird.berriesMax) {
            var yRange = canvas.height - 64;
            bird.berries.push({
                x: canvas.width + 32,
                y: yRange - Math.random() * yRange,
                size: 32,
                pps: 64
            });
        }
        bird.berriesLastSpawn = now;
    }
};

var updateBerries = function (bird, secs, canvas) {
    var i = bird.berries.length,
    berry;
    while (i--) {
        berry = bird.berries[i];
        berry.x -= berry.pps * secs;

        if (bb(bird, berry)) {
            bird.berries.splice(i, 1);
        }

        if (berry.x <= berry.size * -1) {
            bird.berries.splice(i, 1);
        }
    }
};

var updateBird = function (bird, canvas) {
    var now = new Date(),
    secs = (now - bird.lt) / 1000;
    bird.y += bird.pps * secs;
    updateBerries(bird, secs, canvas);
    if (bird.y >= canvas.height - bird.size) {
        bird.y = canvas.height - bird.size;
    }
    bird.lt = now;
};

// INPUT
canvas.addEventListener('click', function () {
    flap(bird);
});

// DRAW

var drawBackground = function (ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
var drawBird = function (bird, ctx) {
    ctx.fillStyle = 'green';
    ctx.fillRect(bird.x, bird.y, bird.size, bird.size);
};
var drawInfo = function (bird, ctx) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.fillText('bird pos: ( ' + Math.floor(bird.x) + ',' + Math.floor(bird.y) + ')', 10, 10);
};
var drawBerries = function (bird, ctx) {

    ctx.fillStyle = 'red';
    bird.berries.forEach(function (berry) {
        ctx.fillRect(berry.x, berry.y, berry.size, berry.size);
    });
};

// Main APP Loop
var loop = function () {
    requestAnimationFrame(loop);
    drawBackground(ctx);

    drawBerries(bird, ctx);
    drawBird(bird, ctx);
    drawInfo(bird, ctx);
    updateBird(bird, canvas);
    //updateBerries(bird, canvas);
    spawnBerry(bird, canvas);
};

loop();
