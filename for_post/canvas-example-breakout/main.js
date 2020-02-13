

var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);


var state = breakout.createNewState(canvas);

draw.background(ctx, canvas);
draw.blocks(ctx, state);
draw.paddle(ctx, state);
