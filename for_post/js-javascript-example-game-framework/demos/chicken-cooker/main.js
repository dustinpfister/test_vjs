
var CHICKENS_COUNT = 10,
CHICKENS_RADIUS_START = 400,
CHICKENS_RADIUS = 180,
CHICKENS_PPS_MIN = 64,
CHICKENS_PPS_MAX = 256;

// create an sm object
var sm = gameFrame.smCreateMain({
    currentState: 'loader', 
    width: 640,
    height: 480,
    game:{},
    loader: {
        startState: 'gameTime',
        images: { // load 0.png - 2.png at ./img
            baseURL: '/demos/chicken-cooker/img',
            count: 3
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

// chickens object pool
sm.game.chickens = poolMod.create({
    count: CHICKENS_COUNT,
    secsCap: 0.25,
    disableLifespan: true,
    spawn: function(obj, pool, sm, opt){
        obj.data.state = 'live'; // 'live' or 'cooked' state
        obj.data.fillStyle = 'gray';
        // set start position
        var startPos = getPosFromCenter(sm.layers[0].canvas, CHICKENS_RADIUS_START, rndRadian());
        obj.x = startPos.x;
        obj.y = startPos.y;
        obj.w = 64;
        obj.h = 64;
        // set speed
        obj.pps = CHICKENS_PPS_MIN + Math.round(( CHICKENS_PPS_MAX - CHICKENS_PPS_MIN) * Math.random());
        // set first target
        obj.data.targetPos = getPosFromCenter(sm.layers[0].canvas, CHICKENS_RADIUS, rndRadian());
        // set delay
        obj.data.delay = 3;
        // image data
        obj.data.cellDir = 1; // 0 for facting left and 1 for facing right
        obj.data.cellIndex = 0;
        obj.data.imgSecs = 0;
        obj.data.image = sm.images[0];
        obj.data.imgD = {sx: 0, sy: 0, sw: 32, sh: 32};
    },
    update: function (obj, pool, sm, secs){  
        obj.lifespan = 1;
        // if we have a 'live' state chicken
        if(obj.data.state === 'live'){
            obj.data.fillStyle = 'gray';
            obj.data.image = sm.images[0];
            // get distance and angle to target position
            var d = utils.distance(obj.x, obj.y, obj.data.targetPos.x, obj.data.targetPos.y),
            a = Math.atan2(obj.data.targetPos.y - obj.y, obj.data.targetPos.x - obj.x);
            // set obj.data.cellDir based on var 'a'
            obj.data.cellDir = Math.abs(a) > Math.PI * 0.5 ? 1 : 0;
            // if distance > min stop distance move to target positon
            if(d > 10){
                // move
                obj.x += Math.cos(a) * obj.pps * secs;
                obj.y += Math.sin(a) * obj.pps * secs;

                // cell index
                obj.data.imgSecs += secs;
                if(obj.data.imgSecs >= 1 / 12){
                    obj.data.imgSecs = 0;
                    if(obj.data.cellDir === 0){
                        obj.data.cellIndex = obj.data.cellIndex === 0 ? 1 : 0;
                    }else{
                        obj.data.cellIndex = obj.data.cellIndex === 4 ? 5 : 4;
                    }
                    obj.data.imgD.sx = 32 * obj.data.cellIndex;
                }

            }else{
                // set delay and switch to rest state
                obj.data.delay = 3;
                obj.data.state = 'rest';
            }
        }
        // rest state
        if(obj.data.state === 'rest'){
            // else subtract from delay, and get a new target pos of delay <= 0
            obj.data.delay -= secs;
            // cell 3
            obj.data.imgD.sx = 64;
            if(obj.data.cellDir === 1){
                obj.data.imgD.sx = 96;
            }
            if(obj.data.delay <= 0){
                obj.data.targetPos = getPosFromCenter(sm.layers[0].canvas, CHICKENS_RADIUS, rndRadian());
                obj.data.state = 'live';
            }
            var over = poolMod.getOverlaping(obj, sm.game.chickens);
            if(over.length > 0){
                obj.data.targetPos = getPosFromCenter(sm.layers[0].canvas, CHICKENS_RADIUS, rndRadian());
                obj.data.state = 'live';
            }
        }
        // cooked chicken state
        if(obj.data.state === 'cooked'){
            obj.data.fillStyle = 'red';
            obj.data.image = sm.images[1];
            obj.data.imgD.sx = 0;
            obj.data.delay -= secs;
            if(obj.data.delay <= 0){
                obj.active = false;
            }
        }
    }
});

// blasts object pool
sm.game.blasts = poolMod.create({
    count: 3,
    secsCap: 0.25,
    //disableLifespan: true,
    spawn: function(obj, pool, sm, opt){
        obj.data.cx = opt.pos.x;
        obj.data.cy = opt.pos.y;
        obj.w = 0;
        obj.h = 0;
        obj.data.maxLife = 0.5;
        obj.lifespan = obj.data.maxLife;
    },
    update: function (obj, pool, sm, secs){  
        var per = 1 - obj.lifespan / obj.data.maxLife;
        var size = Math.round(100 * per);
        obj.w = size;
        obj.h = size;
        obj.x = obj.data.cx - obj.w / 2;
        obj.y = obj.data.cy - obj.h / 2;
        sm.game.chickens.objects.forEach(function(chk){
            if(chk.active){
                if(chk.data.state === 'live' || chk.data.state === 'rest'){
                    if(utils.boundingBox(chk.x, chk.y, chk.w, chk.h, obj.x, obj.y, obj.w, obj.h)){
                        obj.data.delay = 3;
                        chk.data.state = 'cooked';
                    }
                }
            }
        });
    }
});


// a game state
gameFrame.smPushState(sm, {
    name: 'gameTime',
    buttons: {},
    start: function(sm){
        sm.layers.background = sm.images[2];

        canvasMod.draw(sm.layers, 'background', 0);
        // spawn
        poolMod.spawnAll(sm.game.chickens, sm, {});
        //poolMod.spawnAll(sm.game.blasts, sm, {});
    },
    update: function(sm, secs){
        poolMod.spawn(sm.game.chickens, sm, {});
        poolMod.update(sm.game.chickens, secs, sm);
        poolMod.update(sm.game.blasts, secs, sm);

    },
    draw: function(sm, layers){
        var canvas = layers[1].canvas,
        ctx = layers[1].ctx;
        canvasMod.draw(layers, 'clear', 1);
        //canvasMod.draw(layers, 'print', 1, sm.currentState, 10, 10);
        canvasMod.draw(layers, 'stateButtons', 1, sm);
        canvasMod.draw(layers, 'pool', 1, sm.game.chickens);
        canvasMod.draw(layers, 'pool', 1, sm.game.blasts, {fillStyle: 'rgba(255, 255, 0, 0.5)' });
    },
    events: {
        pointerStart: function(e, pos, sm){
            // spawn a blast
            poolMod.spawn(sm.game.blasts, sm, { pos: pos });
        },
        pointerMove: function(e, pos, sm){},
        pointerEnd: function(e, pos, sm){}
    }
});
// start the state machine
gameFrame.smSetState(sm, 'loader');
sm.loop();
