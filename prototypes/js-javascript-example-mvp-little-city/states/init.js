smMod.load({
    stateKey: 'init',
    update: function(sm, secs){

        // set up the build menu
        sm.buildMenu = smMod.gridMenu.create({
            x: 16,
            y: 96,
            w: 2, h: 3,
            currentIndex: 0,
            cellSize: 45,
            buttons: [
                { desc: 'sel', unitKey: 'sell', action: 'sell'},
                { desc: 'inf', unitKey: 'info', action: 'info'},
                { desc: 'res', unitKey: 'res', action: 'build' },
                { desc: 'com', unitKey: 'com', action: 'build' },
                { desc: 'rod', unitKey: 'road', action: 'build' }
            ]
        });

        // set up game state menu
        sm.gameStateMenu = smMod.gridMenu.create({
            x: 16,
            y: 25,
            w: 3,
            currentIndex: 0,
            cellSize: 50,
            buttons: [
                { desc: 'build', unitKey: 'build', action: 'gameBuild'},
                { desc: 'map', unitKey: 'map', action: 'gameMap'},
                { desc: 'budget', unitKey: 'map', action: 'gameBudget'}
            ]
        });

        // set up the map menu
        sm.mapMenu = smMod.gridMenu.create({
            x: 16,
            y: 96,
            w: 2,
            currentIndex: 0,
            cellSize: 45,
            buttons: [
                { desc: 'val', unitKey: 'val', action: 'value'},
                { desc: 'pop', unitKey: 'pop', action: 'population'},
                { desc: 'road', unitKey: 'road', action: 'roads'}
            ]
        });

        sm.budgetMenu = smMod.gridMenu.create({
            x: 500,
            y: 128,
            w: 2,
            currentIndex: 0,
            cellSize: 32,
            buttons: [
               {desc: 'pt+', action: 'prop_pos'},
               {desc: 'pt-', action: 'prop_neg'}
            ]
        });

        // create game object
        sm.game = gameMod.create({
            cellData: [
                { x: 0, y: 1, unitKey: 'road'},
                { x: 1, y: 1, unitKey: 'road'},
                { x: 2, y: 1, unitKey: 'road'},
                { x: 3, y: 1, unitKey: 'road'},
                { x: 3, y: 2, unitKey: 'road'},
                { x: 3, y: 3, unitKey: 'road'},
                { x: 3, y: 4, unitKey: 'road'},
                { x: 4, y: 4, unitKey: 'road'},
                { x: 5, y: 4, unitKey: 'road'},
                { x: 6, y: 4, unitKey: 'road'},
                { x: 7, y: 4, unitKey: 'road'},
                { x: 7, y: 3, unitKey: 'road'},
                { x: 7, y: 2, unitKey: 'road'},
                { x: 7, y: 1, unitKey: 'road'},
                { x: 7, y: 0, unitKey: 'road'},

                { x: 2, y: 2, unitKey: 'com'},
                { x: 2, y: 3, unitKey: 'com'},
                { x: 2, y: 4, unitKey: 'com'},
                { x: 2, y: 5, unitKey: 'com'},
                { x: 2, y: 6, unitKey: 'com'},

                { x: 4, y: 3, unitKey: 'res'},
                { x: 5, y: 3, unitKey: 'res'},
                { x: 6, y: 3, unitKey: 'res'},
                { x: 6, y: 2, unitKey: 'res'},

                { x: 8, y: 0, unitKey: 'res'},
                { x: 9, y: 0, unitKey: 'res'},
                { x: 8, y: 1, unitKey: 'res'},
                { x: 9, y: 1, unitKey: 'res'}

            ]

        });

        // switch to gameBuild state
        smMod.setState(sm, 'gameBuild');
    },
    draw: function(sm, ctx, canvas){},
    events: { click: function(e, pos, sm){}}
});
