var circles = (function () {

    var mod = function mod(x, m) {
        return (x % m + m) % m;
    };
    var distance = function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };

    var forTicks = [
        // noop (just move with current stats)
        function () {},
        // move 45 degrees per second
        function (state, circle, secs) {
            circle.heading += Math.PI / 180 * 45 * secs;
        },
        // weird thing with sin
        function (state, circle, secs) {
            circle.ticks += secs;
            circle.ticks = mod(circle.ticks, 100);
            var r = Math.PI * 2 * (circle.ticks / 100);
            circle.heading = Math.sin(r) * (Math.PI * 2);
        }
    ];

    var genCircles = function (state) {
        state.circles = [];
        var i = 30,
        colors = ['red', 'lime', 'blue', 'white'],
        color;
        while (i--) {
            color = colors[Math.floor(Math.random() * colors.length)];
            state.circles.push({
                x: state.canvas.width / 2,
                y: state.canvas.height / 2,
                radius: 16 + 32 * Math.random(),
                color: color,
                alpha: 0.5,
                pps: 64 + 128 * Math.random(),
                heading: Math.PI * 2 * Math.random(),
                ticks: 0,
                forTickIndex: Math.floor(forTicks.length * Math.random())
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

    // set alpha of a circle based on distance
    var setCircleAlpha = function (state, circle) {
        var d = distance(circle.x, circle.y, state.canvas.width / 2, state.canvas.height / 2);
        circle.alpha = 1 - d / (state.canvas.width / 2);
        circle.alpha = circle.alpha < 0 ? 0 : circle.alpha;
    };

    // public API
    return {
        create: function (opt) {
            opt = opt || {};
            var state = {
                canvas: opt.canvas,
                ctx: opt.canvas.getContext('2d'),
                lastTime: new Date(),
                circles: []
            };
            genCircles(state);
            return state;
        },
        update: function (state) {
            var now = new Date(),
            t = now - state.lastTime,
            secs = t / 1000,
            i = state.circles.length,
            circle;
            while (i--) {
                circle = state.circles[i];

                // forTick
                forTicks[circle.forTickIndex](state, circle, secs);
                circle.heading = mod(circle.heading, Math.PI * 2);

                // step and wrap position
                circle.x += Math.cos(circle.heading) * circle.pps * secs;
                circle.y += Math.sin(circle.heading) * circle.pps * secs;
                wrapCircle(state, circle);
                setCircleAlpha(state, circle);
            }
            state.lastTime = now;
        }
    }

}
    ());
