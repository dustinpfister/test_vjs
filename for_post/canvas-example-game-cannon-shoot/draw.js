var draw = (function () {

    return {

        // draw background
        background: function (state) {
            var ctx = state.ctx,
            canvas = state.canvas;
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },

        // draw by way of the current mode
        currentMode: function (state) {}

    }

}
    ());
