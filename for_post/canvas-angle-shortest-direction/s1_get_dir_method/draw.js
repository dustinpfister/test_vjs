var draw = {};

draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.circlePoint = function (ctx, canvas, angle, radius) {
    ctx.beginPath();
    var x = Math.cos(angle) * radius + canvas.width / 2;
    var y = Math.sin(angle) * radius + canvas.height / 2;
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
};

draw.circle = function (ctx, canvas, state) {
    ctx.fillStyle = 'blue';
    draw.circlePoint(ctx, canvas, state.target, 50);
    ctx.fillStyle = 'green';
    draw.circlePoint(ctx, canvas, state.current, 50);
};

draw.debug = function (ctx, state) {
    ctx.fillStyle = 'white';
    ctx.fillText(state.current, 20, 20);
};
