(function (api) {

    var gameStates = {};

    /********* ********** ********** *********/
    //  HELPERS
    /********* ********** ********** *********/

    // get a button that was clicked for the current state and if so which one.
    // This will return a ref to the button, or null
    var getButton = function (game, x, y) {
        var state = gameStates[game.currentState];
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

    var buttonCheck = function (e, pos, game) {
        var b = getButton(game, pos.x, pos.y);
        if (b) {
            b.onClick.call(b, e, pos, game, b);
        }
    };

    // create a player/ai object
    var getOrbDataTotal = function (game, faction, objKey, propKey, attackMode) {
        return game[faction].slots.orbs.reduce(function (acc, orb) {
            if (orb.data.attackMode === attackMode && orb.type != 'null' && orb.data.hp.current > 0) {
                return acc + orb.data[objKey][propKey];
            }
            return acc;
        }, 0);
    };

    // get total attack
    var getTotalAttack = function (game, faction) {
        return getOrbDataTotal(game, faction, 'attack', 'current', true);
    };
    // get total heal
    var getTotalHeal = function (game, faction) {
        return getOrbDataTotal(game, faction, 'hp', 'heal', false);
    };

    // create a player object for game.player, or game.ai
    var createPlayerObject = function (opt) {
        opt = opt || {};
        var playerObj = {
            faction: opt.faction || 'ai',
            totalAttack: 0,
            totalHeal: 0
        };
        playerObj.pouch = OrbCollection.create({
                key: 'pouch',
                faction: playerObj.faction,
                count: 8,
                points: opt.pouchPoints || [[0,0,1,0]]
            });
        playerObj.slots = OrbCollection.create({
                key: 'slots',
                faction: playerObj.faction,
                count: 4,
                points: [0, 0, 0, 0],
                level: 0
            });
        // set adjust positions for slots
        playerObj.slots.orbs.forEach(function (orb, i) {
            orb.data.homeX = 64 + (640 - 32) / 4 * i;
            orb.data.homeY = 240 + 60 * (playerObj.faction === 'player' ? 1 : -1);
            orb.x = orb.data.homeX;
            orb.y = orb.data.homeY;
        });
        // setting a starting orb
        OrbCollection.setOrbPropsToOrb(playerObj.slots, 1, playerObj.pouch.orbs[0]);
        playerObj.pouch.orbs[0].type = 'null';
        return playerObj;
    };

    /********* ********** ********** *********/
    //  CREATE METHOD
    /********* ********** ********** *********/

    // create and return a new game object
    api.create = function (opt) {
        opt = opt || {};
        var game = {
            gameStates: gameStates,
            turnNumber: 0,
            currentState: 'playerTurn', //'playerTurnOrbMenu',
            selectedOrb: null,
            playerSlotFillStyle: { // used for flashing effect and solid color
                secs: 0,
                colorIndex: 0,
                colorArray: ['lime', 'red', 'brown'],
                color: 'lime'
            }
        };
        // the start of a player object
        game.player = createPlayerObject({
                faction: 'player',
                pouchPoints: opt.playerPouch || [
                    [1, 0, 0, 0]
                ]
            });
        // start the ai object
        game.ai = createPlayerObject({
                faction: 'ai',
                pouchPoints: opt.aiPouch || [
                    [0, 1, 0, 0]
                ]
            });
        // set total attack values for first time
        game.player.totalAttack = getTotalAttack(game, 'player');
        game.ai.totalAttack = getTotalAttack(game, 'ai');
        game.player.totalHeal = getTotalHeal(game, 'player');
        game.ai.totalHeal = getTotalHeal(game, 'ai');
        return game;
    };

    /********* ********** ********** *********/
    //  PLAYER TURN STATE
    /********* ********** ********** *********/

    gameStates.playerTurn = {
        buttons: {
            setOrbs: {
                disp: 'Set Orbs',
                x: 300,
                y: 400,
                w: 100,
                h: 64,
                onClick: function (e, pos, game, button) {
                    game.currentState = 'playerTurnOrbMenu';
                }
            },
            orbConfig: {
                disp: 'Config Orbs',
                x: 400,
                y: 400,
                w: 100,
                h: 64,
                onClick: function (e, pos, game, button) {
                    game.currentState = 'playerTurnOrbConfig';
                }
            },
            endTrun: {
                disp: 'End Turn',
                x: 500,
                y: 400,
                w: 100,
                h: 64,
                onClick: function (e, pos, game, button) {
                    game.currentState = 'aiTurn';
                }
            }
        },
        update: function (game, secs) {
            game.player.totalAttack = getTotalAttack(game, 'player');
            game.player.totalHeal = getTotalHeal(game, 'player');
        },
        events: {
            onPointerStart: function (e, pos, game) {
                buttonCheck(e, pos, game);
                // set selected orb, for the sake of displaying info
                game.selectedOrb = null;
                var orb = OrbCollection.getOrbAtPos(game.player.slots, pos.x, pos.y);
                if (orb) {
                    if (orb.type != 'null') {
                        game.selectedOrb = orb;
                    }
                }
            },
            onPointerMove: function (e, pos, game) {},
            onPointerEnd: function (e, pos, game) {}
        }
    };

    /********* ********** ********** *********/
    //  PLAYER TURN ORB MENU STATE
    /********* ********** ********** *********/

    gameStates.playerTurnOrbMenu = {
        buttons: {
            done: {
                disp: 'Done',
                x: 500,
                y: 400,
                w: 128,
                h: 64,
                onClick: function (e, pos, game, button) {
                    game.currentState = 'playerTurn';
                }
            }
        },
        update: function (game, secs) {
            // flash player slots
            var psf = game.playerSlotFillStyle;
            psf.secs += secs;
            if (psf.secs >= 0.2) {
                psf.colorIndex += 1;
                psf.colorIndex %= psf.colorArray.length;
                psf.color = psf.colorArray[psf.colorIndex];
                psf.secs %= 0.2;
            }
            // make sure totalAttack is up to date
            game.player.totalAttack = getTotalAttack(game, 'player');
            game.player.totalHeal = getTotalHeal(game, 'player');
        },
        events: {
            onPointerStart: function (e, pos, game) {
                // button check
                buttonCheck(e, pos, game);
                game.selectedOrb = null;
                // clicked a pouch orb
                var orb = OrbCollection.getOrbAtPos(game.player.pouch, pos.x, pos.y);
                if (orb) {
                    // can not select null orbs
                    if (orb.type != 'null') {
                        game.selectedOrb = orb;
                    }
                }
                // clicked a slot orb
                var orb = OrbCollection.getOrbAtPos(game.player.slots, pos.x, pos.y);
                if (orb) {
                    // can not select null orbs
                    if (orb.type != 'null') {
                        game.selectedOrb = orb;
                    }
                }
            },
            onPointerMove: function (e, pos, game) {
                if (game.selectedOrb) {
                    var orb = game.selectedOrb;
                    orb.x = pos.x;
                    orb.y = pos.y;
                }
            },
            onPointerEnd: function (e, pos, game) {
                // if ending with a selected orb
                if (game.selectedOrb) {
                    var orb = game.selectedOrb,
                    orbData = orb.data,
                    playerObj = game[orbData.faction],
                    collection = playerObj[orbData.collectionkey];
                    // if the selected orb is from the pouch
                    if (collection.key === 'pouch') {
                        var slot = OrbCollection.isOverCollection(game.selectedOrb, playerObj.slots);
                        if (slot) {
                            // set slot orb props to selected orb
                            OrbCollection.setOrbPropsToOrb(playerObj.slots, slot.data.i, orb);
                            // selected orb type set to null
                            orb.type = 'null';
                        }
                    }
                    // if the selected orb is from the slots
                    if (collection.key === 'slots') {
                        var pouchOrb = OrbCollection.isOverCollection(game.selectedOrb, playerObj.pouch);
                        if (pouchOrb) {
                            OrbCollection.setOrbPropsToOrb(playerObj.pouch, pouchOrb.data.i, orb);
                            orb.type = 'null';
                        }
                    }
                    // always send orb back to home location
                    orb.x = orb.data.homeX;
                    orb.y = orb.data.homeY;
                    game.selectedOrb = null;
                }
            }
        }
    };

    /********* ********** ********** *********/
    //  PLAYER TURN ORB CONFIG STATE
    /********* ********** ********** *********/

    gameStates.playerTurnOrbConfig = {
        buttons: {
            done: {
                disp: 'Done',
                x: 500,
                y: 400,
                w: 100,
                h: 64,
                onClick: function (e, pos, game, button) {
                    game.currentState = 'playerTurn';
                }
            }
        },
        update: function (game, secs) {
            game.player.totalAttack = getTotalAttack(game, 'player');
            game.player.totalHeal = getTotalHeal(game, 'player');
        },
        events: {
            onPointerStart: function (e, pos, game) {
                buttonCheck(e, pos, game);
                var orb = OrbCollection.getOrbAtPos(game.player.slots, pos.x, pos.y);
                if (orb) {
                    if (orb.type != 'null') {
                        orb.data.attackMode = !orb.data.attackMode;
                    }
                }
            },
            onPointerMove: function (e, pos, game) {},
            onPointerEnd: function (e, pos, game) {}
        }
    };

    /********* ********** ********** *********/
    //  AI TURN STATE
    /********* ********** ********** *********/

    // ai turn state
    gameStates.aiTurn = {
        buttons: {},
        update: function (game, secs) {
            game.ai.totalAttack = getTotalAttack(game, 'ai');
            game.currentState = 'processTurn';
        },
        events: {}
    };

    /********* ********** ********** *********/
    //  PROCESS TURN STATE
    /********* ********** ********** *********/

    // attack enemy targets for the given faction
    var attackTargets = function (game, faction) {
        var enemyFaction = faction === 'ai' ? 'player' : 'ai';
        // attack emeny orbs in slots
        game[enemyFaction].slots.orbs.forEach(function (eOrb) {
            if (eOrb.type != 'null') {
                eOrb.data.hp.current -= game[faction].totalAttack;
                eOrb.data.hp.current = eOrb.data.hp.current < 0 ? 0 : eOrb.data.hp.current;
                eOrb.data.hp.per = eOrb.data.hp.current / eOrb.data.hp.max;
                // set to null if dead
                if (eOrb.data.hp.current <= 0) {
                    eOrb.type = 'null';
                }
            }
        });
    };

    // apply totalHeal for the given faction
    var applyHeal = function (game, faction) {
        game[faction].slots.orbs.forEach(function (orb) {
            if (orb.type != 'null') {
                orb.data.hp.current += game[faction].totalHeal;
                orb.data.hp.current = orb.data.hp.current > orb.data.hp.max ? orb.data.hp.max : orb.data.hp.current;
                orb.data.hp.per = orb.data.hp.current / orb.data.hp.max;
            }
        });
    };

    // get a count or orbs where orb.data.type != null
    var getActiveOrbCount = function (game, faction) {
        return game[faction].slots.orbs.reduce(function (acc, orb) {
            return orb.type != 'null' ? acc + 1 : acc;
        }, 0);
    };

    // process turn state object
    gameStates.processTurn = {
        buttons: {},
        update: function (game, secs) {
            console.log('processTurn');
            // attack targets
            attackTargets(game, 'player');
            attackTargets(game, 'ai');
            // apply heal
            applyHeal(game, 'player');
            applyHeal(game, 'ai');

            // check active counts
            var playerActive = getActiveOrbCount(game, 'player'),
            aiActive = getActiveOrbCount(game, 'ai');
            if (playerActive === 0 || aiActive === 0) {
                game.currentState = 'gameOver';
            } else {
                game.currentState = 'playerTurn';
            }
        },
        events: {}
    };

    /********* ********** ********** *********/
    //  GAMEOVER STATE
    /********* ********** ********** *********/

    // game over state object
    gameStates.gameOver = {
        buttons: {},
        update: function (game, secs) {
            
        },
        events: {}
    };

    /********* ********** ********** *********/
    //  EVENT
    /********* ********** ********** *********/

    // emit an event of the given eventKey with the given values for event, pos, and game
    api.emitStateEvent = function (eventKey, e, pos, game) {
        var handler = gameStates[game.currentState].events[eventKey];
        if (handler) {
            handler.call(e, e, pos, game);
        }
    };

    /********* ********** ********** *********/
    //  UPDATE
    /********* ********** ********** *********/

    // update the current game state
    api.update = function (game, secs) {
        var updateMethod = gameStates[game.currentState].update;
        if (updateMethod) {
            updateMethod.call(game, game, secs);
        }
    };

}
    (this['gameMod'] = {}));
