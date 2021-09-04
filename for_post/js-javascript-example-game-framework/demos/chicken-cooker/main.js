// create an sm object
var sm = gameFrame.smCreateMain({
    currentState: 'loader', 
    width: 640,
    height: 480,
    game:{},
    loader: {
        images: { // load 0.png, and 1.png at ./img
            baseURL: './img',
            count: 2
        }
    }
});

// create game object
var getPosFromCenter = function(canvas, radius, a){
    return {
        x: canvas.width / 2 + Math.cos(a) * radius,
        y: canvas.height / 2 + Math.sin(a) * radius
    };
};

sm.game = {
   chickens: poolMod.create({
        count: 5,
        secsCap: 0.25,
        disableLifespan: true,
        spawn: function(obj, pool){
            obj.data.state = 'live'; // 'live' or 'cooked' state
            //var radius = 100,
            //a = Math.PI * 2 * Math.random();
           // obj.x = 320 + Math.cos(a) * radius;
           // obj.y = 240 + Math.sin(a) * radius;
           var startPos = getPosFromCenter(sm.layers[0].canvas, 300, Math.PI * 2 * Math.random());
           obj.x = startPos.x;
           obj.y = startPos.y;
        },
        update: function (obj, pool, sm, secs){  
           obj.lifespan = 1;
        }
    })
};

// a game state
gameFrame.smPushState(sm, {
    name: 'game',
    buttons: {},
    start: function(sm){
        canvasMod.draw(sm.layers, 'background', 0);
        // spawn
        poolMod.spawnAll(sm.game.chickens, sm, {});
    },
    update: function(sm, secs){

    },
    draw: function(sm, layers){
        var canvas = layers[1].canvas,
        ctx = layers[1].ctx;
        canvasMod.draw(layers, 'clear', 1);
        canvasMod.draw(layers, 'print', 1, sm.currentState, 10, 10);
        canvasMod.draw(layers, 'stateButtons', 1, sm);

        canvasMod.draw(layers, 'pool', 1, sm.game.chickens);


        // drawing images to the canvas
        ctx.drawImage(sm.images[0], 29.5, 29.5);
        ctx.drawImage(sm.images[1], 100.5, 29.5);
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
