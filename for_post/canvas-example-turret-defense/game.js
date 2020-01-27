
var td = (function () {

    // SHOTS

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

    // spawn new shots
    var spawnShots = function (game, secs) {
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
    };

    // purge old shots
    var purgeShotCheck = function (game, i) {
        var now = new Date(),
        shot = game.shots[i],
        t = (now - shot.shotTime) / 1000;
        if (t >= shot.lifeSpan + shot.lifeSpanAjust) {
            game.shots.splice(i, 1);
        }
    };

    // loop over all shots, move them, and make a purge check
    var updateActiveShots = function (game) {
        // update active shots
        var i = game.shots.length,
        now = new Date(),
        shot;
        while (i--) {
            shot = game.shots[i];
            t = (now - shot.shotTime) / 1000;
            shot.x = shot.sx + Math.cos(shot.heading) * t * shot.pps;
            shot.y = shot.sy + Math.sin(shot.heading) * t * shot.pps;
            purgeShotCheck(game, i);
        }
    };

    // Main update shots helper
    var updateTurretShots = function (game, secs) {
        // if the game is paused
        if (game.paused) {
            holdShots(game);
        } else {
            // the game is not paused
            spawnShots(game, secs)
            updateActiveShots(game);
        }
    };

    // ENEMIES

    // spawn new enemies
    var spawnEnemies = function (game, secs) {
        // new enemy count
        var nec = Math.floor(game.enemyTime / game.enemyDelay);
        if (!game.paused) {
            game.enemyTime += secs;
            if (nec >= 1) {
                game.enemyTime -= nec * game.enemyDelay;
                if (nec + game.enemies.length > game.enemiesMax) {
                    nec = game.enemiesMax - game.enemies.length;
                }

                //console.log(nec);
                var i = nec,
                r,
                x,
                y;
                while (i--) {

                    r = Math.random() * (Math.PI * 2);
                    x = Math.cos(r) * 100 + game.cx;
                    y = Math.sin(r) * 100 + game.cy;

                    game.enemies.push({
                        x: x,
                        y: y,
                        size: 10
                    });

                };

            }
        }
    };

    // PUBLIC API
    // public api
    var api = {};

    // the game object
    api.createGameObject = function () {
        return {
            cx: canvas.width / 2,
            cy: canvas.height / 2,
            heading: 0,
            rps: 0, // radians per second
            lt: new Date(), // last time game was updated
            paused: false,
            shots: [],
            shotsMax: 13,
            shotDelay: 1,
            shotTime: 0,
            enemies: [],
            enemiesMax: 3,
            enemyDelay: 1,
            enemyTime: 0
        };
    };

    // update turret method
    api.update = function (game) {
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
        spawnEnemies(game, secs);
    };

    return api;

}
    ());
