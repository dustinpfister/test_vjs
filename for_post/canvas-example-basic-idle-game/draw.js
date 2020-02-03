var draw = {};

draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.stateStatusInfo = function (ctx, state) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.fillText(state.money, 10, 10);
};

draw.tickProgressBar = function (ctx, canvas, state) {
    var t = new Date() - state.lastTick,
    per = t / state.tickRate;
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, canvas.height - 10, canvas.width, 10);
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, canvas.height - 10, canvas.width * per, 10);
};
