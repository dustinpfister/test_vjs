var draw = (function () {

    var modes = {

        aim: function (state) {

            var ctx = state.ctx,
            canvas = state.canvas,
            cannon = state.cannon,
            x = Math.cos(cannon.heading) * 100,
            y = Math.sin(cannon.heading) * 100;


            ctx.strokeStyle = 'lime';
            ctx.beginPath();
            ctx.moveTo(0, canvas.height);
            ctx.lineTo(x, canvas.height + y);
            ctx.stroke();

        },
        fired: function () {},
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
