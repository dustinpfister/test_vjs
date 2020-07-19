// get canvas can 2d context
var container = document.getElementById('canvas-min-max'),
canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;

var state = {
    points: points.gen(20, canvas.width, canvas.height),
    moved: {
        x: 130,
        y: 90,
        w: 128,
        h: 64,
        points: []
    }
};

var m = state.moved;
m.points = points.move(state.points, m.x, m.y, m.w, m.h);

draw.background(ctx, canvas);
draw.points(ctx, state.points, 'green', 6);
draw.box(ctx, m.x, m.y, m.w, m.h, 'rgba(0,0,255,0.4)')
draw.points(ctx, m.points, 'blue', 3);
draw.lowAndHigh(ctx, m.points);
