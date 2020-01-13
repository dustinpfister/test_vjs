


var disp = {};

// the turret object
disp.createTurretObject = function () {
    return {
        cx: canvas.width / 2,
        cy: canvas.height / 2,
        heading: 0,
        rps: 0, // radians per second
        lt: new Date(), // last time turret was updated
        shots: [],
        shotsMax: 13,
        shotDelay: 1,
        shotTime: 0,
        paused: false
    };
};

// update turret shots
disp.updateTurretShots = function (turret, secs) {

    if (turret.paused) {

        turret.shots.forEach(function (shot) {
            if (!(shot.sx === shot.x && shot.sy === shot.y)) {
                shot.lifeSpanAjust = (new Date() - shot.shotTime) / 1000 * -1;
                shot.sx = shot.x;
                shot.sy = shot.y;
            }
            shot.shotTime = new Date();
        });

    } else {
        // spawn new shots
        turret.shotTime += secs;
        var newShots = Math.floor(turret.shotTime / turret.shotDelay);
        if (newShots >= 1) {
            turret.shotTime -= newShots * turret.shotDelay;
            if (turret.shots.length < turret.shotsMax) {
                turret.shots.push({
                    sx: turret.cx,
                    sy: turret.cy,
                    x: turret.cx,
                    y: turret.cy,
                    heading: turret.heading,
                    pps: 64,
                    lifeSpan: 1,
                    lifeSpanAjust: 0,
                    shotTime: new Date()
                });
            }
        }
        // update active shots
        var i = turret.shots.length,
        now = new Date(),
        shot,
        t;
        while (i--) {
            shot = turret.shots[i];
            t = (now - shot.shotTime) / 1000;
            shot.x = shot.sx + Math.cos(shot.heading) * t * shot.pps;
            shot.y = shot.sy + Math.sin(shot.heading) * t * shot.pps;
            // purge old shots
            if (t >= shot.lifeSpan + shot.lifeSpanAjust) {
                turret.shots.splice(i, 1);
            }
        }

    }
};

// update turret method
disp.updateTurret = function (turret) {
    var now = new Date(),
    secs = (now - turret.lt) / 1000;

    if (turret.paused) {
        turret.lt = now;
    } else {
        turret.heading += turret.rps * secs;
        turret.heading %= Math.PI * 2;
        turret.lt = now;
    }
    disp.updateTurretShots(turret, secs);
};
