var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('canvas-app').appendChild(canvas);
canvas.width = 640;
canvas.height = 480;

var sm = {
    currentState: 'game',
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
    }

};


var lt = new Date();
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);

    sm.states[sm.currentState].update(sm, secs);
    sm.states[sm.currentState].draw(ctx, canvas, sm);

    //gameMod.updateTurretFacing(sm.game, secs);
    //gameMod.updateShots(sm.game, secs);

    //draw.back(ctx, canvas);
    //draw.turret(ctx, sm.game);
    //draw.shots(ctx, sm.game);
    lt = now;
};
loop();

var pointerDown = function (e) {
    var pos = utils.getCanvasRelative(e);
    gameMod.updateTurretTarget(sm.game, pos.x, pos.y);
    sm.game.down = true;
};
var pointerMove = function (e) {
    var pos = utils.getCanvasRelative(e);
    gameMod.updateTurretTarget(sm.game, pos.x, pos.y);
};
var pointerUp = function (e) {
    sm.game.down = false;
};

canvas.addEventListener('mousedown', pointerDown);
canvas.addEventListener('mousemove', pointerMove);
canvas.addEventListener('mouseup', pointerUp);
