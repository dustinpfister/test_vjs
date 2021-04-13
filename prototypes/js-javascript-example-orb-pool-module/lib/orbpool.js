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

    return api;

}
    (this));
