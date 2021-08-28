(function (api) {

    var gameStates = utils.smCreateMin({
            currentState: 'playerTurn'
        });

    /********* ********** ********** *********/
    //  HELPERS
    /********* ********** ********** *********/

    // update in range orbs for the given orb
    var updateInRangeOrbs = function (game, orb) {
        var eSlots = orb.data.faction === 'ai' ? game.player.slots : game.ai.slots;
        if (orb.data.attackMode) {
            orb.data.inRangeOrbs = OrbCollection.getRangeOrbs(orb, eSlots);
        } else {
            orb.data.inRangeOrbs = OrbCollection.getRangeOrbs(orb, game[orb.data.faction].slots);
        }
        return orb.data.inRangeOrb;
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
                homeXStart: 32,
                homeYStart: playerObj.faction === 'player' ? 400 : -32,
                points: opt.pouchPoints || [[0, 0, 1, 0]]
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
        // setting a starting orbs
        // create default for opt.startOrbs if false
        if (!opt.startOrbs) {
            opt.startOrbs = [];
            var i = 0,
            len = playerObj.pouch.orbs.length;
            while (i < len) {
                var orb = playerObj.pouch.orbs[i];
                if (orb.type != 'null') {
                    opt.startOrbs.push(orb.data.i);
                }
                if (opt.startOrbs.length === playerObj.slots.orbs.length) {
                    break;
                }
                i += 1;
            }
        }
        // apply starting orbs
        opt.startOrbs.forEach(function (pouchIndex, slotIndex) {
            if (typeof pouchIndex === 'number') {
                OrbCollection.setOrbPropsToOrb(playerObj.slots, slotIndex, playerObj.pouch.orbs[pouchIndex]);
                playerObj.pouch.orbs[pouchIndex].type = 'null';
            }
        });
        // set up attackModes for first time
        if (opt.attackModes) {
            opt.attackModes.forEach(function (bool, i) {
                playerObj.slots.orbs[i].data.attackMode = bool;
            });
        }
        return playerObj;
    };

    /********* ********** ********** *********/
    //  CREATE METHOD AND OTHER PUBLIC METHODS TO USE WITH CREATE
    /********* ********** ********** *********/

    // create and return the game object
    api.create = function (opt) {
        opt = opt || {};
        // using utils.smCreateMin to make sure I am drealing with a base sm object
        var game = utils.smCreateMin(gameStates);
        // non standard sm object props
        game.selectedOrb = null;
        // used for flashing effect and solid color
        game.playerSlotFillStyle = {
            secs: 0,
            colorIndex: 0,
            colorArray: ['lime', 'red', 'brown'],
            color: 'lime'
        };
        // what to do on game end
        game.onGameEnd = opt.onGameEnd || function (game) {};
        // the start of a player object
        game.player = createPlayerObject({
                faction: 'player',
                pouchPoints: opt.playerPouch || [
                    [1, 0, 0, 0]
                ],
                startOrbs: opt.playerStartOrbs || false,
                attackModes: opt.playerAttackModes || []
            });
        // start the ai object
        game.ai = createPlayerObject({
                faction: 'ai',
                pouchPoints: opt.aiPouch || [
                    [0, 1, 0, 0]
                ],
                startOrbs: opt.aiStartOrbs || false,
                attackModes: opt.aiAttackModes || []
            });
        // set total attack values for first time
        game.player.totalAttack = getTotalAttack(game, 'player');
        game.ai.totalAttack = getTotalAttack(game, 'ai');
        game.player.totalHeal = getTotalHeal(game, 'player');
        game.ai.totalHeal = getTotalHeal(game, 'ai');
        return game;
    };

    // create and return a value to use with the gameMod.create aiPouch option
    var orbTypers = {
        randomPure: function () {
            var arr = [0, 0, 0, 0];
            arr[Math.floor(Math.random() * 4)] = 1;
            return arr;
        }
    };
    api.createAIPouch = function (opt) {
        opt = opt || {};
        opt.count = opt.count === undefined ? 1 : opt.count;
        opt.minOrbLevel = opt.minOrbLevel === undefined ? 1 : opt.minOrbLevel;
        opt.maxOrbLevel = opt.maxOrbLevel === undefined ? 1 : opt.maxOrbLevel;
        opt.typer = opt.typer || 'randomPure';
        // parse typer string
        if (typeof opt.typer === 'string') {
            opt.typer = orbTypers[opt.typer];
        }
        var pouch = [],
        i = 0;
        while (i < opt.count) {
            var orbLevel = opt.minOrbLevel + Math.floor(Math.random() * (opt.maxOrbLevel - opt.minOrbLevel));
            var points = opt.typer().map(function (elCount) {
                    return elCount * Math.pow(2, orbLevel - 1);
                });
            pouch.push(points);
            i += 1;
        }
        return pouch;
    };

    /********* ********** ********** *********/
    //  PLAYER TURN STATE
    /********* ********** ********** *********/

    utils.smPushState(gameStates, {
        name: 'playerTurn',
        buttons: {
            setOrbs: {
                disp: 'Set Orbs',
                x: 250,
                y: 400,
                w: 100,
                h: 64,
                onClick: function (e, pos, game, button) {
                    utils.smSetState(game, 'playerTurnOrbMenu');
                }
            },
            orbConfig: {
                disp: 'Config Orbs',
                x: 350,
                y: 400,
                w: 100,
                h: 64,
                onClick: function (e, pos, game, button) {
                    utils.smSetState(game, 'playerTurnOrbConfig');
                }
            },
            endTrun: {
                disp: 'End Turn',
                fillStyle: 'red',
                x: 500,
                y: 400,
                w: 100,
                h: 64,
                onClick: function (e, pos, game, button) {
                    utils.smSetState(game, 'aiTurn');
                }
            },
            options: {
                disp: 'Options',
                x: 565,
                y: 10,
                w: 64,
                h: 64,
                onClick: function (e, pos, game, button) {
                    utils.smSetState(game, 'gameOptions');
                }
            }
        },
        update: function (game, secs) {
            game.player.totalAttack = getTotalAttack(game, 'player');
            game.player.totalHeal = getTotalHeal(game, 'player');
            // for all player slots
            game.player.slots.orbs.forEach(function (orb) {
                updateInRangeOrbs(game, orb);
            });
        },
        draw: function(game, ctx, canvas){
            var orb = game.selectedOrb;
            if (orb) {
                draw.orbInfo(game, ctx, canvas, orb, 10, 10);
                draw.orbRange(game, ctx, canvas, orb);
            }
        },
        events: {
            onPointerStart: function (e, pos, game) {
                utils.buttonCheck(e, pos, game);
                // set selected orb, for the sake of displaying info
                game.selectedOrb = null;
                var orb = OrbCollection.getOrbAtPos(game.player.slots, pos.x, pos.y);
                if (orb) {
                    if (orb.type != 'null') {
                        game.selectedOrb = orb;
                    }
                }
            }
        }
    });

    /********* ********** ********** *********/
    //  PLAYER TURN ORB MENU STATE
    /********* ********** ********** *********/

    utils.smPushState(gameStates, {
        name: 'playerTurnOrbMenu',
        buttons: {
            done: {
                disp: 'Done',
                x: 500,
                y: 400,
                w: 128,
                h: 64,
                onClick: function (e, pos, game, button) {
                    utils.smSetState(game, 'playerTurn');
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
                utils.buttonCheck(e, pos, game);
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
    });

    /********* ********** ********** *********/
    //  PLAYER TURN ORB CONFIG STATE
    /********* ********** ********** *********/

    utils.smPushState(gameStates, {
        name: 'playerTurnOrbConfig',
        buttons: {
            done: {
                disp: 'Done',
                x: 500,
                y: 400,
                w: 100,
                h: 64,
                onClick: function (e, pos, game, button) {
                    utils.smSetState(game, 'playerTurn');
                }
            }
        },
        update: function (game, secs) {
            game.player.totalAttack = getTotalAttack(game, 'player');
            game.player.totalHeal = getTotalHeal(game, 'player');
        },
        events: {
            onPointerStart: function (e, pos, game) {
                utils.buttonCheck(e, pos, game);
                var orb = OrbCollection.getOrbAtPos(game.player.slots, pos.x, pos.y);
                if (orb) {
                    if (orb.type != 'null') {
                        orb.data.attackMode = !orb.data.attackMode;
                    }
                }
            }
        }
    });

    /********* ********** ********** *********/
    //  AI TURN STATE
    /********* ********** ********** *********/

    // ai turn state
    utils.smPushState(gameStates, {
        name: 'aiTurn',
        update: function (game, secs) {
            game.ai.totalAttack = getTotalAttack(game, 'ai');
            utils.smSetState(game, 'processTurn');
            // for all ai slots
            game.ai.slots.orbs.forEach(function (orb) {
                updateInRangeOrbs(game, orb);
            });
        }
    });

    /********* ********** ********** *********/
    //  PROCESS TURN STATE
    /********* ********** ********** *********/

    // get a count of slot orbs where orb.data.type != null
    var getActiveOrbCount = function (game, faction) {
        return game[faction].slots.orbs.reduce(function (acc, orb) {
            return orb.type != 'null' ? acc + 1 : acc;
        }, 0);
    };

    // get targets for the given orb
    var getTargets = function (game, orb) {
        orb.data.targets = [];
        // in range orbs prop allows for null orbs in collection, so be sure to filter them out
        var targets = orb.data.inRangeOrbs.reduce(function (acc, orb) {
                if (orb.type != 'null') {
                    acc.push(orb);
                }
                return acc;
            }, []);
        if (targets.length >= 1) {
            // just selecting first target for now when in attack mode
            if (orb.data.attackMode) {
                orb.data.targets.push(targets[0]);
            } else {
                // select all when in !attackMode
                orb.data.targets = targets;
            }
        }
    };

    // process faction turn
    var processFactionTurn = function (game, faction) {
        var efString = faction === 'ai' ? 'player' : 'ai',
        efObj = game[efString],
        fObj = game[faction];
        // make sure in range slot array is up to date
        fObj.slots.orbs.forEach(function (orb) {
            updateInRangeOrbs(game, orb);
        });
        fObj.slots.orbs.forEach(function (orb) {
            // get targets
            if (orb.type != 'null') {
                // get targets
                game.states.processTurn.events.onOrbGetTargets.call(game, game, orb);
                // if in attackMode and we have targets
                if (orb.data.attackMode && orb.data.targets.length > 0) {
                    // call on orb attack event
                    game.states.processTurn.events.onOrbAttack.call(game, game, orb);
                }
                // if not in attack mode apply buffs to what should be friend targets
                if (!orb.data.attackMode && orb.data.targets.length > 0) {
                    game.states.processTurn.events.onOrbBuff.call(game, game, orb);
                }
                var deadOrbs = orb.data.targets.filter(function (orb) {
                        return orb.data.hp.current <= 0;
                    });
                deadOrbs.forEach(function (deadOrb) {
                    game.states.processTurn.events.onOrbDeath.call(game, game, deadOrb);

                });
            }
        });
    };

    // process turn state object
    utils.smPushState(gameStates, {
        name: 'processTurn',
        update: function (game, secs) {
            processFactionTurn(game, 'player');
            processFactionTurn(game, 'ai');
            // check active counts
            var playerActive = getActiveOrbCount(game, 'player'),
            aiActive = getActiveOrbCount(game, 'ai');
            if (playerActive === 0 || aiActive === 0) {
                utils.smSetState(game, 'gameOver');
            } else {
                utils.smSetState(game, 'playerTurn');
            }
        },
        events: {
            // define how an orb is to get targets
            onOrbGetTargets: function (game, orb) {
                console.log('orbGetTargets: ', orb.data.faction, orb.data.i);
                getTargets(game, orb);
            },
            // on orb attack event when in attackMode
            onOrbAttack: function (game, orb) {
                console.log('orbAttack: ', orb.data.faction, orb.data.i);
                // just attack all targets for now
                var attack = orb.data.attack.current / orb.data.targets.length;
                orb.data.targets.forEach(function (eOrb) {
                    eOrb.data.hp.current -= attack;
                    eOrb.data.hp.current = eOrb.data.hp.current < 0 ? 0 : eOrb.data.hp.current;
                    eOrb.data.hp.per = eOrb.data.hp.current / eOrb.data.hp.max;
                });
            },
            // on orb buff event when !attackMode
            onOrbBuff: function (game, orb) {
                console.log('orbBuff: ', orb.data.faction, orb.data.i);
                var heal = orb.data.hp.heal / orb.data.targets.length;
                orb.data.targets.forEach(function (eOrb) {
                    eOrb.data.hp.current += heal;
                    eOrb.data.hp.current = eOrb.data.hp.current > eOrb.data.hp.max ? eOrb.data.hp.max : eOrb.data.hp.current;
                    eOrb.data.hp.per = eOrb.data.hp.current / eOrb.data.hp.max;
                });
            },
            // on orb death
            onOrbDeath: function (game, deadOrb) {
                console.log('');
                console.log('orbDeath: ', deadOrb.data.faction, deadOrb.data.i);
                console.log('');
                deadOrb.type = 'null';
            }
        }
    });

    /********* ********** ********** *********/
    //  GAME OVER STATE
    /********* ********** ********** *********/

    utils.smPushState(gameStates, {
        name: 'gameOver',
        events: {
            onPointerStart: function (e, pos, game) {
                // just calling the on game end method for any pointer event for now
                game.onGameEnd.call(game, game);
            }
        }
    });

    /********* ********** ********** *********/
    //  GAME OPTIONS STATE
    /********* ********** ********** *********/

    utils.smPushState(gameStates, {
        name: 'gameOptions',
        buttons: {
            continueGame: {
                disp: 'Continue Game',
                x: 320 - 128,
                y: 240 - 32,
                w: 100,
                h: 64,
                onClick: function (e, pos, game, button) {
                    utils.smSetState(game, 'playerTurn');
                }
            },
            endGame: {
                disp: 'End Game',
                x: 320,
                y: 240 - 32,
                w: 100,
                h: 64,
                onClick: function (e, pos, game, button) {
                    utils.smSetState(game, 'gameOver');
                }
            },
        },
        events: {
            onPointerStart: function (e, pos, game) {
                utils.buttonCheck(e, pos, game);
            }
        }
    });

    /********* ********** ********** *********/
    //  EVENT
    /********* ********** ********** *********/

    // emit an event of the given eventKey with the given values for event, pos, and game
    api.emitStateEvent = function (eventKey, e, pos, game) {
        var handler = game.states[game.currentState].events[eventKey];
        if (handler) {
            handler.call(e, e, pos, game);
        }
    };

    /********* ********** ********** *********/
    //  UPDATE
    /********* ********** ********** *********/

    // update the current game state
    api.update = function (game, secs) {
        var updateMethod = game.states[game.currentState].update;
        if (updateMethod) {
            updateMethod.call(game, game, secs);
        }
    };

}
    (this['gameMod'] = {}));
