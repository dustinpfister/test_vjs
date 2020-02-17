

// MAIN
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var state = createNewState({
        canvas: canvas
    });
setCannon(state, -1, 1);

// MAIN APP LOOP
var loop = function () {
    requestAnimationFrame(loop);
    update(state);
    draw.background(state);
    draw.gridLines(state);
    draw.currentMode(state);
};
loop();

canvas.addEventListener('mousedown', userAction(state));
canvas.addEventListener('mousemove', userAction(state));
canvas.addEventListener('mouseup', userAction(state));
