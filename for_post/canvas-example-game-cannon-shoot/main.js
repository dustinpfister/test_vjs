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

utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < (y2) ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};

utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

// GAME
var createNewState = function (opt) {
    return {
        canvas: canvas,
        ctx: ctx = canvas.getContext('2d'),
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
        var cannon = state.cannon,
        canvas = state.canvas;
        if (state.userDown) {
            cannon.heading = Math.atan2(canvas.height - pos.y, pos.x) * -1;
            cannon.power = 1;
            console.log(cannon.heading / (Math.PI * 2) * 360);
        }
    },
    end: function (pos, state, e) {

        var overFire = utils.boundingBox(pos.x, pos.y, 1, 1, canvas.width - 64, canvas.height - 64, 64, 64);
        if (overFire) {

            console.log('fire');

        }

    }
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

var state = createNewState({
        canvas: canvas
    });

// MAIN APP LOOP
var loop = function () {
    requestAnimationFrame(loop);
    draw.background(state);
    draw.currentMode(state);
};
loop();

canvas.addEventListener('mousedown', userAction(state));
canvas.addEventListener('mousemove', userAction(state));
canvas.addEventListener('mouseup', userAction(state));
