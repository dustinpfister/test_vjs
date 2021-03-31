var canvasObj = utils.createCanvas({
        width: 640,
        height: 480
    });

var sm = {
    canvas: canvasObj.canvas,
    ctx: canvasObj.ctx,
    game: {
        waveButtons: waveMod.create({
            startY: 64,
            waveCount: 10
        })
    },
    lt: new Date()
};

var loop = function () {
    var now = new Date(),
    secs = (now - sm.lt) / 1000;
    requestAnimationFrame(loop);

    // update wave buttons
    waveMod.update(sm, secs);

    draw.background(sm.ctx, sm.canvas, 'blue');
    draw.waveButtons(sm.ctx, sm.game.waveButtons.pool);

    draw.debugInfo(sm.ctx, sm, 128, 32);

    sm.lt = now;
};
loop();
