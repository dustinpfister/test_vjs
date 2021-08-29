// create an sm object
var sm = gameFrame.smCreateMain({
    currentState: 'game',
    game: {
        text: 'Hello World',
        x: 160,
        y: 120
    }
});
// add at least one state object
gameFrame.smPushState(sm, {
    name: 'game',
    draw: function(sm, layers){
        canvasMod.draw(layers, 'background', 0);
        canvasMod.draw(layers, 'clear', 1);
        canvasMod.draw(layers, 'print', 1, sm.game.text, sm.game.x, sm.game.y);
    }
});
// start the state machine
sm.loop();
