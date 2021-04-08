var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('canvas-app').appendChild(canvas);
canvas.width = 640;
canvas.height = 480;

var sm = {
    currentState: 'game',
    game: {},
    states: {},
    pos: {},
    down: false
};

sm.game = gameMod.create();

sm.states.game = {
    update: function(sm, secs){
        gameMod.update(sm.game, secs);
    },
    draw: function(ctx, canvas, sm){
        draw.back(ctx, canvas);

        draw.turret(ctx, sm.game);
        draw.player_units(ctx, sm.game);
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
    var state = sm.states[sm.currentState];
    state.update.call(state, sm, secs);
    state.draw.call(state, ctx, canvas, sm);
    lt = now;
};
loop();

var createPointerHandler = function(sm, eventType){
    return function (e) {
        var pos = sm.pos = utils.getCanvasRelative(e),
        state = sm.states[sm.currentState],
        pointer = state.pointer;
        if(eventType === 'start'){
            sm.game.down = true;
            sm.down = true;
        }
        if(eventType === 'end'){
            sm.game.down = false;
            sm.down = false;
        }
        if(pointer){
            if(pointer[eventType]){
                pointer[eventType].call(state, sm, pos, e, state);
            }
        }
    };
};

canvas.addEventListener('mousedown', createPointerHandler(sm, 'start'));
canvas.addEventListener('mousemove', createPointerHandler(sm, 'move'));
canvas.addEventListener('mouseup', createPointerHandler(sm, 'end'));

