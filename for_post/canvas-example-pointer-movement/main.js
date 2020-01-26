
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
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
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
var drawPTGridlines = function (pt, ctx, canvas) {
    var cellX = -1,
    cellY = -1,
    x,
    y;
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    while (cellX < 11) {
        x = cellX * 32 - pt.x % 32;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
        cellX += 1;
    }
    while (cellY < 8) {
        y = cellY * 32 - pt.y % 32;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
        cellY += 1;
    }
};

// draw a navigation circle when moving the map
var drawNavCircle = function (pm, ctx, canvas) {
    if (pm.down) {
        var cx = pm.sp.x,
        cy = pm.sp.y,
        x,
        y,
        min = 64,
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

var drawDebugInfo = function (pm, pt, ctx, canvas) {
    ctx.fillStyle = 'white';
    ctx.fillText(pt.x + ', ' + pt.y, 10, 10);
}

// Pointer Movement State
var pm = {
    down: false,
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

// a point
var pt = {
    x: 0,
    y: 0
};

// update the pm based on startPoint, and currentPoint
var updatePM = function (pm) {
    pm.dist = 0;
    pm.delta = 0;
    pm.angle = 0;
    if (pm.cp.x >= 0 && pm.cp.y >= 0) {
        pm.dist = distance(pm.sp.x, pm.sp.y, pm.cp.x, pm.cp.y);
    }
    if (pm.down && pm.dist >= 5) {
        var per = pm.dist / 64;
        per = per > 1 ? 1 : per;
        per = per < 0 ? 0 : per;
        pm.delta = per * 3;
        pm.angle = Math.atan2(pm.cp.y - pm.sp.y, pm.cp.x - pm.sp.x);
    }
};

// step a point by the current values of the pm
var stepPointByPM = function (pm, pt) {
    pt.x += Math.cos(pm.angle) * pm.delta;
    pt.y += Math.sin(pm.angle) * pm.delta;
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

var loop = function () {
    requestAnimationFrame(loop);
    updatePM(pm);
    stepPointByPM(pm, pt);
    drawBackground(pm, ctx, canvas);
    drawNavCircle(pm, ctx, canvas);
    drawDebugInfo(pm, pt, ctx, canvas);
    drawPTGridlines(pt, ctx, canvas);
};
loop();
