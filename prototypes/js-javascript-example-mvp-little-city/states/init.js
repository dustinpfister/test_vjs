smMod.load({
    stateKey: 'init',
    update: function(sm, secs){


        // select game difficulty createNew state
        sm.selectDiffMenu = smMod.gridMenu.create({
            x: 320 - 128,
            y: 200,
            w: 1, h: 3,
            currentIndex: 0,
            cellWidth: 256,
            cellHeight: 40,
            buttons: [
                {desc: 'Easy   $10,000', money: 10000, action: 'easy'},
                {desc: 'Normal $3,000', money: 3000, action: 'normal'},
                {desc: 'Hard   $1,000', money: 1000, action: 'hard'}
            ]
        });

        // Text In Menu used for inputing city name in createNew state
        sm.textInMenu = smMod.gridMenu.create({
            x: 320 - 255,
            y: 200,
            w: 10, h: 4,
            currentIndex: 0,
            cellWidth: 50,
            cellHeight: 40,
            buttons: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 <#'.split('').map(function(key){
                var button = {
                    desc: key, key: key
                };
                if(key === ' '){
                   button.desc = 'SPACE';
                }
                if(key === '<'){
                   button.desc = 'DEL';
                }
                if(key === '#'){
                   button.desc = 'END';
                }
                return button;
            })
        });

        // set up the build menu
        sm.titleMenu = smMod.gridMenu.create({
            x: 320 - 128,
            y: 200,
            w: 1, h: 1,
            currentIndex: 0,
            cellWidth: 256,
            cellHeight: 64,
            buttons: [
                { desc: 'Start New City', action: 'createNew'}
            ]
        });


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
            w: 5,
            currentIndex: 0,
            cellSize: 50,
            buttons: [
                { desc: 'build',  action: 'gameBuild'},
                { desc: 'map',  action: 'gameMap'},
                { desc: 'budget',  action: 'gameBudget'},
                { desc: 'totals', action: 'gameTotals'},
                { desc: 'voice', action: 'gameVoice'}
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
            x: 420,
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
            cellData: []
        });

        // switch to gameBuild state
        smMod.setState(sm, 'title');
    },
    draw: function(sm, ctx, canvas){},
    events: { click: function(e, pos, sm){}}
});
