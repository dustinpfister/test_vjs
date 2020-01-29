var draw = (function () {

    var drawStateDebug = {
        nav: function (ctx, grid) {
            var pt = grid.mapMoveStartPoint;
            ctx.fillText('startPos: (' + pt.x + ',' + pt.y + ')', 10, 20);
            ctx.fillText('moveDistance: ' + grid.moveDistance, 10, 30);
            ctx.fillText('moveDelta: ' + grid.moveDelta, 10, 40);
        },
        land: function (ctx, grid) {
            var cell = grid.cells[grid.selectedCellIndex];
            ctx.fillText('index (x,y): ' + cell.i + ' (' + cell.x + ',' + cell.y + ')', 10, 20);
            ctx.fillText('worth: ' + cell.worth, 10, 30);
        },
        building: function (ctx, grid) {
            var cell = grid.cells[grid.selectedCellIndex],
            build = cell.building;
            ctx.fillText('index (x,y): ' + cell.i + ' (' + cell.x + ',' + cell.y + ')', 10, 20);
            ctx.fillText('worth: ' + cell.worth, 10, 30);
            ctx.fillText('name: ' + build.name, 10, 40);
            ctx.fillText('money per tick: ' + build.moneyPerTick, 10, 50);
        }
    };

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
            per = 0,
            a = Math.atan2(cy - (cy + grid.mapMoveDeltas.y), cx - (cx + grid.mapMoveDeltas.x));
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 3;
            // draw circle
            ctx.beginPath();
            ctx.arc(cx, cy, min / 2 - 3, 0, Math.PI * 2);
            ctx.stroke();
            // draw direction line
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(Math.cos(a) * min + cx, Math.sin(a) * min + cy);
            ctx.stroke();
            // draw delta circle
            per = grid.moveDelta / 3;
            ctx.beginPath();
            ctx.arc(Math.cos(a) * min * per + cx, Math.sin(a) * min * per + cy, 5, 0, Math.PI * 2);
            ctx.stroke();
        }
    };

    return {

        // draw background
        background: function (ctx, canvas) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },

        // draw status info bar
        gridStatusInfo: function (ctx, canvas, grid) {
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
            ctx.fillStyle = 'black';
            ctx.textBaseline = 'top';
            ctx.textAlign = 'left';
            ctx.font = '15px courier';
            ctx.fillText('$' + grid.money.toFixed(2), 5, canvas.height - 15);
        },

        // draw debug info
        debugInfo: function (ctx, grid) {
            ctx.fillStyle = 'rgba(0,0,0,0.25)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            var pt = grid.mapMoveStartPoint;
            ctx.fillText('startPos: (' + pt.x + ',' + pt.y + ')', 10, 10);
            ctx.fillText('moveDistance: ' + grid.moveDistance, 10, 20);
            ctx.fillText('moveDelta: ' + grid.moveDelta, 10, 30);
        },

        buildMenu: function (ctx, canvas, buildMenu) {

            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.fillRect(0, 0, 96, canvas.height);

            ctx.strokeStyle = 'rgba(255,0,0,0.5)';
            ctx.strokeRect(0, 0, 96, 96);
            ctx.fillStyle = 'rgba(255,0,0,0.5)';
            ctx.textAlign = 'center';
            ctx.fillText(buildMenu.buildOptions[0].name, 48, 32);

        },

        stateDebugInfo: function (ctx, stateName, grid) {
            var state = drawStateDebug[stateName];
            ctx.fillStyle = 'rgba(0,0,0,0.25)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.textAlign = 'left';
            ctx.fillText('current state: ' + stateName, 10, 10);
            if (state) {
                state(ctx, grid);
            }
        },

        map: function (grid, ctx, canvas, pxRatio) {
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
        }

    }

}
    ());
