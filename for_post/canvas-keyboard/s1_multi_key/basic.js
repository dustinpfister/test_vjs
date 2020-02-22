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
    dir: 0
};

var setDir = function () {
    state.dir = 0;
    var ct = 0;
    if (state.keys.d) {
        state.dir += 1
        ct += 1;
    }
    if (state.keys.s) {
        state.dir += 2;
        ct += 1;
    }
    if (state.keys.a) {
        state.dir += 3;
        ct += 1;
    }
    if (state.keys.w) {
        state.dir += 4;
        ct += 1;
    }
    state.dir = ct > 1 ? state.dir / ct : state.dir;
};

var keyHandler = function (e) {
    state.keys[e.key] = e.type === 'keyup' ? false : true;

    setDir();

    draw(ctx, canvas, state);
};

window.addEventListener('keydown', keyHandler);
window.addEventListener('keyup', keyHandler);
