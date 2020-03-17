// get the canvas, context and set size
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;


// drawing rect at 0,0 in the canvas
ctx.fillStyle = 'blue';
ctx.fillRect(0,0,32,32);

// translating canvas to 16,16
ctx.translate(16,16);
ctx.fillStyle = 'red';
ctx.globalAlpha = 0.5;
// now drawing a rect at 0,0 is actually at 16,16
ctx.fillRect(0,0,32,32);