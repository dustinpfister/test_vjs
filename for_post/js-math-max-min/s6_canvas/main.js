// get canvas can 2d context
var container = document.getElementById('canvas-min-max'),
canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;

var state = {
    points: points.gen(20, canvas.width, canvas.height),
    lt: new Date(),
    moved: {
        x: 130,
        y: 90,
        w: 128,
        h: 64,
        points: []
    }
};

var update = function (state) {

    var now = new Date(),
    t = now - state.lt,
    secs = t / 1000;

    var i = 0,
    len = state.points.length,
    pt;
    while (i < len) {
        pt = state.points[i];
        pt.x += Math.cos(pt.heading) * pt.pps * secs;
        pt.y += Math.sin(pt.heading) * pt.pps * secs;
        i += 1;
    }

    var m = state.moved;
    m.points = points.move(state.points, m.x, m.y, m.w, m.h);

    state.lt = now;
};

var loop = function () {

    requestAnimationFrame(loop);

    update(state);

    var m = state.moved;
    draw.background(ctx, canvas);
    draw.points(ctx, state.points, ' green ', 6);
    draw.box(ctx, m.x, m.y, m.w, m.h, ' rgba(0, 0, 255, 0.4)')
    draw.points(ctx, m.points, ' blue ', 3);
    draw.lowAndHigh(ctx, m.points);

};

loop();
