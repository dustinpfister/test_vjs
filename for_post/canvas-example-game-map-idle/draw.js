var draw = (function () {

    var drawStateDebug = {

        nav: function (ctx, grid) {
            var pt = grid.mapMoveStartPoint;
            ctx.fillText('startPos: (' + pt.x + ',' + pt.y + ')', 10, 20);
            ctx.fillText('moveDistance: ' + grid.moveDistance, 10, 30);
            ctx.fillText('moveDelta: ' + grid.moveDelta, 10, 40);
        }

    }

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

        stateDebugInfo: function (ctx, stateName, grid) {

            var state = drawStateDebug[stateName];

            ctx.fillStyle = 'rgba(0,0,0,0.25)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';

            ctx.fillText('current state: ' + stateName, 10, 10);

            if (state) {
                state(ctx, grid);
            }
        }

    }

}
    ());
