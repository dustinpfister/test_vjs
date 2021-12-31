// state object
var canvasObj = utils.createCanvas({
        width: 640,
        height: 480
    });
var sm = {
    lt: new Date(),
    fps: 30,
    game: gameMod.create(),
    ctx: canvasObj.ctx,
    canvas: canvasObj.canvas
};

// basic app loop
var loop = function () {
    var now = new Date(),
    secs = (now - sm.lt) / 1000;
    requestAnimationFrame(loop);
 
    if (secs >= 1 / sm.fps) {
        gameMod.update(sm.game, secs);
        draw.background(sm.ctx, sm.canvas);
        draw.pool(sm.game, sm.ctx);
        sm.lt = now;
    }
};
loop();
