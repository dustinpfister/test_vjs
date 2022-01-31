smMod.load({
    stateKey: 'init',
    update: function(sm, secs){
 
        // set up the build menu
        sm.buildMenu = smMod.gridMenu.create({
            x: 32,
            y: 96,
            w: 2,
            currentIndex: 0,
            cellSize: 32,
            buttons: [
                { unitKey: 'sell', action: 'sell'},
                { unitKey: 'info', action: 'info'},
                { unitKey: 'res', action: 'build' },
                { unitKey: 'com', action: 'build' },
                { unitKey: 'road', action: 'build' }
            ]
        });

        // set up game state menu
        sm.gameStateMenu = smMod.gridMenu.create({
            x: 32,
            y: 25,
            w: 2,
            currentIndex: 0,
            cellSize: 50,
            buttons: [
                { unitKey: 'build', action: 'gameBuild'},
                { unitKey: 'map', action: 'gameMap'}
            ]
        });

        // set up the build menu
        sm.mapMenu = smMod.gridMenu.create({
            x: 32,
            y: 96,
            w: 2,
            currentIndex: 0,
            cellSize: 32,
            buttons: [
                { unitKey: 'val', action: 'value'},
                { unitKey: 'pop', action: 'population'}
            ]
        });


        // create game object
        sm.game = gameMod.create({
            cellData: [
                { x: 3, y: 3, unitKey: 'road'},
                { x: 3, y: 4, unitKey: 'road'},
                { x: 3, y: 5, unitKey: 'road'},
                { x: 2, y: 3, unitKey: 'res'},
                { x: 2, y: 5, unitKey: 'res'},
                { x: 4, y: 3, unitKey: 'com'}
            ]
        });

        // switch to gameBuild state
        smMod.setState(sm, 'gameBuild');
    },
    draw: function(sm, ctx, canvas){},
    events: { click: function(e, pos, sm){}}
});
