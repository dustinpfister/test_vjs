var draw = (function () {

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

        }

    }

}
    ());
