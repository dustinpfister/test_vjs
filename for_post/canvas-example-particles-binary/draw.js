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
            ctx.globalAlpha = 0.8;
            while (i--) {
                var part = state.pool[i];
                if (part.bits != '00') {
                    var color = part.bits === '01' ? 'blue' : 'red';
                    color = part.bits === '11' ? 'purple' : color;
                    ctx.beginPath();
                    ctx.fillStyle = color;
                    ctx.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.globalAlpha = 1;

        },

        // draw debug info
        debug: function (state) {}
    }

}
    ());
