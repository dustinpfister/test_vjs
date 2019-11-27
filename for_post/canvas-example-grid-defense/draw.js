// draw Cell Lines
var draw = {
    gridLineStyle: 'white',
    enemyFillStyle: 'red'
};

draw.cls = function (ctx, canvas) {

    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

};

draw.gridCellLines = function (grid, ctx) {
    var ci = 0,
    x,
    y,
    cell,
    cLen = grid.cells.length;
    while (ci < cLen) {
        cell = grid.cells[ci];
        x = cell.x * grid.cellSize + grid.xOffset + 0.5;
        y = cell.y * grid.cellSize + grid.yOffset + 0.5;
        ctx.strokeStyle = draw.gridLineStyle;
        ctx.strokeRect(x, y, grid.cellSize, grid.cellSize);
        if (cell.enemy) {
            ctx.fillStyle = draw.enemyFillStyle;
            ctx.fillRect(x, y, grid.cellSize, grid.cellSize);
        }
        ci += 1;
    }
};
