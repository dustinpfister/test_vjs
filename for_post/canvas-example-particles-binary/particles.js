
var paricles = (function () {

    var DEFAULT_POOL_SIZE = 20;

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

    var createPool = function () {
        var len = DEFAULT_POOL_SIZE,
        i = len,
        pool = [];
        while (i--) {
            pool.push(createPartcile());
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
