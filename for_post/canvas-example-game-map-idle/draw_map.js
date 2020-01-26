var draw = (function () {

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
	
	var drawNavCircle = function(){
		
		
	};

    var api = {};

    api.map = function (grid, ctx, canvas, pxRatio) {
        var colors = ['yellow', 'green'],
        cellSize = grid.cellSize || 10,
        x,
        y,
        xOffset = grid.xOffset,
        yOffset = grid.yOffset;

        pxRatio = pxRatio || 1;
        cellSize = cellSize * pxRatio;

        // black background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawCells(grid, ctx, canvas, pxRatio, xOffset, yOffset, cellSize);

        if (grid.selectedCellIndex > -1) {
            ctx.strokeStyle = 'red';
            var cell = grid.cells[grid.selectedCellIndex],
            x = cell.x * cellSize + xOffset * pxRatio;
            y = cell.y * cellSize + yOffset * pxRatio;
            ctx.strokeStyle = 'red';
            ctx.strokeRect(x, y, cellSize, cellSize);
        }

        // status info
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
        ctx.fillStyle = 'black';
        ctx.textBaseline = 'top';
        ctx.font = '15px courier';
        ctx.fillText('$' + grid.money.toFixed(2), 5, canvas.height - 15)

    };

    return api;

}
    ());
