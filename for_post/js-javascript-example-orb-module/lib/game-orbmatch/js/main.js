(function () {





    var VER = '0.21.1';




    /********* ********** ********** *********/
    //  HELPERS 
    /********* ********** ********** *********/




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
 



    /********* ********** ********** *********/
    //  MAIN SM OBJECT
    /********* ********** ********** *********/




    var sm = utils.smCreateMain({
        ver: VER,
        currentState: 'mainMenu',
        debugMode: true // top loop on any page error
    });
    // non standard props for main sm object
    sm.aiPouchSettings = {
        count: 4,
        level: 1, // used to set minOrbLevel and maxOrbLevel
        minOrbLevel: 1,
        maxOrbLevel: 1
    };
    sm.gameCreateOptions = {
        aiPouch: [], // set with gameMod.createAIPouch(sm.aiPouchSettings),
        aiStartOrbs: [3, 2, 1, 0],
        aiAttackModes: [false, false, false, true],
        playerPouch: [], // set with craftingMod.getCurrentPoints method
        playerStartOrbs: [0, 1, null, 2],
        playerAttackModes: [false, true, false, false],
        onGameEnd: function(){}
    };
    sm.gameCreateOptions.onGameEnd = function(game){
        setState(sm, 'gameConfig');
    };
    updateAIPouchSettings(sm);
    // first state of crafting object
    sm.craft = craftingMod.create();
    sm.gameCreateOptions.playerPouch = craftingMod.getCurrentPoints(sm.craft);
    // first state of game object
    sm.gameCreateOptions.aiPouch = gameMod.createAIPouch(sm.aiPouchSettings);
    sm.game = gameMod.create(sm.gameCreateOptions);




    /********* ********** ********** *********/
    //  STATE OBJECTS
    /********* ********** ********** *********/




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
                utils.buttonCheck(e, pos, sm);
            },
            pointerMove: function (e, pos, sm) {},
            pointerEnd: function (e, pos, sm) {}
        }
    };
    // The Crafting State
    sm.states.crafting = {
        buttons: {
            back: {
                disp: 'Main Menu',
                x: 530,
                y: 350,
                w: 80,
                h: 80,
                onClick: function (e, pos, sm, button) {
                    sm.craft.currentState = 'pouchEdit';
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
            var craft = sm.craft
            draw.buttonCollection(craft.states[craft.currentState].buttons, ctx);
            // draw state of current pouch
            draw.orbCollection(sm, ctx, canvas, craft.currentPouch);
            // call draw method of current craft state
            craft.states[craft.currentState].draw(craft, ctx, canvas);
            // disply current craft state
            ctx.fillStyle = 'white';
            ctx.textAlign = 'left';
            ctx.textBaseline =  'top';
            ctx.font = '20px arial';
            ctx.fillText(craft.currentState, 20, 20);
            
        },
        events : {
            pointerStart: function (e, pos, sm) {
                utils.buttonCheck(e, pos, sm);
                craftingMod.emitStateEvent('pointerStart', e, pos, sm.craft);
            },
            pointerMove: function (e, pos, sm) {
                craftingMod.emitStateEvent('pointerMove', e, pos, sm.craft);
            },
            pointerEnd: function (e, pos, sm) {
                craftingMod.emitStateEvent('pointerEnd', e, pos, sm.craft);
            }
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
                utils.buttonCheck(e, pos, sm);
            },
            pointerMove: function (e, pos, sm) {},
            pointerEnd: function (e, pos, sm) {}
        }
    };
    // The Game State
    sm.states.game = {
        buttons: {},
        start: function(sm){
            // update ai pouch based on sm.aiPouchSettings state
            sm.gameCreateOptions.aiPouch = gameMod.createAIPouch(sm.aiPouchSettings);
            // set player pouch to what is set up in the craft object
             sm.gameCreateOptions.playerPouch = craftingMod.getCurrentPoints(sm.craft);
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



    /********* ********** ********** *********/
    //  EVENTS
    /********* ********** ********** *********/




    // attaching main pointer events to canvas element
/*
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
*/



    /********* ********** ********** *********/
    //  START MAIN APP LOOP
    /********* ********** ********** *********/

    // start main loop
    sm.loop();

}
    ());
