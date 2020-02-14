
// CANVAS
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

gradient = ctx.createRadialGradient(120, 120, 25, 80, 80, 100);

// Add color stops
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.5, 'green');
gradient.addColorStop(1, 'blue');

// use the gradient as a style
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);
