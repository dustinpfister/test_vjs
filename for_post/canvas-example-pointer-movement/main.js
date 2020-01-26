
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var pm = PM.newPM();
// a point
var pt = {
    x: 0,
    y: 0
};


var loop = function () {
    requestAnimationFrame(loop);
    PM.updatePM(pm);
    PM.stepPointByPM(pm, pt);
    draw.background(pm, ctx, canvas);
    draw.navCircle(pm, ctx, canvas);
    draw.debugInfo(pm, pt, ctx, canvas);
    draw.PTGridlines(pt, ctx, canvas);
};
loop();

// get canvas relative point
var getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    x = e.clientX - bx.left,
    y = e.clientY - bx.top;
    return {
        x: x,
        y: y,
        bx: bx
    };
};

canvas.addEventListener('mousedown', function (e) {
    var pos = getCanvasRelative(e);
    pm.down = true;
    pm.sp = {
        x: pos.x,
        y: pos.y
    };
});
canvas.addEventListener('mousemove', function (e) {
    var pos = getCanvasRelative(e);
    pm.cp = {
        x: pos.x,
        y: pos.y
    };
});
canvas.addEventListener('mouseup', function (e) {
    var pos = getCanvasRelative(e);
    pm.down = false;
    pm.sp = {
        x: -1,
        y: -1
    };
    pm.cp = {
        x: -1,
        y: -1
    };
});
