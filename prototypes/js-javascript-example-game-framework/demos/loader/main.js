
/*
utils.httpPNG({
    url: './img/0.png',
    onDone : function(image, xhr){
        document.body.appendChild(image);
    }
});
*/


// create an sm object
var sm = gameFrame.smCreateMain({
    currentState: 'loader', 
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

gameFrame.smPushState(sm, {
    name: 'loader',
    start: function(sm){
        canvasMod.draw(sm.layers, 'background', 0);
        // set up images array
        sm.images = [];
        var loaderObj = sm.loader;
        if(sm.loader.images){
            var i = 0;
            while(i < 2){
                (function(imageIndex){
                   utils.httpPNG({
                       url: './img/' + imageIndex + '.png',
                        onDone : function(image, xhr){
                            sm.images[imageIndex] = image;
                            document.body.appendChild(image);
                        }
                    });
                }(i));
                i += 1;
            }
        }
    },
    update: function(sm, secs){

    },
    draw: function(sm, layers){
        canvasMod.draw(layers, 'clear', 1);
        canvasMod.draw(layers, 'print', 1, sm.currentState, 10, 10);
        canvasMod.draw(layers, 'print', 1, sm.images.length, 10, 30);
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
gameFrame.smSetState(sm, 'loader');
sm.loop();
