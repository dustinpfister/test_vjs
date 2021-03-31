var canvasObj = utils.createCanvas({
        width: 640,
        height: 480
    });

var sm = {
    canvas: canvasObj.canvas,
    ctx: canvasObj.ctx,
    game: gameMod.create(),
    resetButton: {
        x: canvasObj.canvas.width - 32,
        y: 0,
        w: 32,
        h: 32
    },
    lt: new Date()
};

sm.canvas.addEventListener('click', function (e) {
    var pos = utils.getCanvasRelative(e);

    waveMod.onClick(sm, pos);

    var bx = sm.resetButton;
    if (utils.boundingBox(pos.x, pos.y, 1, 1, bx.x, bx.y, bx.w, bx.h)) {
        sm.game = gameMod.create();
    }

});

var loop = function () {
    var now = new Date(),
    secs = (now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    // update wave buttons
    waveMod.update(sm, secs);
    // draw
    draw.background(sm.ctx, sm.canvas, 'blue');
    draw.waveButtons(sm.ctx, sm.game.waveButtons.pool);
    draw.debugInfo(sm.ctx, sm, 128, 32);
    sm.lt = now;
};
loop();
