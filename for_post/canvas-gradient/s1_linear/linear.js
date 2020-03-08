
// CANVAS
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

// Create a linear gradient
var sp = { // start point
    x: 50,
    y: 50
},
ep = { // end point
    x: canvas.width - 50,
    y: canvas.height - 50
},
gradient = ctx.createLinearGradient(sp.x, sp.y, ep.x, ep.y);

// Add color stops
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.2, 'orange');
gradient.addColorStop(0.4, 'yellow');
gradient.addColorStop(0.6, 'blue');
gradient.addColorStop(0.8, 'cyan');
gradient.addColorStop(1, 'lime');

// use the gradient as a style
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);
