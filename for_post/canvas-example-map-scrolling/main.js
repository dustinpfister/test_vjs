// CANVAS
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);

// scale
var ratio = window.devicePixelRatio || 1;
//ratio = 2;
canvas.width = 320 * ratio;
canvas.height = 120 * ratio;

// CREATE GRID
var grid = g.createGridObject(12, 8);
grid.xOffset = 0;
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
    drawMap(grid, ctx, canvas, 2);
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
    deltas = g.getPointerMovementDeltas(grid, canvas, x, y);
    if (mousedown) {
        gridDelta.x = deltas.x;
        gridDelta.y = deltas.y;
    }
});
