// state object
var canvasObj = utils.createCanvas({
        width: 640,
        height: 480
    });
// sm
var sm = {
    ver: 'r6',
    lt: new Date(),
    fps: 30,
    game: null,
    ctx: canvasObj.ctx,
    canvas: canvasObj.canvas,
    background: {
       angle: 0,
       degreesPerSec: -5,
       radius: 300
    }
};
sm.game = gameMod.create({
        sm: sm
    });
// basic app loop
var loop = function () {
    var now = new Date(),
    secs = (now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs >= 1 / sm.fps) {
        gameMod.update(sm.game, secs);
        draw.background(sm, sm.ctx, sm.canvas);
        draw.pool(sm.game, sm.ctx);
        draw.info(sm, sm.ctx, sm.canvas);
        draw.ver(sm, sm.ctx, sm.canvas);
        sm.lt = now;
        // rotation of background
        var bg = sm.background; 
        bg.angle += Math.PI / 180 * bg.degreesPerSec * secs;
        bg.angle = utils.mod(bg.angle, Math.PI * 2);
    }
};
loop();
