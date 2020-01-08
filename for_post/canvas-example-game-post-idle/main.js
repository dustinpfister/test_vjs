// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);

// set width and height
canvas.width = 320;
canvas.height = 120;

var grid = g.createGridObject(4, 4);
grid.xOffset = canvas.width / 2 - grid.width * grid.cellSize / 2;
grid.yOffset = 0;

var loop = function () {

    requestAnimationFrame(loop);

    // fill black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw map
    drawMap(grid, ctx, canvas);

};

loop();
