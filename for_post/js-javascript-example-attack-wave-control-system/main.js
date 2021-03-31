var canvasObj = utils.createCanvas({
        width: 640,
        height: 480
    });

var gameMod = (function () {
    var api = {};
    api.create = function () {
        return {
            waveButtons: waveMod.create({
                startY: 64,
                waveCount: 99
            })
        };
    };
    return api;
}());

var sm = {
    canvas: canvasObj.canvas,
    ctx: canvasObj.ctx,
    game: gameMod.create(),
    lt: new Date()
};

sm.canvas.addEventListener('click', function (e) {
    var pos = utils.getCanvasRelative(e);
    waveMod.onClick(sm, pos);
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
