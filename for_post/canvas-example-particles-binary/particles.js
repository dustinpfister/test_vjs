
var paricles = (function () {

    var DEFAULT_POOL_SIZE = 20,
    PARTICLE_MIN_RADIUS = 8;

    /*
    var createPartcile = function () {
    return {
    x: -1,
    y: -1,
    heading: 0,
    bits: '00', // [0,0] inactive, [1,0] // blue, [0,1] red, [1,1] // explode
    pps: 32, // pixels per second
    life: 3000 // life left in milliseconds when in explode mode
    };
    };
     */

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

    return {

        create: function (opt) {
            opt = opt || {};
            state = {
                canvas: opt.canvas || null,
                ctx: opt.ctx || null,
                pool: createPool()
            };
            return state;
        },

        update: function () {}

    }

}
    ());
