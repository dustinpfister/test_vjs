var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('canvas-app').appendChild(canvas);
canvas.width = 320;
canvas.height = 240;

var state = stateMod.create({canvas: canvas});

var lt = new Date();
var loop = function(){
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    stateMod.updateTurretFacing(state, secs);
    draw.back(ctx, canvas);
    draw.turret(ctx, state);
    lt = now;
};
loop();

var pointerDown = function(e){
    var pos = utils.getCanvasRelative(e);
    stateMod.updateTurretTarget(state, pos.x, pos.y);
    state.down = true;
};
var pointerMove = function(e){
    var pos = utils.getCanvasRelative(e);
    stateMod.updateTurretTarget(state, pos.x, pos.y);
};
var pointerUp = function(e){
    state.down = false;
};

canvas.addEventListener('mousedown', pointerDown);
canvas.addEventListener('mousemove', pointerMove);
canvas.addEventListener('mouseup', pointerUp);
