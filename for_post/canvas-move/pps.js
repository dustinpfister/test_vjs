var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;

var updateState = function (state) {
    var now = new Date(),
    time = now - state.lt;
    state.x += time / 1000 * state.pps;
    state.x %= state.canvas.width;
    state.lt = now;
};

var draw = function (st) {
    var ctx = st.ctx,
    canvas = st.canvas;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(state.x, state.y, 16, 0, Math.PI * 2);
    ctx.fill();
};

var state = {
    canvas: canvas,
    ctx: ctx,
    x: 160,
    y: 120,
    pps: 128,
    lt: new Date()
};

var loop = function () {
    requestAnimationFrame(loop);
    updateState(state);
    draw(state);
};

loop();
