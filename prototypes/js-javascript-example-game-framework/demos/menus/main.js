// create an sm object
var sm = gameFrame.smCreateMain({
    currentState: 'mainMenu', 
    width: 640,
    height: 480,
    game: {}
});

// add at least one state object
gameFrame.smPushState(sm, {
    name: 'mainMenu',
    // start hook will just fire once when the state object starts
    start: function(sm){
        // draw background once
        canvasMod.draw(sm.layers, 'background', 0);
    },
    // what to do on each update
    update: function(sm, secs){

    },
    // draw will be called after each update
    draw: function(sm, layers){
        canvasMod.draw(layers, 'clear', 1);
        canvasMod.draw(layers, 'print', 1, sm.currentState, 10, 10);
    },
    // events for this state
    events: {
        pointerStart: function(e, pos, sm){
        },
        pointerMove: function(e, pos, sm){
        },
        pointerEnd: function(e, pos, sm){
        }
    }
});
// start the state machine
gameFrame.smSetState(sm, 'mainMenu');
sm.loop();
