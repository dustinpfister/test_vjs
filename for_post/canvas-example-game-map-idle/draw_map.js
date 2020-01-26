var drawMap = (function () {

    // draw cells
    var drawCells = function (grid, ctx, canvas, pxRatio, xOffset, yOffset, cellSize) {
        var colors = ['yellow', 'green'];
        grid.cells.forEach(function (cell) {
            ctx.fillStyle = colors[cell.type] || 'white';
            x = cell.x * cellSize + xOffset * pxRatio;
            y = cell.y * cellSize + yOffset * pxRatio;
            ctx.fillRect(x, y, cellSize, cellSize);
            if (!cell.bought) {
                ctx.fillStyle = 'rgba(0,0,0,0.5)';
                ctx.fillRect(x, y, cellSize, cellSize);
            }
            if (cell.building.index >= 0) {
                ctx.fillStyle = 'red';
                ctx.fillRect(x, y, cellSize, cellSize);
            }
            ctx.strokeStyle = 'white';
            ctx.strokeRect(x, y, cellSize, cellSize);
        });
    };

    // draw a navigation circle when moving the map
    var drawNavCircle = function (grid, ctx, canvas) {
        if (grid.mapMoveMode) {
            var cx = canvas.width / 2,
            cy = canvas.height / 2,
            min = Math.min(cx, cy),
            a = Math.atan2(cy - (cy + grid.mapMoveDeltas.y), cx - (cx + grid.mapMoveDeltas.x));
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(cx, cy, min / 2 - 3, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(Math.cos(a) * min + cx, Math.sin(a) * min + cy);
            ctx.stroke();
        }
    };


    // public draw map method
    return function (grid, ctx, canvas, pxRatio) {
        var colors = ['yellow', 'green'],
        cellSize = grid.cellSize || 10,
        x,
        y,
        xOffset = grid.xOffset,
        yOffset = grid.yOffset;
        pxRatio = pxRatio || 1;
        cellSize = cellSize * pxRatio;
        ctx.lineWidth = 1;
        drawCells(grid, ctx, canvas, pxRatio, xOffset, yOffset, cellSize);
        if (grid.selectedCellIndex > -1) {
            ctx.strokeStyle = 'red';
            var cell = grid.cells[grid.selectedCellIndex],
            x = cell.x * cellSize + xOffset * pxRatio;
            y = cell.y * cellSize + yOffset * pxRatio;
            ctx.strokeStyle = 'red';
            ctx.strokeRect(x, y, cellSize, cellSize);
        }
        drawNavCircle(grid, ctx, canvas);
    };

}
    ());
