var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

// sets the actual native size of the canvas
canvas.width = 32;
canvas.height = 24;

// Scales the canvas
canvas.style.width = '640px';
canvas.style.height = '480px';

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

var rect = [11, 7, 10, 10];
ctx.strokeStyle = 'green';
ctx.lineWidth = 5;
ctx.strokeRect.apply(ctx, rect);

ctx.strokeStyle = 'white';
ctx.lineWidth = 1;
ctx.strokeRect.apply(ctx, rect);
