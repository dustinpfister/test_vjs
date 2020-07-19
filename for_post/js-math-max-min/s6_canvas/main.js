
// get canvas can 2d context
var container = document.getElementById('canvas-min-max'),
canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
