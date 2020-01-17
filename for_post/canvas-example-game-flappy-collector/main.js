

var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;

ctx.translate(0.5, 0.5);


// INPUT
canvas.addEventListener('click', function () {
    flap(bird);
});

// Main APP Loop
var loop = function () {
    requestAnimationFrame(loop);
    drawBackground(ctx);

    drawBerries(bird, ctx);
    drawBird(bird, ctx);
    drawInfo(bird, ctx);

    update(bird, canvas);

};

loop();
