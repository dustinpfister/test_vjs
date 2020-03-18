var draw = (function () {

    return {
        // draw background
        background: function (state) {
            var ctx = state.ctx,
            canvas = state.canvas;
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
        // draw debug info
        debug: function (state) {}
    }

}
    ());
