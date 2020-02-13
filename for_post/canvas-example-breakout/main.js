

var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);

canvas.width = 320;
canvas.height = 240;


var state = breakout.createNewState(canvas);

console.log(state);

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
