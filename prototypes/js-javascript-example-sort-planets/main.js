var distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
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
    dMax = Math.min.call(null, opt.canvas.width / 2, opt.canvas.height / 2),
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
            minerals: 50 + Math.round(50 * Math.random())
        });
        i += 1;
    }
    return planets;
};

var getTargets = function (planets, x, y) {
    var i = planets.length,
    pl,
    d,
    targets = [];
    while (i--) {
        pl = planets[i];
        d = distance(x, y, pl.x, pl.y);
        targets.push({
            pl: pl,
            i: i,
            d: d
        });
    }
    // sort targets by distance
    targets.sort(function (a, b) {
        if (a.d > b.d) {
            return 1;
        }
        if (a.d < b.d) {
            return -1;
        }
        return 0;
    });
    return targets;
};

var draw = {};

draw.back = function (ctx, canvas) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.targets = function (ctx, targets) {
    var i = targets.length,
    target,
    pl;
    while (i--) {
        target = targets[i];
        pl = target.pl;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(pl.x, pl.y, pl.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'blue';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(i, pl.x, pl.y);
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

var update = function (planets, x, y) {
    var targets = getTargets(planets, x, y);
    draw.back(ctx, canvas);
    draw.targets(ctx, targets);
};

update(planets, canvas.width / 2, canvas.height / 2);
