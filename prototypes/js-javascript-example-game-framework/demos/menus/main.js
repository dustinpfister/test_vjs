// create an sm object
var sm = gameFrame.smCreateMain({
    currentState: 'mainMenu', 
    width: 640,
    height: 480,
    game: {}
});

// a main menu state
gameFrame.smPushState(sm, {
    name: 'mainMenu',
    buttons: {
        newGame: { x: 5, y: 5, w: 128, h:128, disp: 'New Game', onClick: function(e, pos, sm, button){
            gameFrame.smSetState(sm, 'game');
        }}
    },
    start: function(sm){
        canvasMod.draw(sm.layers, 'background', 0);
    },
    draw: function(sm, layers){
        canvasMod.draw(layers, 'clear', 1);
        canvasMod.draw(layers, 'print', 1, sm.currentState, 10, 10);
    }
});
// a game state
gameFrame.smPushState(sm, {
    name: 'game',
    buttons: {
        back: { x: 128, y: 128, w: 128, h:64, disp: 'New Game', onClick: function(e, pos, sm, button){
            gameFrame.smSetState(sm, 'mainMenu');
        }}
    },
    start: function(sm){
        canvasMod.draw(sm.layers, 'background', 0);
    },
    update: function(sm, secs){

    },
    draw: function(sm, layers){
        canvasMod.draw(layers, 'clear', 1);
        canvasMod.draw(layers, 'print', 1, sm.currentState, 10, 10);
    },
    events: {
        pointerStart: function(e, pos, sm){},
        pointerMove: function(e, pos, sm){},
        pointerEnd: function(e, pos, sm){}
    }
});
// start the state machine
gameFrame.smSetState(sm, 'mainMenu');
sm.loop();
