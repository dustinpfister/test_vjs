var poolMod = (function () {
    // Public API
    var api = {};
    // get next inactive object in the given pool
    var getInactive = function (pool) {
        var i = pool.objects.length,
        obj;
        while (i--) {
            obj = pool.objects[i];
            if (!obj.active) {
                return obj;
            }
        }
        return false;
    };
    // create a single display object
    var createDisp = function(i, opt){
        return {
            active: false,
            i: i,
            x: opt.x === undefined ? 0 : opt.x,
            y: opt.y === undefined ? 0 : opt.y,
            w: opt.w === undefined ? 32 : opt.w,
            h: opt.h === undefined ? 32 : opt.h,
            heading: opt.heading === undefined ? 0 : opt.heading,
            pps: opt.pps === undefined ? 32 : opt.pps,
            lifespan: opt.lifespan || 3,
            data: {}
        }
    };
    // create a new pool
    api.create = function (opt) {
        opt = opt || {};
        opt.count = opt.count || 10;
        // the main pool object
        var pool = {
            objects: [],
            secsCap: opt.secsCap === undefined ? Infinity : opt.secsCap,
            disableLifespan: opt.disableLifespan || false,
            data: opt.data || {},
            spawn: opt.spawn || function (obj, pool, state, opt) {},
            purge: opt.purge || function (obj, pool, state) {},
            update: opt.update || function (obj, pool, state, secs) {},
            beforeUpdate: opt.beforeUpdate || function(pool, state, secs){},
            afterUpdate: opt.afterUpdate || function(pool, state, secs){}
        };
        // populate the pools objects array
        var i = 0;
        while (i < opt.count) {
            pool.objects.push( createDisp(i, opt) );
            i += 1;
        }
        // return the pool object
        return pool;
    };
    // spawn the next inactive object in the given pool
    api.spawn = function (pool, state, opt) {
        var obj = getInactive(pool);
        state = state || {};
        opt = opt || {};
        if (obj) {
            if (!obj.active) {
                obj.active = true;
                pool.spawn.call(pool, obj, pool, state, opt);
                return obj;
            }
        }
        return false;
    };
    // spawn all objects
    api.spawnAll = function(pool, state, opt){
        pool.objects.forEach(function(obj){
            if (!obj.active) {
                obj.active = true;
                pool.spawn.call(pool, obj, pool, state, opt);
                return obj;
            }
        });
        return pool.objects;
    };
    // purge an object ( make it inactive and call the purge method for the pool )
    api.purge = function(pool, obj, state){
        obj.active = false;
        pool.purge.call(pool, obj, pool, state);
    };
    // spawn all objects
    api.purgeAll = function(pool, state, opt){
        pool.objects.forEach(function(obj){
            if (!obj.active) {
                obj.active =  false;
                pool.purge.call(pool, obj, pool, state);
            }
        });
        return pool.objects;
    };
    // update a pool object by a secs value
    api.update = function (pool, secs, state) {
        var i = pool.objects.length,
        obj;
        state = state || {}; // your projects state object
        secs = secs > pool.secsCap ? pool.secsCap : secs;
        // call beforeUpdate hook
        pool.beforeUpdate.call(pool, pool, secs, state);
        // for each object
        while (i--) {
            obj = pool.objects[i];
            if (obj.active) {
                pool.update.call(pool, obj, pool, state, secs);
                // if disableLifespan featre
                if(pool.disableLifespan){
                }else{
                    // else use lifespan feature
                    obj.lifespan -= secs;
                    obj.lifespan = obj.lifespan < 0 ? 0 : obj.lifespan;
                    if (obj.lifespan === 0) {
                        obj.active = false;
                        //pool.purge.call(pool, obj, pool, state);
                        api.purge.call(pool, pool, obj, state);
                    }
                }
            }
        }
        // call afterUpdate hook
        pool.afterUpdate.call(pool, pool, secs, state);
    };
    // set all to inActive or active state
    api.setActiveStateForAll = function (pool, bool) {
        bool = bool === undefined ? false : bool;
        var i = pool.objects.length,
        obj;
        while (i--) {
            obj = pool.objects[i];
            obj.active = bool;
        }
    };
    // move the given object by its current heading and pps
    api.moveByPPS = function (obj, secs) {
        obj.x += Math.cos(obj.heading) * obj.pps * secs;
        obj.y += Math.sin(obj.heading) * obj.pps * secs;
    };
    // check bounds for the given display object and canvas and return true if the object
    // is out of bounds and false if it is not.
    api.checkBounds = function (obj, canvas) {
        if (obj.x >= canvas.width || obj.x < obj.w * -1 || obj.y > canvas.height || obj.y < obj.h * -1) {
            return false;
        }
        return true;
    };
    // bounding box
    api.boundingBox = function (a, b) {
        return utils.boundingBox(a.x, a.y, a.w, a.h, b.x, b.y, b.w, b.h);
    };
    // wrap an object to an area like a canvas
    api.wrap = function(obj, area, space){
        area = area || {x: 0, y: 0, width: 640, height: 480 };
        space = space === undefined ? 0 : space;
        // using new utils.wrapNumber method
        obj.x = utils.wrapNumber(obj.x, 0 - space, area.width + space);
        obj.y = utils.wrapNumber(obj.y, 0 - space, area.height + space);
    };
    // get a collection of overlaying active objects from a pool, that overlap with the gievn object
    api.getOverlaping = function(obj, pool){
        var i = 0,
        obj2,
        overlap = [];
        len = pool.objects.length;
        if(obj.active){
            while(i < len){
                obj2 = pool.objects[i];
                if(obj != obj2 && obj2.active){
                    if(utils.boundingBox(obj.x, obj.y, obj.w, obj.h, obj2.x, obj2.y, obj2.w, obj2.h)){
                         overlap.push(obj2);
                    }
                }
                i += 1;
            }
        }
        return overlap;
    };
    // get a current active count for a pool
    api.getActiveCount = function(pool){
        return pool.objects.reduce(function(acc, obj){
            return obj.active ? acc += 1: acc;
        }, 0);
    };
    // get active objects from a pool
    api.getActiveObjects = function(pool){
        return pool.objects.reduce(function(acc, obj){
            if(obj.active){
                acc.push(obj);
            }
            return acc;
        }, []);
    };
    // get distance to object method
    api.getDistanceToObj = function(obj1, obj2){
        var x1 = obj2.x + obj2.w / 2,
        y1 = obj2.y + obj2.h / 2,
        x2 = obj1.x + obj1.w / 2,
        y2 = obj1.y + obj1.h / 2;
        return utils.distance(x1, y1, x2, y2);
    };

    // return public method
    return api;
}
    ());

