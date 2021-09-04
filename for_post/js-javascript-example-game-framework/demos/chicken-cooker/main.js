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


var rndRadian = function(){
    return Math.PI * 2 * Math.random();
};
var getPosFromCenter = function(canvas, radius, a){
    return {
        x: canvas.width / 2 + Math.cos(a) * radius,
        y: canvas.height / 2 + Math.sin(a) * radius
    };
};

sm.game = {};

sm.game.chickens = poolMod.create({
    count: 5,
    secsCap: 0.25,
    disableLifespan: true,
    spawn: function(obj, pool, sm, opt){
        obj.data.state = 'live'; // 'live' or 'cooked' state
        // set start position
        var startPos = getPosFromCenter(sm.layers[0].canvas, 300, rndRadian());
        obj.x = startPos.x;
        obj.y = startPos.y;
        // set first target
        obj.data.targetPos = getPosFromCenter(sm.layers[0].canvas, 100, rndRadian());
        // set delay
        obj.data.delay = 3;
    },
    update: function (obj, pool, sm, secs){  
        obj.lifespan = 1;
        // if we have a 'live' chicken
        if(obj.data.state === 'live'){
            // get distance and angle to target position
            var d = utils.distance(obj.x, obj.y, obj.data.targetPos.x, obj.data.targetPos.y),
            a = Math.atan2(obj.data.targetPos.y - obj.y, obj.data.targetPos.x - obj.x);
            // if distance > min stop distance move to target positon
            if(d > 10){
                obj.x += Math.cos(a) * 256 * secs;
                obj.y += Math.sin(a) * 256 * secs;
                obj.data.delay = 3;
            }else{
                // else subtract from delay, and get a new target pos of delay <= 0
                obj.data.delay -= secs;
                if(obj.data.delay <= 0){
                    obj.data.targetPos = getPosFromCenter(sm.layers[0].canvas, 100, rndRadian());
                }
            }
        }
    }
});

sm.game.blasts = poolMod.create({
    count: 1,
    secsCap: 0.25,
    //disableLifespan: true,
    spawn: function(obj, pool, sm, opt){
        obj.x = opt.pos.x - 5;
        obj.y = opt.pos.y - 5;
        obj.w = 10;
        obj.h = 10;
        obj.lifespan = 1;
    },
    update: function (obj, pool, sm, secs){  
       
    }
});


// a game state
gameFrame.smPushState(sm, {
    name: 'game',
    buttons: {},
    start: function(sm){
        canvasMod.draw(sm.layers, 'background', 0);
        // spawn
        poolMod.spawnAll(sm.game.chickens, sm, {});
        //poolMod.spawnAll(sm.game.blasts, sm, {});
    },
    update: function(sm, secs){

        poolMod.update(sm.game.chickens, secs, sm);
        poolMod.update(sm.game.blasts, secs, sm);

    },
    draw: function(sm, layers){
        var canvas = layers[1].canvas,
        ctx = layers[1].ctx;
        canvasMod.draw(layers, 'clear', 1);
        canvasMod.draw(layers, 'print', 1, sm.currentState, 10, 10);
        canvasMod.draw(layers, 'stateButtons', 1, sm);

        canvasMod.draw(layers, 'pool', 1, sm.game.chickens, {fillStyle: 'gray' });
        canvasMod.draw(layers, 'pool', 1, sm.game.blasts, {fillStyle: 'yellow' });


        // drawing images to the canvas
        //ctx.drawImage(sm.images[0], 29.5, 29.5);
        //ctx.drawImage(sm.images[1], 100.5, 29.5);
    },
    events: {
        pointerStart: function(e, pos, sm){
            poolMod.spawn(sm.game.blasts, sm, { pos: pos });
        },
        pointerMove: function(e, pos, sm){},
        pointerEnd: function(e, pos, sm){}
    }
});
// start the state machine
gameFrame.smSetState(sm, 'loader');
sm.loop();
