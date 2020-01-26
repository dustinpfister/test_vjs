
// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
// set width and height
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

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

var distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

var drawBackground = function (pm, ctx, canvas) {

    // fill black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

}

// draw a navigation circle when moving the map
var drawNavCircle = function (pm, ctx, canvas) {
    //var cx = canvas.width / 2,
    //cy = canvas.height / 2,
    if (pm.move) {
        var cx = pm.sp.x,
        cy = pm.sp.y,
        x,
        y,
        min = 64, //Math.min(cx, cy),
        per = 0,
        a = pm.angle;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        // draw circle
        ctx.beginPath();
        ctx.arc(cx, cy, min / 2, 0, Math.PI * 2);
        ctx.stroke();
        // draw direction line
        x = Math.cos(a) * min + cx;
        y = Math.sin(a) * min + cy;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();
        // draw delta circle
        per = pm.delta / 3;
        x = Math.cos(a) * min * per + cx;
        y = Math.sin(a) * min * per + cy;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.stroke();
    }
};

// Pointer Movement State
var pm = {
    move: false,
    angle: 0,
    dist: 0,
    delta: 0,
    sp: { // start point
        x: -1,
        y: -1
    },
    cp: { // current point
        x: -1,
        y: -1
    }
};

// update the pm based on startPoint, and currentPoint
var updatePM = function (pm) {
    if (pm.move) {
        pm.dist = distance(pm.sp.x, pm.sp.y, pm.cp.x, pm.cp.y);
        var per = pm.dist / 64;
        per = per > 1 ? 1 : per;
        per = per < 0 ? 0 : per;
        pm.delta = per * 3;

        pm.angle = Math.atan2(pm.cp.y - pm.sp.y, pm.cp.x - pm.sp.x);

    }
};

canvas.addEventListener('mousedown', function (e) {
    var pos = getCanvasRelative(e);
    pm.move = true;
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
    pm.move = false;
    pm.sp = {
        x: -1,
        y: -1
    };
    pm.cp = {
        x: -1,
        y: -1
    };
});

var loop = function () {
    requestAnimationFrame(loop);
    updatePM(pm);
    drawBackground(pm, ctx, canvas);
    drawNavCircle(pm, ctx, canvas);
};
loop();
