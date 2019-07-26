// get the canvas, context and set size
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;

ctx.fillStyle='red';
ctx.fillText('hello world', 10, 10);