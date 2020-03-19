var draw = {};

draw.back = function (state) {
    var ctx = state.ctx,
    canvas = state.canvas;
    // solid black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.circles = function (state) {
    var ctx = state.ctx,
    canvas = state.canvas,
    i = state.circles.length,
    circle;
    while (i--) {
        circle = state.circles[i];
        ctx.fillStyle = 'rgba(0,128,0,0.5)';
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fill();
    }
};
