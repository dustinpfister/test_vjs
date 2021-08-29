// create an sm object
var sm = gameFrame.smCreateMain({
    currentState: 'game',
    game: {
        text: 'Hello World',
        cx: 160,
        cy: 120,
        x: 0,
        y: 0,
        dir: 1,
        dx: 0,
        printOptions: {
            align: 'center',
            baseLine: 'middle',
            fontSize: 30
        }
    }
});
// add at least one state object
gameFrame.smPushState(sm, {
    name: 'game',
    update: function(sm, secs){
        sm.game.dx += 64 * secs * sm.game.dir;
        if(sm.game.dx >= 32){
            sm.game.dx = 32;
            sm.game.dir = -1;
        }
        if(sm.game.dx <= -32){
            sm.game.dx = -32;
            sm.game.dir = 1;
        }
        sm.game.x = sm.game.cx + sm.game.dx;
        sm.game.y = sm.game.cy;;
    },
    draw: function(sm, layers){
        canvasMod.draw(layers, 'background', 0);
        canvasMod.draw(layers, 'clear', 1);
        canvasMod.draw(layers, 'print', 1, sm.game.text, sm.game.x, sm.game.y, sm.game.printOptions);
    }
});
// start the state machine
sm.loop();
