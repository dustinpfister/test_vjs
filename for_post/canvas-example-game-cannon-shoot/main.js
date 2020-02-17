// UTILS
var utils = {};

// create an return a new once method
utils.once = (function () {
    var fired = false;
    return function (mess) {
        if (!fired) {
            console.log(mess);
        }
        fired = true;
    };
}
    ());

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

// Math mod and angle methods from
// https://github.com/infusion/Angles.js/blob/master/angles.js
utils.mod = function mod(x, m) {
    return (x % m + m) % m;
};

utils.angleNormalizeHalf = function (n) {
    var c = Math.PI * 2;
    var h = c / 2;
    return utils.mod(n + h, c) - h;
};

utils.angleMinDistance = function (a, b) {
    var m = Math.PI * 2;
    var h = m / 2;
    var diff = utils.angleNormalizeHalf(a - b);
    if (diff > h) {
        diff = diff - m;
    }
    return Math.abs(diff);
};

// GAME
var createNewState = function (opt) {
    return {
        canvas: canvas,
        ctx: ctx = canvas.getContext('2d'),
        mode: 'aim', // 'aim', 'fired, and 'over' modes
        userDown: false,
        offset: {
            x: 0,
            y: 0
        },
        shot: {
            x: 0,
            y: 0,
            pps: 64,
            power: 1,
            startHeading: 0,
            heading: 0
        },
        cannon: {
            heading: 0,
            power: 1,
            sx: 0,
            sy: 0
        }
    };
};

var setCannon = function (state, heading, power) {
    var cannon = state.cannon;
    cannon.heading = heading;
    cannon.power = power;
    cannon.sx = Math.cos(cannon.heading) * 100,
    cannon.sy = Math.sin(cannon.heading) * 100 + state.canvas.height;

};

// set the shot heading and pps based on power and startHeading
var setShot = function (shot) {

    shot.heading = shot.startHeading;

};

var fireShot = function (state) {
    var sh = state.shot,
    canvas = state.canvas,
    canvas,
    ca = state.cannon;
    sh.pps = 32 + Math.floor(64 * ca.power);
    sh.startHeading = ca.heading;
    sh.angleDistanceToGround = utils.angleMinDistance(sh.startHeading, Math.PI / 2);
    sh.heading = sh.startHeading;
    sh.x = canvas.width / 2,
    sh.y = canvas.height / 2,
    state.offset.x = ca.sx;
    state.offset.y = ca.sy;
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
        var userActionMode = userAction[state.mode] || {},
        modeAction = userActionMode[myType];
        if (modeAction) {
            modeAction(pos, state, e);
        }
    };
};

userAction.aim = {
    start: function (pos, state, e) {},
    move: function (pos, state, e) {
        var cannon = state.cannon,
        canvas = state.canvas;
        if (state.userDown) {
            setCannon(state,
                Math.atan2(canvas.height - pos.y, pos.x) * -1,
                1)
        }
    },
    end: function (pos, state, e) {
        var cannon = state.cannon;
        var overFire = utils.boundingBox(pos.x, pos.y, 1, 1, canvas.width - 64, canvas.height - 64, 64, 64);
        if (overFire) {
            fireShot(state);
        }
    }
};

var update = function (state) {

    var modeUpdate = update[state.mode] || false;
    if (modeUpdate) {
        modeUpdate(state);
    }

};

update.fired = function (state) {
    state.offset.x += Math.cos(state.shot.heading) * 5;
    state.offset.y += Math.sin(state.shot.heading) * 5;
};

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
