
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

// MAIN APP LOOP

var loop = function () {
    requestAnimationFrame(loop);

    // update
    g.updateGrid(grid);

    // draw
    draw.map(grid, ctx, canvas, ratio);
};
loop();

// EVENTS

canvas.addEventListener('mousedown', function (e) {
    g.userCanvasActionStart(grid, e);
});

canvas.addEventListener('mouseup', function (e) {
    g.userCanvasActionEnd(grid, e);
});
canvas.addEventListener('mousemove', function (e) {
    g.userCanvasActionMove(grid, e);
});
