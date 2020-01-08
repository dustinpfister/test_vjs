// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);

// set width and height
canvas.width = 320;
canvas.height = 120;

var grid = g.createGridObject(4, 4);

// fill black
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

drawMap(grid, ctx, canvas);
