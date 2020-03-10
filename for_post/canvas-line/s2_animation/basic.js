
var canvas = document.getElementById('the-canvas'), ctx;
canvas.width = 320;
canvas.height = 240;
ctx = canvas.getContext('2d');

var state = {
    frame: 0,
    maxFrame: 50,
    lastFrame: new Date(),
    FPS: 1,
    points: []
};

var initPoints = function (state, canvas) {
    var i = 0,
    len = state.maxFrame,
    x,
    y,
    points = state.points = [];
    while (i < len) {
        x = canvas.width / (state.maxFrame-1) * i;
        y = canvas.height / 2 - 50 + 100 * Math.random();
        points.push(x, y);
        i += 1;
    }

};

initPoints(state, canvas);

draw.back(ctx, canvas);
ctx.strokeStyle = 'red';
draw.points(ctx, state.points, false);
