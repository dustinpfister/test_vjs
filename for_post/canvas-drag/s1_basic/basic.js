// get canvas relative and distance methods
var getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
};
var distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

// draw
var draw = function (ctx, canvas, state) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(state.x, state.y, state.r, 0, Math.PI * 2);
    ctx.fill();
};

// Event handlers
var pointerDown = function (state) {
    return function (e) {
        var pos = getCanvasRelative(e);
        if (distance(pos.x, pos.y, state.x, state.y) <= state.r) {
            state.down = true;
        }
    };
};
var pointerMove = function (state) {
    return function (e) {
        var pos = getCanvasRelative(e);
        if (state.down) {
            state.x = pos.x;
            state.y = pos.y;
            draw(ctx, canvas, state);
        }
    };
};
var pointerUp = function (state) {
    return function (e) {
        state.down = false;
    };
};

// set up canvas
var canvas = document.getElementById('mycanvas'),
ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

// the state object
var state = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: 10,
    down: false
};

// attach for mouse and touch
canvas.addEventListener('mousedown', pointerDown(state));
canvas.addEventListener('mousemove', pointerMove(state));
canvas.addEventListener('mouseup', pointerUp(state));
canvas.addEventListener('touchstart', pointerDown(state));
canvas.addEventListener('touchmove', pointerMove(state));
canvas.addEventListener('touchend', pointerUp(state));

// starting draw
draw(ctx, canvas, state);
