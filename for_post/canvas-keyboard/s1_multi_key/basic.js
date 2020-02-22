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

var setDir = function () {
    if (state.keys.a) {
        state.dir -= 1;
    }
    if (state.keys.d) {
        state.dir += 1;
    }

    if (state.dir >= state.maxDir) {
        state.dir = state.dir % state.maxDir;
    }
    if (state.dir < 0) {
        state.dir = state.maxDir - Math.abs(state.dir) % state.maxDir;
    }

};

var keyHandler = function (e) {
    state.keys[e.key] = e.type === 'keyup' ? false : true;
    setDir();
    draw(ctx, canvas, state);
};

window.addEventListener('keydown', keyHandler);
window.addEventListener('keyup', keyHandler);
