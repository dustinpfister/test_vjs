(function () {




    // helpers




    // update ai pouch settings
    var updateAIPouchSettings = function(sm){
        var a = sm.aiPouchSettings;
        // clamp count
        a.count = a.count > 8 ? 8 : a.count;
        a.count = a.count < 1 ? 1 : a.count;
        // update level settings
        a.level = a.level < 1 ? 1: a.level; 
        a.level = a.level > 10 ? 10: a.level;
        a.maxOrbLevel = Math.floor(a.level / 10 * 32);
        a.minOrbLevel = Math.ceil(a.maxOrbLevel * 0.5) - 1;
    };

    // start a new state, calling any hook methods when doing so 
    var setState = function(sm, newState){
        var oldState = sm.states[sm.currentState];
        var endHook = oldState.end;
        if(endHook){
            endHook.call(sm, sm);
        }
        sm.currentState = newState;
        var newState = sm.states[sm.currentState];
        var startHook = newState.start;
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





    // main state machine object




    var sm = {
        ver: '0.20.3',
        aiPouchSettings:{},
        gameCreateOptions: {},
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
        currentState: 'gameConfig', //'game', //'mainMenu',
        states : {},
        stopLoop: false
    };
    sm.aiPouchSettings = {
        count: 4,
        level: 1, // used to set minOrbLevel and maxOrbLevel
        minOrbLevel: 1,
        maxOrbLevel: 1
    };
    sm.gameCreateOptions = {
        aiPouch: gameMod.createAIPouch(sm.aiPouchSettings),
        aiStartOrbs: [3, 2, 1, 0],
        aiAttackModes: [false, false, false, true],
        playerPouch: [
            [0, 0, 128, 0], [2, 0, 2, 0], [0, 0, 128, 0]
        ],
        playerStartOrbs: [0, 1, null, 2],
        playerAttackModes: [false, true, false, false],
        onGameEnd: function(){}
    };
    sm.gameCreateOptions.onGameEnd = function(game){
        setState(sm, 'gameConfig');
    };
    updateAIPouchSettings(sm);
    sm.game = gameMod.create(sm.gameCreateOptions);



    

    // state objects





    // The main menu State
    sm.states.mainMenu = {
        buttons: {
            newGame: {
                disp: 'New Game',
                x: 220,
                y: 200,
                w: 200,
                h: 64,
                onClick: function (e, pos, game, button) {
                    setState(sm, 'gameConfig');
                }
            },
            crafting: {
                disp: 'Crafting',
                x: 220,
                y: 300,
                w: 200,
                h: 64,
                onClick: function (e, pos, game, button) {
                    setState(sm, 'crafting');
                }
            }
        },
        start: function(sm){},
        end: function(sm){},
        update: function(sm, secs){},
        draw: function(sm, ctx, canvas){
            var state = sm.states.mainMenu;
            draw.background(sm, ctx, canvas);
            draw.buttonCollection(state.buttons, ctx);
        },
        events : {
            pointerStart: function (e, pos, sm) {
                buttonCheck(e, pos, sm);
            },
            pointerMove: function (e, pos, sm) {},
            pointerEnd: function (e, pos, sm) {}
        }
    };
    // The Crafting State
    sm.states.crafting = {
        buttons: {
            back: {
                disp: 'Back',
                x: 220,
                y: 200,
                w: 200,
                h: 64,
                onClick: function (e, pos, sm, button) {
                    setState(sm, 'mainMenu');
                }
            }
        },
        start: function(sm){},
        end: function(sm){},
        update: function(sm, secs){
        },
        draw: function(sm, ctx, canvas){
            var state = sm.states.crafting;
            draw.background(sm, ctx, canvas);
            draw.buttonCollection(state.buttons, ctx);
        },
        events : {
            pointerStart: function (e, pos, sm) {
                buttonCheck(e, pos, sm);
            },
            pointerMove: function (e, pos, sm) {},
            pointerEnd: function (e, pos, sm) {}
        }
    };
    // The Game Config State
    sm.states.gameConfig = {
        buttons: {
            startGame: {
                disp: 'start game',
                fillStyle: '#af0000',
                x: 450,
                y: 390,
                w: 150,
                h: 64,
                onClick: function (e, pos, sm, button) {
                    setState(sm, 'game');
                }
            },
            back: {
                disp: 'Back',
                x: 50,
                y: 390,
                w: 100,
                h: 64,
                onClick: function (e, pos, sm, button) {
                    setState(sm, 'mainMenu');
                }
            },
            countUp: {
                disp: 'Count+',
                x: 50,
                y: 100,
                w: 75,
                h: 50,
                onClick: function (e, pos, sm, button) {
                    var a = sm.aiPouchSettings;
                    a.count += 1;
                    updateAIPouchSettings(sm);
                }
            },
            countDown: {
                disp: 'Count-',
                x: 150,
                y: 100,
                w: 75,
                h: 50,
                onClick: function (e, pos, sm, button) {
                    var a = sm.aiPouchSettings;
                    a.count -= 1;
                    updateAIPouchSettings(sm);                  
                }
            },
            levelRangeUp: {
                disp: 'level Range+',
                x: 50,
                y: 200,
                w: 75,
                h: 50,
                onClick: function (e, pos, sm, button) {
                    var a = sm.aiPouchSettings;
                    a.level += 1;
                    updateAIPouchSettings(sm);
                }
            },
            levelRangeDown: {
                disp: 'level Range-',
                x: 150,
                y: 200,
                w: 75,
                h: 50,
                onClick: function (e, pos, sm, button) {
                    var a = sm.aiPouchSettings;
                    a.level -= 1;
                    updateAIPouchSettings(sm);                 
                }
            }
        },
        start: function(sm){},
        end: function(sm){},
        update: function(sm, secs){},
        draw: function(sm, ctx, canvas){
            var state = sm.states.gameConfig;
            draw.background(sm, ctx, canvas);
            draw.buttonCollection(state.buttons, ctx);
            // display state of sm.aiPouchSettings
            ctx.fillStyle = 'white';
            ctx.textAlign = 'left';
            ctx.textBaseline =  'top';
            ctx.font = '20px arial';
            var a = sm.aiPouchSettings;
            ctx.fillText('count: ' + a.count, 350, 150);
            ctx.fillText('level range: ' + a.minOrbLevel + ' - ' + a.maxOrbLevel, 350, 175);
        },
        events : {
            pointerStart: function (e, pos, sm) {
                buttonCheck(e, pos, sm);
            },
            pointerMove: function (e, pos, sm) {},
            pointerEnd: function (e, pos, sm) {}
        }
    };
    // The Game State
    sm.states.game = {
        buttons: {},
        start: function(sm){
            console.log('hello');
            // update ai pouch based on am.aiPouchSettings state
            sm.gameCreateOptions.aiPouch = gameMod.createAIPouch(sm.aiPouchSettings);
            // create new game object
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
        sm.secs = (now - sm.lt) / 1000,
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

        // if sm.stopLoop === false, then keep looping
        if(!sm.stopLoop){
            requestAnimationFrame(loop);
        }
    };
    loop();


    window.addEventListener('error', function(e) {
        sm.stopLoop = true;
        console.log('error: ' + e.message);
        console.log('loop stoped');
    });


}
    ());
