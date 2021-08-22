(function () {

    // state object
    var sm = {
        game: gameMod.create({
            aiPouch: [[16, 0, 0, 0], [1, 0, 1, 0]],
            aiStartOrbs: [null, 0, null, 1],
            aiAttackModes: [false, false, false, true],
            playerPouch: [
                [0, 0, 128, 0], [2, 0, 2, 0], [0, 0, 128, 0]
            ],
            playerStartOrbs: [0, 1, null, 2],
            playerAttackModes: [false, true, false, false],
        }),
        fps: 30,
        secs: 0,
        lt: new Date(),
        canvasObj: utils.createCanvas({
            width: 640,
            height: 480,
            container: document.getElementById('canvas-app')
        }),
        // states object
        currentState: 'game',
        states : {}
    };

    // EVENTS
    sm.states.game = {
        events : {
            pointerStart: function (e, pos, sm) {
                gameMod.emitStateEvent('onPointerStart', e, pos, sm.game);
            },
            pointerMove: function (e, pos, sm) {
                gameMod.emitStateEvent('onPointerMove', e, pos, sm.game);
            },
            pointerEnd: function (e, pos, sm) {
                gameMod.emitStateEvent('onPointerEnd', e, pos, sm.game);
            }
        }
    };

    // attaching main pointer events to canvas element
    var mainPointerEvents = {
        events : {
            pointerStart: function (e, pos, sm) {
                var handler = sm.states[sm.currentState].events.pointerStart;
                if(handler){
                    handler.call(sm, e, pos, sm);
                }
            },
            pointerMove: function (e, pos, sm) {
                var handler = sm.states[sm.currentState].events.pointerMove;
                if(handler){
                    handler.call(sm, e, pos, sm);
                }
            },
            pointerMove: function (e, pos, sm) {
                var handler = sm.states[sm.currentState].events.pointerMove;
                if(handler){
                    handler.call(sm, e, pos, sm);
                }
            }
        }
    };
    utils.canvasPointerEvents(sm.canvasObj.canvas, sm, mainPointerEvents.events);

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
