var draw = (function () {
    // draw background
    var background = function (state, ctx) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, state.canvas.width, state.canvas.height);
    };
    // draw ball
    var ball = function (state, ctx) {
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#ff0000';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(state.x, state.y, state.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
    // public api is a function
    var api = function (state, ctx) {
        background(state, ctx);
        ball(state, ctx);
    };
    // return the public API
    return api;
}
    ());
