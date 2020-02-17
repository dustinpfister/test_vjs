var draw = (function () {

    // draw Cell Lines
    var drawCellLines = function (ctx, opt) {
        opt = opt || {};
        var ci = 0,
        w = opt.w || 8,
        h = opt.h || 8,
        cellSize = opt.cellSize || 32,
        cLen = w * h;
        offset = opt.offset || {};
        offset.x = offset.x === undefined ? 0 : offset.x;
        offset.y = offset.y === undefined ? 0 : offset.y;
        ctx.strokeStyle = opt.style || 'lime';
        while (ci < cLen) {
            var x = ci % w,
            y = Math.floor(ci / w);
            ctx.strokeRect(
                x * cellSize + offset.x,
                y * cellSize + offset.y,
                cellSize, cellSize);
            ci += 1;
        }
    };

    var modes = {

        aim: function (state) {

            var ctx = state.ctx,
            canvas = state.canvas,
            cannon = state.cannon;

            ctx.strokeStyle = 'lime';
            ctx.beginPath();
            ctx.moveTo(0, canvas.height);
            ctx.lineTo(cannon.sx, cannon.sy);
            ctx.stroke();

        },
        fired: function (state) {

            var ctx = state.ctx;

            ctx.strokeStyle = 'lime';
            ctx.beginPath();
            ctx.arc(state.shot.x, state.shot.y, 5, 0, Math.PI * 2);
            ctx.stroke();

        },
        over: function () {}

    };

    return {

        // draw background
        background: function (state) {
            var ctx = state.ctx,
            canvas = state.canvas;
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },

        // draw by way of the current mode
        currentMode: function (state) {
            modes[state.mode](state);

        },

        gridLines: function (state) {
            var ctx = state.ctx;
            var xPer = state.offset.x % 32 / 32,
            yPer = state.offset.y % 32 / 32;
            drawCellLines(ctx, {
                w: 12,
                h: 10,
                style: 'grey',
                offset: {
                    x: -32 * xPer - 32,
                    y: -32 * yPer - 32
                }
            });
        }

    }

}
    ());
