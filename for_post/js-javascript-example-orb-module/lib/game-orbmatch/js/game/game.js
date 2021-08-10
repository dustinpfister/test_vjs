(function (api) {

    // create a player/ai object
    var createPlayerObject = function (opt) {
        opt = opt || {};
        var playerObj = {
            faction: opt.faction || 'ai'
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
            orb.data.homeX = 32 + (640 - 32) / 4 * i;
            orb.data.homeY = 240 + 60 * (playerObj.faction === 'player' ? 1 : -1);
            orb.x = orb.data.homeX;
            orb.y = orb.data.homeY;
        });
        return playerObj;
    };

    // create and return a new game object
    api.create = function (opt) {
        opt = opt || {};
        var game = {
            turnNumber: 0,
            currentState: 'playerTurnOrbMenu',
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
        return game;
    };

    // EVENTS
    var gameStates = {};

    // player turn state
    gameStates.playerTurn = {
        update: function (game, secs) {},
        events: {
            onPointerStart: function (e, pos, game) {},
            onPointerMove: function (e, pos, game) {},
            onPointerEnd: function (e, pos, game) {}
        }
    };

    // player turn orb menu state
    gameStates.playerTurnOrbMenu = {
        update: function (game, secs) {
            var psf = game.playerSlotFillStyle;
            psf.secs += secs;
            if (psf.secs >= 0.2) {
                psf.colorIndex += 1;
                psf.colorIndex %= psf.colorArray.length;
                psf.color = psf.colorArray[psf.colorIndex];
                psf.secs %= 0.2;
            }

        },
        events: {
            onPointerStart: function (e, pos, game) {
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
