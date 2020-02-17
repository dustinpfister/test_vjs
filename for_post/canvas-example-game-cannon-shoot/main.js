
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
            angle: 0,
            power: 10
        }
    };
};

var state = createNewState();



// MAIN APP LOOP
var loop = function () {
    requestAnimationFrame(loop);

    draw.background(ctx, canvas);
};
loop();
