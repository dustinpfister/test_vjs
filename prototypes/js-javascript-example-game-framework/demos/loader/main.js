
utils.http({
    url: './img/0.png',
    responseType: 'blob',
    onDone : function(res, xhr){
        console.log(res);
        var imageURL = window.URL.createObjectURL(res);
        var myImage = new Image();
        myImage.src = imageURL;
        document.body.appendChild(myImage);
    }
});


// create an sm object
var sm = gameFrame.smCreateMain({
    //currentState: 'game', 
    width: 640,
    height: 480,
    game: {},
    loader: {
        images: { // load 0.png, and 1.png at ./img
            baseURL: './img',
            count: 2
        }
    }
});

// a game state
gameFrame.smPushState(sm, {
    name: 'game',
    buttons: {
        //back: { x: 100, y: 100, w: 64, h:64, disp: 'New Game', onClick: function(e, pos, sm, button){      
        //}}
    },
    start: function(sm){
        canvasMod.draw(sm.layers, 'background', 0);
    },
    update: function(sm, secs){

    },
    draw: function(sm, layers){
        canvasMod.draw(layers, 'clear', 1);
        canvasMod.draw(layers, 'print', 1, sm.currentState, 10, 10);
        canvasMod.draw(layers, 'stateButtons', 1, sm);
    },
    events: {
        pointerStart: function(e, pos, sm){},
        pointerMove: function(e, pos, sm){},
        pointerEnd: function(e, pos, sm){}
    }
});
// start the state machine
gameFrame.smSetState(sm, 'game');
sm.loop();
