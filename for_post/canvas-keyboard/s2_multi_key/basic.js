var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

// Draw
var draw = function (ctx, canvas, state) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillText('dir: ' + state.dir, 20, 20);
    ctx.fillText('dir: ' + state.dir, 20, 20);
};

var state = {
    keys: {},
    dir: 0,
    maxDir: 8
};
// modulo that works okay with negative numbers
var mod = function (a, b) {
    if (a < 0) {
        return b - Math.abs(a) % b;
    }
    return a % b;
};
// set direction
var setDir = function () {
    if (state.keys.a) {
        state.dir -= 1;
    }
    if (state.keys.d) {
        state.dir += 1;
    }
};
// key handler
var keyHandler = function (e) {
    // toggle a boolean for the key
    state.keys[e.key] = e.type === 'keyup' ? false : true;
    setDir();
    draw(ctx, canvas, state);
};
// attach event handler
window.addEventListener('keydown', keyHandler);
window.addEventListener('keyup', keyHandler);
draw(ctx, canvas, state);
