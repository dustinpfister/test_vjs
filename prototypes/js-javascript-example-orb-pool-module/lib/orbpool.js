var orbPoolMod = (function (global) {

    // PUBLIC API
    var api = {};

    // create and return an 'orbPool' object
    api.create = function (opt) {
        opt = opt || {};
        var orbPool = poolMod.create({
                count: opt.count || 20,
                maxSecs: opt.maxSecs || 0.25,
                spawn: function (obj, pool, sm, orbOptions) {
                    obj.data = {};
                    obj.data.orb = orbMod.createFromPoints(orbOptions.points || [1, 0, 0, 0]);
                    obj.x = 32;
                    obj.y = 32;
                    obj.w = 32;
                    obj.h = 32;
                },
                // update the button
                update: function (obj, pool, sm, secs) {
                    obj.lifespan = Infinity;
                }
            });
        return orbPool;
    };

    // create a new orb
    api.newOrb = function (orbPool, sm, options) {
        sm = sm || {};
        options = options || {
            points: [2, 4, 0, 0]
        };
        return poolMod.spawn(orbPool, sm, options);
    };

    return api;

}
    (this));
