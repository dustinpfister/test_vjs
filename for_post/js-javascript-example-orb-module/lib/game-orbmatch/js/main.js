(function () {

    // state object
    var sm = {
        game: gameMod.create({
            aiPouch: [[16, 0, 0, 0], [8, 0, 8, 0]],
            aiStartOrbs: [null, 0, null, 1],
            aiAttackModes: [false, false, false, false],
            playerPouch: [
                [0, 0, 16, 0], [1, 0, 1, 0], [16, 16, 0, 0]
            ],
            playerStartOrbs: [0, 1],
            playerAttackModes: [false, true, false, false],
        }),
        fps: 30,
        secs: 0,
        lt: new Date(),
        canvasObj: utils.createCanvas({
            width: 640,
            height: 480,
            container: document.getElementById('canvas-app')
        })
    };

    // EVENTS
    var events = {
        pointerStart: function (e, pos, sm) {
            gameMod.emitStateEvent('onPointerStart', e, pos, sm.game);
        },
        pointerMove: function (e, pos, sm) {
            gameMod.emitStateEvent('onPointerMove', e, pos, sm.game);
        },
        pointerEnd: function (e, pos, sm) {
            gameMod.emitStateEvent('onPointerEnd', e, pos, sm.game);
        }
    };
    utils.canvasPointerEvents(sm.canvasObj.canvas, sm, events);

    // main app loop
    var loop = function () {
        var now = new Date();
        sm.secs = (now - sm.lt) / 1000;
        requestAnimationFrame(loop);
        if (sm.secs >= 1 / sm.fps) {
            // update
            gameMod.update(sm.game, sm.secs);
            // draw
            var ctx = sm.canvasObj.ctx,
            canvas = sm.canvasObj.canvas;
            draw.gameState(sm, ctx, canvas);
            sm.lt = now;
        }
    };
    loop();
}
    ());
