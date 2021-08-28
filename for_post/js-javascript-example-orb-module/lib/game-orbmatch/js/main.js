(function () {





    var VER = '0.22.1';




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
        utils.smSetState(sm, 'gameConfig');
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
    utils.smPushState(sm, {
        name: 'mainMenu',
        buttons: {
            newGame: {
                disp: 'New Game',
                x: 220,
                y: 200,
                w: 200,
                h: 64,
                onClick: function (e, pos, game, button) {
                    utils.smSetState(sm, 'gameConfig');
                }
            },
            crafting: {
                disp: 'Crafting',
                x: 220,
                y: 300,
                w: 200,
                h: 64,
                onClick: function (e, pos, game, button) {
                    utils.smSetState(sm, 'crafting');
                }
            }
        },
        draw: function(sm, ctx, canvas){
            var state = sm.states.mainMenu;
            draw.background(sm, ctx, canvas);
            draw.buttonCollection(state.buttons, ctx);
        },
        events : {
            pointerStart: function (e, pos, sm) {
                utils.buttonCheck(e, pos, sm);
            }
        }
    });


    // The Crafting State
    utils.smPushState(sm, {
        name: 'crafting',
        buttons: {
            back: {
                disp: 'Main Menu',
                x: 530,
                y: 350,
                w: 80,
                h: 80,
                onClick: function (e, pos, sm, button) {
                    sm.craft.currentState = 'pouchEdit';
                    utils.smSetState(sm, 'mainMenu');
                }
            }
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
    });

    // The Game Config State
    utils.smPushState(sm, {
        name: 'gameConfig',
        buttons: {
            startGame: {
                disp: 'start game',
                fillStyle: '#af0000',
                x: 450,
                y: 390,
                w: 150,
                h: 64,
                onClick: function (e, pos, sm, button) {
                    utils.smSetState(sm, 'game');
                }
            },
            back: {
                disp: 'Back',
                x: 50,
                y: 390,
                w: 100,
                h: 64,
                onClick: function (e, pos, sm, button) {
                    utils.smSetState(sm, 'mainMenu');
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
            }
        }
    });


    utils.smPushState(sm, {
        name: 'game',
        start: function(sm){
            // update ai pouch based on sm.aiPouchSettings state
            sm.gameCreateOptions.aiPouch = gameMod.createAIPouch(sm.aiPouchSettings);
            // set player pouch to what is set up in the craft object
            sm.gameCreateOptions.playerPouch = craftingMod.getCurrentPoints(sm.craft);
            // create new game object
            sm.game = gameMod.create(sm.gameCreateOptions);
        },
        update: function(sm, secs){
            gameMod.update(sm.game, sm.secs);
        },
        draw: function(sm, ctx, canvas){
            draw.gameState(sm, ctx, canvas);
            // call draw method of current game state in gameMod if it has one
            var drawMethod = sm.game.states[sm.game.currentState].draw;
            if(drawMethod){
                drawMethod.call(sm.game, sm.game, ctx, canvas);
            }
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
    });




    /********* ********** ********** *********/
    //  START MAIN APP LOOP
    /********* ********** ********** *********/




    // start main loop

console.log(orbMod.createFromPoints([1,0,0,0]));

    sm.loop();

}
    ());
