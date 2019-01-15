var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');

// using document body to append a new canvas element
document.body.appendChild(canvas);

canvas.width = 320;
canvas.height = 240;

ctx.fillStyle='#000000';
ctx.fillRect(0,0,canvas.width,canvas.height);