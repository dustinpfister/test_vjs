var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

var mod = function mod(x, m) {
    return (x % m + m) % m;
};
var distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

var state = {
    canvas: canvas,
    ctx: ctx,
    lastTime: new Date(),
    circles: []
};

var genCircles = function (state) {
    state.circles = [];
    var i = 10;
    while (i--) {
        state.circles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: 32,
            color: 'red',
            alpha: 0.5,
            pps: 128,
            heading: Math.PI * 2 * Math.random()
        });
    }
};

var wrapCircle = function (state, circle) {
    var canvas = state.canvas;
    if (circle.x < circle.radius * -1) {
        circle.x = mod(circle.x, canvas.width + circle.radius) + circle.radius;
    }
    if (circle.x > canvas.width + circle.radius) {
        circle.x = mod(circle.x, canvas.width + circle.radius) - circle.radius;
    }
    if (circle.y < circle.radius * -1) {
        circle.y = mod(circle.y, canvas.height + circle.radius) + circle.radius;
    }
    if (circle.y > canvas.height + circle.radius) {
        circle.y = mod(circle.y, canvas.height + circle.radius) - circle.radius;
    }
};

var update = function (state) {

    var now = new Date(),
    t = now - state.lastTime,
    secs = t / 1000,
    i = state.circles.length,
    circle;
    while (i--) {

        circle = state.circles[i];

        // step and wrap position
        circle.x += Math.cos(circle.heading) * circle.pps * secs;
        circle.y += Math.sin(circle.heading) * circle.pps * secs;
        wrapCircle(state, circle);

        // set alpha of a circle based on distance
        var d = distance(circle.x, circle.y, state.canvas.width / 2, state.canvas.height / 2);
        circle.alpha = 1 - d / (canvas.width / 2);
        circle.alpha = circle.alpha < 0 ? 0 : circle.alpha;

    }

    state.lastTime = now;

};

genCircles(state);
var loop = function () {
    requestAnimationFrame(loop);
    draw.back(state);
    draw.circles(state);
    update(state);
};
loop();
