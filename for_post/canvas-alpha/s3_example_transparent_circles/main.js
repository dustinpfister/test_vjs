var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

var mod = function mod(x, m) {
    return (x % m + m) % m;
};

var state = {
    canvas: canvas,
    ctx: ctx,
    lastTime: new Date(),
    circles: [{
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: 32,
            color: 'red',
            alpha: 0.5,
            pps: 128,
            heading: 5 //Math.PI
        }
    ]
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
        //circle.x = mod(circle.x, state.canvas.width);
        //circle.y = mod(circle.y, state.canvas.height);
        wrapCircle(state, circle);

    }

    state.lastTime = now;

};

var loop = function () {
    requestAnimationFrame(loop);
    draw.back(state);
    draw.circles(state);
    update(state);
};
loop();
