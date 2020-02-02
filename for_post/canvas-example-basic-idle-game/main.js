// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;

var draw = {};

draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.stateStatusInfo = function (ctx, state) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.fillText(state.money, 10, 10);
};

draw.tickProgressBar = function (ctx, canvas, state) {
    var t = new Date() - state.lastTick,
    per = t / state.tickRate;
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, canvas.width, 10);
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width * per, 10);
};

var state = game.getState();

var loop = function () {
    requestAnimationFrame(loop);

    draw.background(ctx, canvas);
    draw.tickProgressBar(ctx, canvas, state);
    draw.stateStatusInfo(ctx, state);
	
	game.update(state);
};
loop();
