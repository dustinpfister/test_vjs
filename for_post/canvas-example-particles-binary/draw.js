var draw = (function () {

    return {
        // draw background
        background: function (state) {
            var ctx = state.ctx,
            canvas = state.canvas;
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },

        pool: function (state) {

            var i = state.pool.length;
            while (i--) {
                var part = state.pool[i];
                if (part.bits != '00') {
                    ctx.beginPath();
                    ctx.fillStyle = 'white';
                    ctx.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

        },

        // draw debug info
        debug: function (state) {}
    }

}
    ());
