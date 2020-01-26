
// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
// set width and height
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

// fill black
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

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

// Pointer Movement State
var pm = {
    move: true,
    angle: 0,
    dist: 0,
    delta: 0,
    startPoint: {
        x: -1,
        y: -1
    },
    currentPoint: {
        x: -1,
        y: -1
    }
};

// draw a navigation circle when moving the map
var drawNavCircle = function (pm, ctx, canvas) {
    if (pm.move) {
        var cx = canvas.width / 2,
        cy = canvas.height / 2,
        x,
        y,
        min = Math.min(cx, cy),
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

canvas.addEventListener('mousedown', function (e) {
    var pos = getCanvasRelative(e);
});

drawNavCircle(pm, ctx, canvas);
