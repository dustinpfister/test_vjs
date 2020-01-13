
var td = (function () {

    // public api
    var api = {};

    // hold shots
    var holdShots = function (game) {
        game.shots.forEach(function (shot) {
            if (!(shot.sx === shot.x && shot.sy === shot.y)) {
                shot.lifeSpanAjust = (new Date() - shot.shotTime) / 1000 * -1;
                shot.sx = shot.x;
                shot.sy = shot.y;
            }
            shot.shotTime = new Date();
        });
    };

    // update turret shots
    var updateTurretShots = function (game, secs) {
        // if the game is paused
        if (game.paused) {
            holdShots(game);
        } else {
            // the game is not paused
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

    // the game object
    api.createGameObject = function () {
        return {
            cx: canvas.width / 2,
            cy: canvas.height / 2,
            heading: 0,
            rps: 1, // radians per second
            lt: new Date(), // last time game was updated
            shots: [],
            shotsMax: 13,
            shotDelay: 1,
            shotTime: 0,
            paused: false
        };
    };

    // update turret method
    api.updateTurret = function (game) {
        var now = new Date(),
        secs = (now - game.lt) / 1000;

        if (game.paused) {
            game.lt = now;
        } else {
            game.heading += game.rps * secs;
            game.heading %= Math.PI * 2;
            game.lt = now;
        }
        updateTurretShots(game, secs);
    };

    return api;

}
    ());
