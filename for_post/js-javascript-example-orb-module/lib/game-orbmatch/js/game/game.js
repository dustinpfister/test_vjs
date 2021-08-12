(function (api) {

    var gameStates = {};

    // create a player/ai object

    // get total attack
    var getTotalAttack = function(game, faction){
        return game[faction].slots.orbs.reduce(function(acc, orb){
            if(orb.data.attackMode && orb.type != 'null' && orb.data.hp.current > 0){
                return acc + orb.data.attack.current;
            }
            return acc;
        }, 0);
    };

    var createPlayerObject = function (opt) {
        opt = opt || {};
        var playerObj = {
            faction: opt.faction || 'ai',
            totalAttack: 0
        };
        playerObj.pouch = OrbCollection.create({
                key: 'pouch',
                faction: playerObj.faction,
                count: 8
            });
        playerObj.slots = OrbCollection.create({
                key: 'slots',
                faction: playerObj.faction,
                count: 4,
                points: [0, 0, 0, 0],
                level: 0
            });
        // set up orb data and position slots
        playerObj.slots.orbs.forEach(function (orb, i) {
            orb.data.homeX = 64 + (640 - 32) / 4 * i;
            orb.data.homeY = 240 + 60 * (playerObj.faction === 'player' ? 1 : -1);
            orb.data.attackMode = true;
            orb.data.hp = {
                current: 10,
                max: 10,
                per: 1,
                heal: 0
            };
            orb.data.attack = {
                current: 1
            };
            orb.x = orb.data.homeX;
            orb.y = orb.data.homeY;
        });
        // setting a starting orb
        OrbCollection.setOrbPropsToOrb(playerObj.slots, 1,  playerObj.pouch.orbs[0]);
        playerObj.pouch.orbs[0].type = 'null';
        return playerObj;
    };

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
                faction: 'player'
            });
        // start the ai object
        game.ai = createPlayerObject({
                faction: 'ai'
            });
        // set total attack values for first time
        game.player.totalAttack = getTotalAttack(game, 'player');
        game.ai.totalAttack = getTotalAttack(game, 'ai');
        return game;
    };

    // get a button that was clicked for the current state and if so which one.
    // This will return a ref to the button, or null
    var getButton = function(game, x, y){
        var state = gameStates[game.currentState];
        var buttons = state.buttons;
        var keys = Object.keys(buttons);
        var i = 0,
        buttonKey,
        b,
        len = keys.length;
        while(i < len){
            buttonKey = keys[i];
            b = buttons[buttonKey];
            if(utils.boundingBox(b.x, b.y, b.w, b.h, x, y, 1, 1)){
                return b;
            }
            i += 1;
        }
        return null;
    };

    var buttonCheck = function(e, pos, game){
        var b = getButton(game, pos.x, pos.y);
        if(b){
            b.onClick.call(b, e, pos, game, b);
        }
    };

    // player turn state
    gameStates.playerTurn = {
        buttons: {
            setOrbs: {
                disp: 'Set Orbs',
                x: 500,
                y: 400,
                w: 128,
                h: 64,
                onClick: function(e, pos, game, button){
                    game.currentState = 'playerTurnOrbMenu';
                }
            },
            endTrun: {
                disp: 'End Turn',
                x: 300,
                y: 400,
                w: 128,
                h: 64,
                onClick: function(e, pos, game, button){
                    game.currentState = 'aiTurn';
                }
            }
        },
        update: function (game, secs) {
            game.player.totalAttack = getTotalAttack(game, 'player');
        },
        events: {
            onPointerStart: function (e, pos, game) {
                buttonCheck(e, pos, game);
                var orb = OrbCollection.getOrbAtPos(game.player.slots, pos.x, pos.y);
                if(orb){
                    if(orb.type != 'null'){
                        orb.data.attackMode = !orb.data.attackMode;
                    }
                }
            },
            onPointerMove: function (e, pos, game) {},
            onPointerEnd: function (e, pos, game) {}
        }
    };

    // player turn orb menu state
    gameStates.playerTurnOrbMenu = {
        buttons: {
            done: {
                disp: 'Done',
                x: 500,
                y: 400,
                w: 128,
                h: 64,
                onClick: function(e, pos, game, button){
                    game.currentState = 'playerTurn';
                }
            }
        },
        update: function (game, secs) {
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

        },
        events: {
            onPointerStart: function (e, pos, game) {
                // button check
                buttonCheck(e, pos, game);
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
                    collection = playerObj[orbData.key];
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

    // ai turn state
    gameStates.aiTurn = {
        buttons: {},
        update: function (game, secs) {
            game.ai.totalAttack = getTotalAttack(game, 'ai');
            game.currentState = 'processTurn';
        },
        events: {}
    };

    // process turn state and helpers

    var attackTargets = function(game, faction){
        var enemyFaction = faction === 'ai' ? 'player' : 'ai';
        // get total attack value of slots
        //var attack = getTotalAttack(game, faction);
        // attack emeny orbs in slots
        game[enemyFaction].slots.orbs.forEach(function(eOrb){
            if(eOrb.type != 'null'){
                eOrb.data.hp.current -= game[faction].totalAttack; //attack;
                eOrb.data.hp.current = eOrb.data.hp.current < 0 ? 0 : eOrb.data.hp.current;
                eOrb.data.hp.per = eOrb.data.hp.current / eOrb.data.hp.max;
                
            }
        }); 
    };

    gameStates.processTurn = {
        buttons: {},
        update: function (game, secs) {
            console.log('processTurn');
            attackTargets(game, 'player');
            attackTargets(game, 'ai');
            game.currentState = 'playerTurn';
        },
        events: {}
    };

    // emit an event of the given eventKey with the given values for event, pos, and game
    api.emitStateEvent = function (eventKey, e, pos, game) {
        var handler = gameStates[game.currentState].events[eventKey];
        if (handler) {
            handler.call(e, e, pos, game);
        }
    };

    // update the current game state
    api.update = function (game, secs) {
        var updateMethod = gameStates[game.currentState].update;
        if (updateMethod) {
            updateMethod.call(game, game, secs);
        }
    };

}
    (this['gameMod'] = {}));
