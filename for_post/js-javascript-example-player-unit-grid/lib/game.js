var gameMod = (function () {

    // constants
    var SHOT_COUNT = 30,
    SHOT_MAX_DIST = 300,
    SHOT_PPS = 256,
    TURRET_FIRE_RANGE = Math.PI / 180 * 20,
    TURRET_ROTATION_RATE = Math.PI / 180 * 180,
    TURRET_FIRE_RATE = 0.125;

    var setDispObject = function(disp, x, y, w, h){
        disp.x = x === undefined ? 0 : x;
        disp.y = y === undefined ? 0 : y;
        disp.w = w === undefined ? 8 : w;
        disp.h = h === undefined ? 8 : h;
        disp.hh = disp.h / 2;
        disp.hw = disp.w / 2;
        disp.cx = disp.x + disp.hw;
        disp.cy = disp.y + disp.hh;
    };

    // create a base disp object
    var createBaseDispObject = function(opt){
        opt = opt || {};
        var disp = {
            x:0,y:0,w:32,h:32,
            heading: opt.heading === undefined ? 0 : opt.heading,
            active: false,
            data: {}
        };
        setDispObject(disp, opt.x, opt.y, opt.w, opt.h);
        return disp;
    };

    // create a base player unit that will just serve as a place holder unit
    var create_unit_base = function(opt){
        opt = opt || {};
        opt.w = 32;
        opt.h = 32;
        var unit = createBaseDispObject(opt);
        unit.active = false;
        unit.data.unitType = 'none';
        return unit;
    };

    // create a turret UNIT
    var create_unit_turret = function(opt){
        opt = opt || {};
        opt.w = 32;
        opt.h = 32;
        opt.heading = Math.PI * 1.5;
        var turret = createBaseDispObject(opt);
        turret.active = opt.active === undefined ? true: opt.active;
        turret.data = {
            unitType: 'turret',
            facing: 0,
            target: 0,
            radiansPerSecond: TURRET_ROTATION_RATE,
            fireRate: TURRET_FIRE_RATE,
            fireSecs: 0,
            inRange: false
        };
        return turret;
    };

    // pubic api
    var api = {};

    // create state
    api.create = function (opt) {
        opt = opt || {canvas: {width: 640, height: 480}};
        var game = {
            turret: create_unit_turret(),
            player_units: [],
            shots: [],
            down: false // a pointer is down
        };

        // create unit pool
        var i = 0,
        w = 3, h = 3, x, y,
        len = w * h;
        game.player_units = [];
        while(i < len){
            x = i % w;
            y = Math.floor(i / w);
            game.player_units.push(create_unit_base({
                x: 200 + x * 32,
                y: 200 + y * 32 
            }));
            i += 1;
        }

        // create shot pool
        game.shots = [];
        var i = 0;
        while (i < SHOT_COUNT) {
            game.shots.push(createBaseDispObject());
            i += 1;
        }

        console.log(game);

        return game;
    };
    // update turret target
    api.updateTurretTarget = function (state, x, y) {
        var turret = state.turret;
        turret.data.target = Math.atan2(y - turret.y, x - turret.x);
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

    // update turret facing to face current target
    var update_turret_facing = function (game, turret, secs) {
        var toAngle = turret.heading;
        if (game.down) {
            toAngle = turret.data.target;
        }
        var dist = utils.angleDistance(turret.data.facing, toAngle);
        var dir = utils.shortestAngleDirection(toAngle, turret.data.facing);
        var delta = turret.data.radiansPerSecond * secs;
        if (delta > dist) {
            turret.data.facing = toAngle;
        } else {
            turret.data.facing += delta * dir;
        }
        turret.data.inRange = false;
        if (game.down && dist < TURRET_FIRE_RANGE) {
            turret.data.inRange = true;
        }
    };

    var update_turret_fire = function(game, turret, secs){
        turret.data.fireSecs += secs;
        if (turret.data.fireSecs >= turret.data.fireRate && turret.data.inRange) {
            var freeShot = getFreeShot(game);
            if (freeShot) {
                freeShot.active = true;
                freeShot.x = turret.x + turret.w / 2 - freeShot.w / 2;
                freeShot.y = turret.y + turret.h / 2 - freeShot.h / 2;
                freeShot.heading = turret.data.facing;
            }
            turret.data.fireSecs = 0;
        }
    };

    // update shots
    var updateShots = function (state, secs) {
        var turret = state.turret;
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

    api.update = function(game, secs){
        update_turret_facing(game, game.turret, secs);
        update_turret_fire(game, game.turret, secs);
        updateShots(game, secs);
    };

    // return public api
    return api;
}
    ());
