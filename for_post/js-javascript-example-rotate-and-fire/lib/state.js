
var stateMod = (function () {

    var api = {};

    api.create = function (opt) {
        var state = {
            turret: {
                x: opt.canvas.width / 2,
                y: opt.canvas.height / 2,
                w: 32,
                h: 32,
                facing: 1.57,
                target: 0,
                radiansPerSecond: Math.PI / 180 * 90,
                heading: Math.PI * 1.5,
                fireRate: 0.25,
                fireSecs: 0
            },
            down: false // a pointer is down
        };

        state.shots = [];
        var shotCount = 10,
        i = 0;
        while (i < shotCount) {
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

    api.updateShots = function (state, secs) {
        var turret = state.turret;
        turret.fireSecs += secs;
        if (turret.fireSecs >= turret.fireRate) {
            var freeShot = getFreeShot(state);
            if (freeShot) {
                freeShot.active = true;
                freeShot.x = turret.x;
                freeShot.y = turret.y;
                freeShot.heading = turret.facing;
            }
            turret.fireSecs = 0; //utils.mod(turret.fireSecs, turret.fireRate);
        }

        state.shots.forEach(function (shot) {

            if (shot.active) {

                shot.x += Math.cos(shot.heading) * 128 * secs;
                shot.y += Math.sin(shot.heading) * 128 * secs;

            }

        });

    };

    return api;

}
    ());
