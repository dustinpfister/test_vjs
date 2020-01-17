
var game = (function () {

    var bb = function (a, b) {
        return !(
            ((a.y + a.size) < (b.y)) ||
            (a.y > (b.y + b.size)) ||
            ((a.x + a.size) < b.x) ||
            (a.x > (b.x + b.size)));
    };

    var spawnBerry = function (bird, canvas) {
        var count = bird.berries.length,
        now = new Date(),
        secs = (now - bird.berriesLastSpawn) / 1000;
        if (secs >= bird.berriesDelay) {
            if (count < bird.berriesMax) {
                var yRange = canvas.height - 64;
                bird.berries.push({
                    x: canvas.width + 32,
                    y: yRange - Math.random() * yRange,
                    size: 32,
                    pps: 64
                });
            }
            bird.berriesLastSpawn = now;
        }
    };

    var updateBerries = function (bird, secs, canvas) {
        var i = bird.berries.length,
        berry;
        while (i--) {
            berry = bird.berries[i];
            berry.x -= berry.pps * secs;
            if (bb(bird, berry)) {
                bird.points += 1;
                bird.berries.splice(i, 1);
            }
            if (berry.x <= berry.size * -1) {
                bird.berries.splice(i, 1);
            }
        }
    };

    var api = {};

    api.update = function (bird, canvas) {
        var now = new Date(),
        secs = (now - bird.lt) / 1000;
        bird.y += bird.pps * secs;
        if (bird.y >= canvas.height - bird.size) {
            bird.y = canvas.height - bird.size;
        }
        updateBerries(bird, secs, canvas);
        spawnBerry(bird, canvas);
        bird.lt = new Date();
    };

    api.flap = function (bird) {
        bird.y -= 32;
        if (bird.y < 0) {
            bird.y = 0;
        }
    };

    api.newBird = function () {

        return {
            x: 32,
            y: 0,
            size: 32,
            pps: 64,
            lt: new Date(),
            berries: [],
            berriesLastSpawn: new Date(),
            berriesDelay: 1,
            berriesMax: 4,
            points: 0
        };

    };

    return api;

}
());
