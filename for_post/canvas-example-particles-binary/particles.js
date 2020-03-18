
var paricles = (function () {

    var DEFAULT_POOL_SIZE = 20,
    PARTICLE_MIN_RADIUS = 8,
    PARTICLE_MIN_LIFE = 3000;

    var randomHeading = function (min, max) {
        min = min === undefined ? 0 : min;
        max = max === undefined ? 359 : max;
        var degree = min + Math.random() * (max - min);
        return Math.PI / 180 * degree;
    };

    var Particle = function () {
        this.x = -1;
        this.y = -1;
        this.heading = 0;
        this.bits = '00'; // [0,0] inactive, [1,0] // blue, [0,1] red, [1,1] // explode
        this.pps = 32; // pixels per second
        this.life = PARTICLE_MIN_LIFE; // life left in milliseconds when in explode mode
    };

    Particle.prototype.radius = PARTICLE_MIN_RADIUS;

    Particle.prototype.activate = function (side, canvas) {
        this.bits = side === 1 ? '10' : '01';
        this.x = canvas.width / 2;
        this.y = side === 1 ? 0 : canvas.height - 1;
        this.heading = side === 1 ? randomHeading(45, 135) : randomHeading(225, 315);
        this.pps = 32;
        this.life = PARTICLE_MIN_LIFE;
    };

    Particle.prototype.deactivate = function () {
        this.bits = '00';
        this.x = -1;
        this.y = -1;
    };

    var createPool = function () {
        var len = DEFAULT_POOL_SIZE,
        i = len,
        pool = [];
        while (i--) {
            //pool.push(createPartcile());
            pool.push(new Particle());
        }
        return pool;
    };

    var partHitCheck = function (state, part) {
        var i = state.pool.length,
        compare;

        if (part.bits === '11') {
            return;
        }
        while (i--) {
            compare = state.pool[i];
            if (part === compare || compare.bits === '11') {
                continue;
            }
            if (u.distance(part.x, part.y, compare.x, compare.y) <= 16) {
                part.bits = '11';
                part.pps = 0;
                compare.deactivate();
                break;
            }
        }
    };

    return {

        create: function (opt) {
            opt = opt || {};
            state = {
                canvas: opt.canvas || null,
                ctx: opt.ctx || null,
                pool: createPool(),
                lastTime: new Date(), // last Tick
                spawnRate: 1000, // num of ms per spawn event
                lastSpawn: 0, // ms sense last spawn
                nextSide: 0
            };
            return state;
        },

        update: function (state) {

            var now = new Date(),
            t = now - state.lastTime,
            secs = t / 1000;

            state.lastSpawn += t;

            // update pool
            state.pool.forEach(function (part) {
                if (part.bits != '00') {
                    part.x += Math.cos(part.heading) * part.pps * secs;
                    part.y += Math.sin(part.heading) * part.pps * secs;
                    part.x = u.mod(part.x, state.canvas.width);
                    part.y = u.mod(part.y, state.canvas.height);
                    partHitCheck(state, part);
                }
            });

            // spawn
            if (state.lastSpawn >= state.spawnRate) {
                state.lastSpawn = u.mod(state.lastSpawn, state.spawnRate);
                var i = state.pool.length;
                while (i--) {
                    var part = state.pool[i];
                    if (part.bits === '00') {
                        part.activate(state.nextSide, state.canvas);
                        state.nextSide = u.mod(state.nextSide + 1, 2);
                        break;
                    }
                }
            }

            state.lastTime = now;

        }

    }

}
    ());
