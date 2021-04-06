var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('canvas-app').appendChild(canvas);
canvas.width = 640;
canvas.height = 480;

var sm = {
    currentState: 'mapMenu',
    game: gameMod.create({
        canvas: canvas
    }),
    map: mapMod.create(),
    states: {}
};


sm.states.mapMenu = {

    update: function(){

    },

    draw: function(ctx, canvas, sm){
        draw.back(ctx, canvas);
        draw.map(ctx, sm.map)
    },

    pointer: {
        start: function(sm, pos, e){

        }
    }

};

sm.states.game = {

    update: function(sm, secs){
        gameMod.updateTurretFacing(sm.game, secs);
        gameMod.updateShots(sm.game, secs);
    },

    draw: function(ctx, canvas, sm){
        draw.back(ctx, canvas);
        draw.turret(ctx, sm.game);
        draw.shots(ctx, sm.game);
    },

    pointer: {
        start: function(sm, pos, e){
            gameMod.updateTurretTarget(sm.game, pos.x, pos.y);
        },
        move: function(s, pos, e){
            gameMod.updateTurretTarget(sm.game, pos.x, pos.y);
        }
    }

};


var lt = new Date();
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);

    sm.states[sm.currentState].update(sm, secs);
    sm.states[sm.currentState].draw(ctx, canvas, sm);

    lt = now;
};
loop();

var createPointerHandler = function(sm, eventType){
    return function (e) {
        var pos = utils.getCanvasRelative(e),
        pointer =     sm.states[sm.currentState].pointer;
        if(eventType === 'start'){
            sm.game.down = true;
        }
        if(eventType === 'end'){
            sm.game.down = false;
        }
        if(pointer){
            if(pointer[eventType]){
                pointer[eventType](sm, pos, e);
            }
        }
    };
};

canvas.addEventListener('mousedown', createPointerHandler(sm, 'start'));
canvas.addEventListener('mousemove', createPointerHandler(sm, 'move'));
canvas.addEventListener('mouseup', createPointerHandler(sm, 'end'));

