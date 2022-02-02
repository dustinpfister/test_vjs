smMod.load({
    stateKey: 'init',
    update: function(sm, secs){

        // set up the build menu
        sm.buildMenu = smMod.gridMenu.create({
            x: 32,
            y: 96,
            w: 2, h: 3,
            currentIndex: 0,
            cellSize: 32,
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
            x: 32,
            y: 25,
            w: 2,
            currentIndex: 0,
            cellSize: 50,
            buttons: [
                { desc: 'b', unitKey: 'build', action: 'gameBuild'},
                { desc: 'm', unitKey: 'map', action: 'gameMap'}
            ]
        });

        // set up the map menu
        sm.mapMenu = smMod.gridMenu.create({
            x: 32,
            y: 96,
            w: 2,
            currentIndex: 0,
            cellSize: 32,
            buttons: [
                { desc: 'v', unitKey: 'val', action: 'value'},
                { desc: 'p', unitKey: 'pop', action: 'population'},
                { desc: 'r', unitKey: 'road', action: 'roads'}
            ]
        });


        // create game object
        sm.game = gameMod.create({
            /*
            cellData: [
                { x: 3, y: 2, unitKey: 'road'},
                { x: 3, y: 3, unitKey: 'road'},
                { x: 3, y: 4, unitKey: 'road'},
                { x: 3, y: 5, unitKey: 'road'},
                { x: 4, y: 1, unitKey: 'road'},
                { x: 5, y: 1, unitKey: 'road'},
                { x: 6, y: 1, unitKey: 'road'},
                { x: 3, y: 1, unitKey: 'road'},
                { x: 2, y: 1, unitKey: 'road'},
                { x: 1, y: 1, unitKey: 'road'},
                { x: 0, y: 1, unitKey: 'road'},
                { x: 2, y: 3, unitKey: 'res'},
                { x: 2, y: 5, unitKey: 'res'},
                { x: 0, y: 3, unitKey: 'res'},
                { x: 6, y: 3, unitKey: 'res'},
                { x: 7, y: 3, unitKey: 'res'},
                { x: 4, y: 3, unitKey: 'com'},
                { x: 1, y: 0, unitKey: 'com'},
                { x: 0, y: 0, unitKey: 'com'}
            ]*/
            cellData: [

                { x: 0, y: 1, unitKey: 'road'},
                { x: 1, y: 1, unitKey: 'road'},
                { x: 2, y: 1, unitKey: 'road'},
                { x: 3, y: 1, unitKey: 'road'},
                { x: 3, y: 2, unitKey: 'road'},
                { x: 3, y: 3, unitKey: 'road'},
                { x: 3, y: 4, unitKey: 'road'},
                { x: 4, y: 4, unitKey: 'road'},
                //{ x: 5, y: 4, unitKey: 'road'},
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

                //{ x: 6, y: 0, unitKey: 'com'},

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
