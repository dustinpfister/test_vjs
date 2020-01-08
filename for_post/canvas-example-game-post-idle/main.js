// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);

// set width and height
canvas.width = 320;
canvas.height = 120;

var drawGrid = function (grid, ctx, canvas) {

    var colors = ['yellow', 'green'],
    cellSize = 24,
    x,
    y,
    xOffset = 10,
    yOffset = 10;

    grid.cells.forEach(function (cell) {
        ctx.fillStyle = colors[cell.type] || 'white';
        x = cell.x * cellSize + xOffset;
        y = cell.y * cellSize + yOffset;
        ctx.fillRect(x, y, cellSize, cellSize);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(x, y, cellSize, cellSize);
    });

};

var grid = g.createGridObject(4, 4);

// fill black
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

drawGrid(grid, ctx, canvas);
