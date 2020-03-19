var draw = (function () {

    var gradient;
    var api = {};

    api.setGradient = function (state) {
        var canvas = state.canvas;
        gradient = state.ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#ff0000');
        gradient.addColorStop(0.33, '#00ff00');
        gradient.addColorStop(0.66, '#0000ff');
        gradient.addColorStop(1, '#ffffff');
    };

    api.back = function (state) {
        var ctx = state.ctx,
        canvas = state.canvas;
        // solid black background
        ctx.fillStyle = gradient || 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    api.circles = function (state) {
        var ctx = state.ctx,
        canvas = state.canvas,
        i = state.circles.length,
        circle;
        ctx.stokeStyle = 'black';
        ctx.lineWidth = 3;
        while (i--) {
            circle = state.circles[i];
            ctx.globalAlpha = circle.alpha;
            ctx.fillStyle = circle.color;
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
    };

    return api;

}
    ());
