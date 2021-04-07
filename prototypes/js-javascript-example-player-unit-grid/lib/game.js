var gameMod = (function () {

    // constants
    var SHOT_COUNT = 10,
    SHOT_MAX_DIST = 300,
    SHOT_PPS = 256,
    TURRET_FIRE_RANGE = Math.PI / 180 * 20,
    TURRET_ROTATION_RATE = Math.PI / 180 * 180;

    // pubic api
    var api = {};

    // create state
    api.create = function (opt) {
        opt = opt || {canvas: {width: 640, height: 480}};
        var state = {
            turret: {
                x: opt.canvas.width / 2,
                y: opt.canvas.height / 2,
                w: 32,
                h: 32,
                facing: 0,
                target: 0,
                radiansPerSecond: opt.radiansPerSecond || TURRET_ROTATION_RATE,
                heading: Math.PI * 1.5,
                fireRate: opt.fireRate || 0.125,
                fireSecs: 0,
                inRange: false
            },
            down: false // a pointer is down
        };
        state.shots = [];
        var i = 0;
        while (i < SHOT_COUNT) {
            state.shots.push({
                x: 0,
                y: 0,
                heading: 0,
                active: false
            });
            i += 1;
        }

        return state;
    };
    // update turret target
    api.updateTurretTarget = function (state, x, y) {
        var turret = state.turret;
        turret.target = Math.atan2(y - turret.y, x - turret.x);
    };
    // update turret facing to face current target
    api.updateTurretFacing = function (state, secs) {
        var turret = state.turret;
        var toAngle = turret.heading;
        if (state.down) {
            toAngle = turret.target;
        }
        var dist = utils.angleDistance(turret.facing, toAngle);
        var dir = utils.shortestAngleDirection(toAngle, turret.facing);
        var delta = turret.radiansPerSecond * secs;
        if (delta > dist) {
            turret.facing = toAngle;
        } else {
            turret.facing += delta * dir;
        }
        turret.inRange = false;
        if (state.down && dist < TURRET_FIRE_RANGE) {
            turret.inRange = true;
        }
    };
    // find and return a free shot or false
    var getFreeShot = function (state) {
        var i = 0,
        shot,
        len = state.shots.length;
        while (i < len) {
            shot = state.shots[i];
            if (!shot.active) {
                return shot;
            }
            i += 1;
        }
        return false;
    };
    // update shots
    api.updateShots = function (state, secs) {
        var turret = state.turret;
        turret.fireSecs += secs;
        if (turret.fireSecs >= turret.fireRate && turret.inRange) {
            var freeShot = getFreeShot(state);
            if (freeShot) {
                freeShot.active = true;
                freeShot.x = turret.x;
                freeShot.y = turret.y;
                freeShot.heading = turret.facing;
            }
            turret.fireSecs = 0;
        }
        state.shots.forEach(function (shot) {
            if (shot.active) {
                shot.x += Math.cos(shot.heading) * SHOT_PPS * secs;
                shot.y += Math.sin(shot.heading) * SHOT_PPS * secs;
                if (utils.distance(shot.x, shot.y, turret.x, turret.y) >= SHOT_MAX_DIST) {
                    shot.active = false;
                }
            }
        });
    };
    // return public api
    return api;
}
    ());
