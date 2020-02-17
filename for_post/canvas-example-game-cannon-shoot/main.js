// UTILS
var utils = {};
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    var x = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
    y = (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top;
    return {
        x: x,
        y: y,
        bx: bx
    };
};

// GAME
var createNewState = function () {
    return {
        mode: 'aim', // 'aim', 'fired, and 'over' modes
        userDown: false,
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
};

// Events
var eventTypeMaps = {
    mousedown: 'start',
    mousemove: 'move',
    mouseup: 'end'
};
var userAction = function (state) {
    return function (e) {
        var pos = utils.getCanvasRelative(e),
        myType = eventTypeMaps[e.type];
        if (myType === 'start') {
            state.userDown = true;
        }
        if (myType === 'end') {
            state.userDown = false;
        }
        userAction[state.mode][myType](pos, state, e)
    };
};

userAction.aim = {

    start: function (pos, state, e) {},
    move: function (pos, state, e) {

        if (state.userDown) {
            console.log(pos);
        }
    },
    end: function (pos, state, e) {}

};

var update = function () {};

update.aim = function () {}

// MAIN
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var state = createNewState();

// MAIN APP LOOP
var loop = function () {
    requestAnimationFrame(loop);
    draw.background(ctx, canvas);
};
loop();

canvas.addEventListener('mousedown', userAction(state));
canvas.addEventListener('mousemove', userAction(state));
canvas.addEventListener('mouseup', userAction(state));
