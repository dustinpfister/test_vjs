
// CANVAS

var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
var pxRatio = window.devicePixelRatio || 1; // scale
canvas.width = 320 * pxRatio;
canvas.height = 240 * pxRatio;
ctx.translate(0.5, 0.5);

// CREATE GRID

var grid = g.createGridObject(17, 13);
grid.xOffset = 0;
grid.yOffset = 0;
g.setGridWorth(grid, 0, 0, 2);

// starting building
g.createBuilding(grid, 8, 6, 0)

// MAIN APP LOOP

var loop = function () {
    requestAnimationFrame(loop);

    // update
    g.updateGrid(grid, pxRatio);

    // draw
    draw.background(ctx, canvas); // background
    drawMap(grid, ctx, canvas, pxRatio); // the map
    draw.gridStatusInfo(ctx, canvas, grid); // status bar


    draw.debugInfo(ctx, grid);
};
loop();

// EVENTS

canvas.addEventListener('mousedown', function (e) {
    g.userCanvasActionStart(grid, e, pxRatio);
});

canvas.addEventListener('mouseup', function (e) {
    g.userCanvasActionEnd(grid, e, pxRatio);
});
canvas.addEventListener('mousemove', function (e) {
    g.userCanvasActionMove(grid, e, pxRatio);
});
