
var td = {};

// the game object
td.createGameObject = function () {
    return {
        cx: canvas.width / 2,
        cy: canvas.height / 2,
        heading: 0,
        rps: 1, // radians per second
        lt: new Date(), // last time turret was updated
        shots: [],
        shotsMax: 13,
        shotDelay: 1,
        shotTime: 0,
        paused: false
    };
};

// update turret shots
td.updateTurretShots = function (game, secs) {

    if (game.paused) {

        game.shots.forEach(function (shot) {
            if (!(shot.sx === shot.x && shot.sy === shot.y)) {
                shot.lifeSpanAjust = (new Date() - shot.shotTime) / 1000 * -1;
                shot.sx = shot.x;
                shot.sy = shot.y;
            }
            shot.shotTime = new Date();
        });

    } else {
        // spawn new shots
        game.shotTime += secs;
        var newShots = Math.floor(game.shotTime / game.shotDelay);
        if (newShots >= 1) {
            game.shotTime -= newShots * game.shotDelay;
            if (game.shots.length < game.shotsMax) {
                game.shots.push({
                    sx: game.cx,
                    sy: game.cy,
                    x: game.cx,
                    y: game.cy,
                    heading: game.heading,
                    pps: 64,
                    lifeSpan: 3,
                    lifeSpanAjust: 0,
                    shotTime: new Date()
                });
            }
        }
        // update active shots
        var i = game.shots.length,
        now = new Date(),
        shot,
        t;
        while (i--) {
            shot = game.shots[i];
            t = (now - shot.shotTime) / 1000;
            shot.x = shot.sx + Math.cos(shot.heading) * t * shot.pps;
            shot.y = shot.sy + Math.sin(shot.heading) * t * shot.pps;
            // purge old shots
            if (t >= shot.lifeSpan + shot.lifeSpanAjust) {
                game.shots.splice(i, 1);
            }
        }

    }
};

// update turret method
td.updateTurret = function (game) {
    var now = new Date(),
    secs = (now - game.lt) / 1000;

    if (game.paused) {
        game.lt = now;
    } else {
        game.heading += game.rps * secs;
        game.heading %= Math.PI * 2;
        game.lt = now;
    }
    td.updateTurretShots(game, secs);
};
