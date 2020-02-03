var draw = {};

draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.stateStatusInfo = function (ctx, state) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.fillText('money: ' + state.money + ', manual: ' + state.gatherRate.manual, 10, 10);
};

draw.tickProgressBar = function (ctx, canvas, state) {
    var t = new Date() - state.lastTick,
    per = t / state.tickRate;
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, canvas.height - 10, canvas.width, 10);
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, canvas.height - 10, canvas.width * per, 10);
};

draw.debugUpgrades = function (ctx, state) {
    ctx.fillStyle = 'white';
    state.US.forEach(function (uc, i) {
        ctx.fillText('upgrade: ' + uc.dispName + ', level: ' + uc.level, 10, 20 + 10 * i);
    });
};

draw.buttonLayout = function (ctx, blObj) {


    var i = blObj.buttons.length,
    b;

    ctx.fillStyle = 'red';
    while (i--) {
        b = blObj.buttons[i];
        ctx.fillRect(b.x, b.y, b.w, b.h);
    }

};
