
var createPlanets = function (opt) {
    opt = opt || {};
    opt.canvas = opt.canvas || {
        width: 320,
        height: 240
    };
    opt.count = opt.count || 5;
    var i = 0,
    y,
    a,
    d,
    dMax = Math.min.call(null, opt.canvas.width / 2, opt.canvas.height/ 2),
    planets = [];
    while (i < opt.count) {
        d = dMax / opt.count * i;
        a = Math.PI * 2 * Math.random();
        x = canvas.width / 2 + Math.cos(a) * d;
        y = canvas.height / 2 + Math.sin(a) * d;
        planets.push({
            x: x,
            y: y,
            r: 8,
            minerals: 0
        });
        i += 1;
    }
    return planets;
};

var draw = {};

draw.back = function (ctx, canvas) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.planets = function (ctx, planets) {
    var i = planets.length,
    pl;
    while (i--) {
        pl = planets[i];
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(pl.x, pl.y, pl.r, 0, Math.PI * 2);
        ctx.fill();
    }
};

var container = document.getElementById('canvas-app'),
canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
container.appendChild(canvas);

var planets = createPlanets({
        canvas: canvas
    });

console.log(planets);

draw.back(ctx, canvas);
draw.planets(ctx, planets);