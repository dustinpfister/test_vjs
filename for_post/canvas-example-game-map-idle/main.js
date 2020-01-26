
// CANVAS

var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
var ratio = window.devicePixelRatio || 1; // scale
canvas.width = 320 * ratio;
canvas.height = 120 * ratio;
ctx.translate(0.5, 0.5);

// CREATE GRID

var grid = g.createGridObject(12, 8);
grid.xOffset = 0;
grid.yOffset = 0;
g.setGridWorth(grid, 0, 0, 2);

//var mousedown = false,
//gridDelta = {
//    x: 0,
//    y: 0
//};

// MAIN APP LOOP

var loop = function () {
    requestAnimationFrame(loop);
    // update
    //grid.xOffset += gridDelta.x;
    //grid.yOffset += gridDelta.y;
    //var offsets = g.clampedOffsets(grid, canvas, ratio);
    //grid.xOffset = offsets.xOffset;
    //grid.yOffset = offsets.yOffset;

    g.updateGrid(grid);
    // draw
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawMap(grid, ctx, canvas, ratio);
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
    var cell = g.getCellFromCanvasPoint(grid, x / ratio, y / ratio);
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
    x = (e.clientX - bx.left) * ratio,
    y = (e.clientY - bx.top) * ratio,
    deltas = g.getPointerMovementDeltas(grid, canvas, x, y, ratio);
    if (mousedown) {
        gridDelta.x = deltas.x;
        gridDelta.y = deltas.y;
    }
});
