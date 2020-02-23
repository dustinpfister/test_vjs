// Draw
var draw = function (ctx, canvas, state) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillText(state.dir, 20, 20);
};

var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

var state = {
    keys: {},
    dir: 0,
    maxDir: 8
};

var mod = function (a, b) {
    if (a < 0) {
        return b - Math.abs(a) % b;
    }
    return a % b;
};

var setDir = function () {
    if (state.keys.a) {
        state.dir -= 1;
    }
    if (state.keys.d) {
        state.dir += 1;
    }
};

var keyHandler = function (e) {
    state.keys[e.key] = e.type === 'keyup' ? false : true;
    setDir();
    draw(ctx, canvas, state);
};

window.addEventListener('keydown', keyHandler);
window.addEventListener('keyup', keyHandler);
