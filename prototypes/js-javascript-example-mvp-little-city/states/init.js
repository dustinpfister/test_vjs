smMod.load({
    stateKey: 'init',
    update: function(sm, secs){
console.log('init state');
        sm.buildMenu = {
            x: 32,
            y: 32,
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
        };
        sm.game = gameMod.create();
        smMod.setState(sm, 'gameBuild');
    },
    draw: function(sm, ctx, canvas){},
    events: { click: function(e, pos, sm){}}
});
