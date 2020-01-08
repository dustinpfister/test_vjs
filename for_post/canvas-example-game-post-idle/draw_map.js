var drawMap = function (grid, ctx, canvas) {
    var colors = ['yellow', 'green'],
    cellSize =grid.cellSize || 10,
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
