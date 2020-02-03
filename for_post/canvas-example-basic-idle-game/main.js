// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;

var state = game.getState();

var loop = function () {
    requestAnimationFrame(loop);

    draw.background(ctx, canvas);
    draw.tickProgressBar(ctx, canvas, state);
    draw.stateStatusInfo(ctx, state);
    draw.debugUpgrades(ctx, state);

    game.update(state);

};
loop();
