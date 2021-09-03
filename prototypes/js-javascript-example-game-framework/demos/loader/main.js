
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
            count: 3
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
        // if we have images to load start the requests for them
        if(sm.loader.images){
            var i = 0;
            while(i < sm.loader.images.count){
                (function(imageIndex){
                   utils.httpPNG({
                        url: sm.loader.images.baseURL + '/' + imageIndex + '.png',
                        onDone : function(image, xhr){
                            sm.images[imageIndex] = image;
                        },
                        onError: function(){
                            // just a blank image for now if there is an error
                            sm.images[imageIndex] = new Image();
                        }
                    });
                }(i));
                i += 1;
            }
        }
    },
    update: function(sm, secs){ 
        if(sm.loader.images){
            // start game state when all images are loaded
            if(sm.images.length === sm.loader.images.count){
                gameFrame.smSetState(sm, 'game');
            }
        }else{
            // no images just progress to game state
            gameFrame.smSetState(sm, 'game');
        }
    },
    draw: function(sm, layers){
        canvasMod.draw(layers, 'clear', 1);
        canvasMod.draw(layers, 'print', 1, sm.currentState, 10, 10);
        if(sm.loader.images){
            canvasMod.draw(layers, 'print', 1, sm.images.length + ' / ' + sm.loader.images.count, 10, 30);
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
gameFrame.smSetState(sm, 'loader');
sm.loop();
