// get the canvas, context and set size
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 150;

ctx.fillStyle = 'back';
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = 'white';
ctx.font = '120px arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('Hello World', canvas.width / 2, canvas.height / 2);
