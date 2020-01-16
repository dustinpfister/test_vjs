

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
    gameOver: false,
    lt: new Date()
};

var flap = function (bird) {
    bird.y -= 32;
    if (bird.y < 0) {
        bird.y = 0;
    }
};

var updateBirdPosition = function (bird, canvas) {
    var now = new Date(),
    secs = (now - bird.lt) / 1000;
    bird.y += bird.pps * secs;
    if (bird.y >= canvas.height + bird.size) {
        bird.y = canvas.height + bird.size;
        bird.gameOver = true;
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
    ctx.fillRect(bird.x, bird.y, 32, 32);
};
var drawInfo = function (bird, ctx) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.fillText('game over: ' + bird.gameOver, 10, 10);
};

// Main APP Loop

var loop = function () {
    requestAnimationFrame(loop);
    drawBackground(ctx);
    drawBird(bird, ctx);
    drawInfo(bird, ctx);
    updateBirdPosition(bird, canvas);
};

loop();
