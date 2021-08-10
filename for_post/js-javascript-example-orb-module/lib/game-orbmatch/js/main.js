(function () {

    var orb = orbMod.createFromLevel([1, 1, 1, 1], 7);
    console.log(orb.type); // 'quad'

    // state object
    var sm = {
        game: gameMod.create(),
        canvasObj: utils.createCanvas({
            width: 640,
            height: 480,
            container: document.getElementById('canvas-app')
        })
    };

    // EVENTS AND HELPERS
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
        requestAnimationFrame(loop);
        // draw
        draw.background(sm, sm.canvasObj.ctx, sm.canvasObj.canvas);
        draw.slots(sm, sm.canvasObj.ctx, sm.canvasObj.canvas, sm.game.player.slots);
        draw.pouch(sm, sm.canvasObj.ctx, sm.canvasObj.canvas, sm.game.player.pouch)
        /*
        sm.game.player.pouch.orbs.forEach(function (orb) {
        draw.orb(sm, sm.canvasObj.ctx, sm.canvasObj.canvas, orb);
        });
         */
        draw.orbInfo(sm, sm.canvasObj.ctx, sm.canvasObj.canvas, sm.game.player.pouch.orbs[0]);
    };
    loop();
}
    ());
