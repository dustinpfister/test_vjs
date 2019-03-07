var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

// sets the actual native size of the canvas
canvas.width = 64;
canvas.height = 48;

// Scales the canvas via in-line css
canvas.style.width = '640px';
canvas.style.height = '480px';

// adds a scaling transformation
ctx.scale(.5,.5);
ctx.fillStyle = 'black';
ctx.fillRect(5, 5, 16, 16);

ctx.scale(2,2);
ctx.strokeStyle = 'red';
ctx.strokeRect(5, 5, 16, 16);
