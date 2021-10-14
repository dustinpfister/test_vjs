var draw = {};
// draw a background
draw.background = function (sm, ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
// draw the given grid object
draw.grid = function (grid, ctx, canvas) {
    grid.cells.forEach(function (cell) {
        ctx.fillStyle = cell.data.fillStyle || 'white';
        ctx.fillRect(cell.x, cell.y, grid.cellSize, grid.cellSize);
    });
};