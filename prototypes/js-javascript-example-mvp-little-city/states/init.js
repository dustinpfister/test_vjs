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
                { unitKey: 'build', action: 'build'},
                { unitKey: 'map', action: 'map'}
            ]
        });


        // create game object
        sm.game = gameMod.create();

        // switch to gameBuild state
        smMod.setState(sm, 'gameBuild');
    },
    draw: function(sm, ctx, canvas){},
    events: { click: function(e, pos, sm){}}
});
