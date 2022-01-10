// state object
var canvasObj = utils.createCanvas({
        width: 640,
        height: 480
    });
// main sm object
var sm = {
    ver: 'r5',
    lt: new Date(),
    fps: 30,
    game: null,
    ctx: canvasObj.ctx,
    canvas: canvasObj.canvas,
    background: {
       angle: 1,
       degreesPerSec: 5,
       ri: 0,
       radius: 100
    }
};
// set up game object
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
        draw.ver(sm, sm.ctx, sm.canvas);
        sm.lt = now;
        // rotation of background
        var bg = sm.background; 
        bg.angle += Math.PI / 180 * bg.degreesPerSec * secs;
        bg.angle = utils.mod(bg.angle, Math.PI * 2);
        // radius
        bg.ri += 5 * secs;
        bg.ri %= 100;
        var per = bg.ri / 100,
        bias = 1 - Math.abs(0.5 - per) / 0.5;
        bg.radius = 400 - 350 * bias;
    }
};
loop();
