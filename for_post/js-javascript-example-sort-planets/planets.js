var planetMod = (function () {
    var distance = function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };

    var api = {};

    api.createPlanets = function (opt) {
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

    api.getTargets = function (planets, x, y) {
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

    return api;

}
    ());
