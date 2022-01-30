var sm = smMod.create({
    ver: 'r1',
    currentState: 'init'
});

/*
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
*/

smMod.startLoop(sm);


