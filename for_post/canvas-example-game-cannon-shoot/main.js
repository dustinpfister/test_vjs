
// CANVAS
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var createNewState = function () {
    return {
        mode: 'aim', // 'aim', 'fired, and 'over' modes
        shot: {
            x: 0,
            y: 0,
            pps: 64,
            heading: 0
        },
        cannon: {
            heading: 0,
            power: 1
        }
    };
};

var fireShot = function (state) {
    var sh = state.shot,
    ca = state.cannon;
    sh.pps = 32 + Math.floor(64 * ca.power);
    sh.heading = ca.heading;
    state.mode = 'fired';
}

var state = createNewState();

// MAIN APP LOOP
var loop = function () {
    requestAnimationFrame(loop);

    draw.background(ctx, canvas);
};
loop();
