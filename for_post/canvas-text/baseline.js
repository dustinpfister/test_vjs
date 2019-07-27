// get the canvas, context and set size
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;

var mess = 'Hello',
baseY = 10;

ctx.strokeStyle = 'blue';
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(0,baseY);
ctx.lineTo(canvas.width,baseY);
ctx.stroke();

// 'alphabetic' baseline (default)
ctx.fillStyle='red';
ctx.fillText(mess, 0, baseY);

// 'top' baseline
ctx.textBaseline = 'top';
ctx.fillText(mess, 30, baseY);

// middle baseline
ctx.textBaseline = 'middle';
ctx.fillText(mess, 60, baseY);

// bottom baseline
ctx.textBaseline = 'bottom';
ctx.fillText(mess, 90, baseY);