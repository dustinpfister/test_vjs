
var paricles = (function () {

    var DEFAULT_POOL_SIZE = 20,
    PARTICLE_MIN_RADIUS = 8;

    var Particle = function () {
        this.x = -1;
        this.y = -1;
        this.heading = 0;
        this.bits = '00'; // [0,0] inactive, [1,0] // blue, [0,1] red, [1,1] // explode
        this.pps = 32; // pixels per second
        this.life = 3000; // life left in milliseconds when in explode mode
    };

    Particle.prototype.radius = PARTICLE_MIN_RADIUS;

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

    var randomHeading = function (min, max) {
        min = min === undefined ? 0 : min;
        max = max === undefined ? 359 : max;
        var degree = min + Math.random() * (max - min);
        return Math.PI / 180 * degree;
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
                lastSpawn: 0 // ms sense last spawn
            };
            return state;
        },

        update: function (state) {

            var now = new Date(),
            t = now - state.lastTime,
            secs = t / 1000;

            state.lastSpawn += t;

            state.pool.forEach(function (part) {
                if (part.bits != '00') {
                    part.x += Math.cos(part.heading) * part.pps * secs;
                    part.y += Math.sin(part.heading) * part.pps * secs;
                    part.x = u.mod(part.x, state.canvas.width);
                    part.y = u.mod(part.y, state.canvas.height);
                }
            });

            if (state.lastSpawn >= state.spawnRate) {
                state.lastSpawn = u.mod(state.lastSpawn, state.spawnRate);
                var i = state.pool.length;
                while (i--) {
                    var part = state.pool[i];
                    if (part.bits === '00') {
                        part.bits = '10';
                        part.x = canvas.width / 2;
                        part.y = 0;
                        part.heading = randomHeading(45, 135);
                        break;
                    }
                }
            }

            state.lastTime = now;

        }

    }

}
    ());
