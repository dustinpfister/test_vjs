// CANVAS
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 120;

// CREATE GRID
var grid = g.createGridObject(16, 8);
grid.xOffset = canvas.width / 2 - grid.width * grid.cellSize / 2;
grid.yOffset = 0;

var mousedown = false,
gridDelta = {
    x: 0,
    y: 0
};

// MAIN APP LOOP
var loop = function () {
    requestAnimationFrame(loop);

    grid.xOffset += gridDelta.x;
    grid.yOffset += gridDelta.y;

    var offsets = g.clampedOffsets(grid, canvas);
    grid.xOffset = offsets.xOffset;
    grid.yOffset = offsets.yOffset;

    // fill black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw map
    drawMap(grid, ctx, canvas);
};
loop();

// EVENTS
canvas.addEventListener('mousedown', function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    x = e.clientX - bx.left,
    y = e.clientY - bx.top;
    e.preventDefault();
    mousedown = true;

    var cell = g.getCellFromCanvasPoint(grid, x, y);

    if (cell.i === grid.selectedCellIndex) {
        grid.selectedCellIndex = -1;
    } else {

        if (cell.i >= 0) {
            grid.selectedCellIndex = cell.i;
        }
    }

});
canvas.addEventListener('mouseup', function (e) {
    e.preventDefault();
    mousedown = false;
    gridDelta.x = 0;
    gridDelta.y = 0;
});
canvas.addEventListener('mousemove', function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    x = e.clientX - bx.left,
    y = e.clientY - bx.top,
    a = Math.atan2(y - canvas.height / 2, x - canvas.width / 2);

    e.preventDefault();

    if (mousedown) {
        gridDelta.x = Math.cos(a) * -4;
        gridDelta.y = Math.sin(a) * -4;
    }

});
