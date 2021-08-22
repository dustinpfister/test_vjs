(function () {




    // state object




    var sm = {
        gameCreateOptions: {
            aiPouch: gameMod.createAIPouch(1), //[[16, 0, 0, 0], [1, 0, 1, 0]],
            aiStartOrbs: [3, 2, 1, 0],
            aiAttackModes: [false, false, false, true],
            playerPouch: [
                [0, 0, 128, 0], [2, 0, 2, 0], [0, 0, 128, 0]
            ],
            playerStartOrbs: [0, 1, null, 2],
            playerAttackModes: [false, true, false, false],
        },
        game: {},
        fps: 30,
        secs: 0,
        lt: new Date(),
        canvasObj: utils.createCanvas({
            width: 640,
            height: 480,
            container: document.getElementById('canvas-app')
        }),
        // states object
        currentState: 'gameConfig',
        states : {}
    };
    sm.game = gameMod.create(sm.gameCreateOptions);



    
    // helpers




    // start a new state, calling any hook methods when doing so 
    var setState = function(sm, newState){
        var oldState = sm.states[sm.currentState];
        var endHook = oldState.end;
        if(endHook){
            endHook.call(sm, sm);
        }
        sm.currentState = newState;
        var newState = sm.states[sm.currentState];
        var startHook = oldState.start;
        if(startHook){
            startHook.call(sm, sm);
        }
    };
    // buttons
    var getButton = function (sm, x, y) {
        var state = sm.states[sm.currentState];
        var buttons = state.buttons;
        var keys = Object.keys(buttons);
        var i = 0,
        buttonKey,
        b,
        len = keys.length;
        while (i < len) {
            buttonKey = keys[i];
            b = buttons[buttonKey];
            if (utils.boundingBox(b.x, b.y, b.w, b.h, x, y, 1, 1)) {
                return b;
            }
            i += 1;
        }
        return null;
    };
    var buttonCheck = function (e, pos, sm) {
        var b = getButton(sm, pos.x, pos.y);
        if (b) {
            b.onClick.call(sm, e, pos, sm, b);
        }
    };




    // The Game State




    sm.states.game = {
        buttons: {},
        start: function(sm){
            sm.game = gameMod.create(sm.gameCreateOptions);
        },
        end: function(sm){
        },
        update: function(sm, secs){
            gameMod.update(sm.game, sm.secs);
        },
        draw: function(sm, ctx, canvas){
            draw.gameState(sm, ctx, canvas);
        },
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




    // The Game Config State




    sm.states.gameConfig = {
        buttons: {
            startGame: {
                disp: 'start game',
                x: 250,
                y: 400,
                w: 100,
                h: 64,
                onClick: function (e, pos, game, button) {
                    setState(sm, 'game');
                }
            }
        },
        start: function(sm){},
        end: function(sm){
            console.log('config end');
        },
        update: function(sm, secs){},
        draw: function(sm, ctx, canvas){
            var state = sm.states.gameConfig;
            draw.background(sm, ctx, canvas);
            draw.button(state.buttons.startGame, ctx);
        },
        events : {
            pointerStart: function (e, pos, sm) {

                buttonCheck(e, pos, sm);

            },
            pointerMove: function (e, pos, sm) {},
            pointerEnd: function (e, pos, sm) {}
        }
    };



    // EVENTS




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
            pointerEnd: function (e, pos, sm) {
                var handler = sm.states[sm.currentState].events.pointerEnd;
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
        requestAnimationFrame(loop),
        state = sm.states[sm.currentState];
        if (sm.secs >= 1 / sm.fps) {
            // update
            var update = state.update;
            if(update){
                update.call(sm, sm, sm.secs);
            }
            // draw
            var ctx = sm.canvasObj.ctx,
            canvas = sm.canvasObj.canvas;
            var drawHook = state.draw;
            if(drawHook){
                drawHook.call(sm, sm, ctx, canvas);
            }
            sm.lt = now;
        }
    };
    loop();
}
    ());
