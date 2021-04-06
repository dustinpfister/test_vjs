var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('canvas-app').appendChild(canvas);
canvas.width = 640;
canvas.height = 480;

var state = {
    game: gameMod.create({
        canvas: canvas
    }),
    map: mapMod.create()
};

var lt = new Date();
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    gameMod.updateTurretFacing(state.game, secs);
    gameMod.updateShots(state.game, secs);
    draw.back(ctx, canvas);
    draw.turret(ctx, state.game);
    draw.shots(ctx, state.game);
    lt = now;
};
loop();

var pointerDown = function (e) {
    var pos = utils.getCanvasRelative(e);
    gameMod.updateTurretTarget(state.game, pos.x, pos.y);
    state.game.down = true;
};
var pointerMove = function (e) {
    var pos = utils.getCanvasRelative(e);
    gameMod.updateTurretTarget(state.game, pos.x, pos.y);
};
var pointerUp = function (e) {
    state.game.down = false;
};

canvas.addEventListener('mousedown', pointerDown);
canvas.addEventListener('mousemove', pointerMove);
canvas.addEventListener('mouseup', pointerUp);
