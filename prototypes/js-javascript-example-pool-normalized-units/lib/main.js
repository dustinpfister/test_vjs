// state object
var canvasObj = utils.createCanvas({
        width: 640,
        height: 480
    });
// main sm object
var sm = {
    ver: 'r0',
    lt: new Date(),
    fps: 30,
    game: null,
    ctx: canvasObj.ctx,
    canvas: canvasObj.canvas,
    background: {
       angle: 1,
       degreesPerSec: -5,
       radius: 200
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
        // update game
        gameMod.update(sm.game, secs);
        // draw
        draw.background(sm, sm.ctx, sm.canvas);
        draw.pool(sm, sm.game.buildings, sm.ctx);
        draw.pool(sm, sm.game.attackers, sm.ctx);
        draw.pool(sm, sm.game.shots, sm.ctx);
        draw.ver(sm, sm.ctx, sm.canvas);
        sm.lt = now;
    }
};
loop();
