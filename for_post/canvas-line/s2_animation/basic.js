
var canvas = document.getElementById('the-canvas'), ctx;
canvas.width = 320;
canvas.height = 240;
ctx = canvas.getContext('2d');

var state = {
    frame: 0,
    maxFrame: 100,
    lastFrame: new Date(),
    FPS: 30,
    points: []
};

var initPoints = function (state, canvas) {
    var i = 0,
    len = state.maxFrame,
    x,
    y,
    points = state.points = [];
    while (i < len) {
        x = canvas.width / (state.maxFrame - 1) * i;
        y = canvas.height / 2 - 50 + 100 * Math.random();
        points.push(x, y);
        i += 1;
    }

};

var update = function (state) {
    var now = new Date(),
    t = now - state.lastFrame,
    frames = Math.floor(t / 1000 * state.FPS);
    if (frames >= 1) {
        state.frame += frames;
        state.frame %= state.maxFrame;
        state.lastFrame = now;
    }
};

initPoints(state, canvas);
var loop = function () {
    requestAnimationFrame(loop);
    update(state);
    draw.back(ctx, canvas);
    ctx.strokeStyle = 'red';
    var i = Math.floor(state.maxFrame * (state.frame / state.maxFrame)) + 1;
    draw.points(ctx, state.points.slice(0, i * 2), false);

};
loop();
