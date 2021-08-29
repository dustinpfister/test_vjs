// create an sm object
var sm = gameFrame.smCreateMain({
    currentState: 'game',
    game: {
        text: 'Hello World',
        x: 320,
        y: 240
    }
});
// add at least one state object
gameFrame.smPushState(sm, {
    name: 'game',
    draw: function(sm, layers){
        canvasMod.draw(layers, 'background', 0);
    }
});
// start the state machine
sm.loop();
