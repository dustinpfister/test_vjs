var poolMod = (function () {
    // Public API
    var api = {
        ver: 'r1'
    };
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
//******** **********
//  CREATE METHODS
//******** **********
    // create a single display object
    var createDisp = api.createDisp = function(opt, i){
        return {
            active: false,
            pool: opt.pool || null,
            i: i === undefined ? -1 : i,
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
            game: opt.game || {},
            spawn: opt.spawn || function (obj, pool, state, opt) {},
            purge: opt.purge || function (obj, pool, state) {},
            update: opt.update || function (obj, pool, state, secs) {},
            beforeUpdate: opt.beforeUpdate || function(pool, state, secs){},
            afterUpdate: opt.afterUpdate || function(pool, state, secs){}
        };
        // populate the pools objects array
        var i = 0, dispOpt;
        while (i < opt.count) {
            var dispOpt = Object.assign({}, {pool: pool}, opt)
            pool.objects.push( createDisp(dispOpt, i) );
            i += 1;
        }
        // return the pool object
        return pool;
    };
//******** **********
//  POOL METHODS
//******** **********
    // spawn the next inactive object in the given pool
    api.spawn = function (pool, state, opt) {
        var obj = getInactive(pool);
        state = state || pool.game || {};
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
        state = state || pool.game || {};
        pool.objects.forEach(function(obj){
            if (!obj.active) {
                obj.active = true;
                pool.spawn.call(pool, obj, pool, state, opt);
                return obj;
            }
        });
        return pool.objects;
    };
    // spawn all objects
    api.purgeAll = function(pool, state, opt){
        state = state || pool.game || {};
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
        state = state || pool.game || {}; // your projects state object
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
    // get active objects from a pool
    api.getActiveObjects = function(pool, bool){
        bool = bool === undefined ? true : bool;
        return pool.objects.reduce(function(acc, obj){
            if(obj.active === bool){
                acc.push(obj);
            }
            return acc;
        }, []);
    };
    // get a current active count for a pool
    api.getActiveCount = function(pool, bool){
        return api.getActiveObjects(pool, bool).length;
    };
//******** **********
//  DISP OBJECT METHODS
//******** **********
    // move the given object by its current heading and pps
    api.moveByPPS = function (obj, secs) {
        obj.x += Math.cos(obj.heading) * obj.pps * secs;
        obj.y += Math.sin(obj.heading) * obj.pps * secs;
    };
    // bounding box
    api.boundingBox = function (obj, obj2) {
        var x1 = obj.x - obj.w / 2,
        y1 = obj.y - obj.h / 2,
        x2 = obj2.x - obj2.w / 2,
        y2 = obj2.y - obj2.h / 2;
        return utils.boundingBox(x1, y1, obj.w, obj.h, x2, y2, obj2.w, obj2.h);
    };
    // wrap an object to an area like a canvas
    api.wrap = function(obj, area, space){
        area = area || {width: 640, height: 480 };
        space = space === undefined ? 0 : space;
        // using new utils.wrapNumber method
        obj.x = utils.wrapNumber(obj.x, 0 - space, area.width + space);
        obj.y = utils.wrapNumber(obj.y, 0 - space, area.height + space);
    };
    // clamp an object to an area like a canvas
    api.clamp = function(obj, area, space){
        area = area || {x: 0, y: 0, width: 640, height: 480 };
        area = Object.assign({}, {x: area.x, y: area.y, width: area.width, height: area.height}, {x: 0, y: 0});
        space = space === undefined ? 0 : space;
        var xMin = area.x - space,
        xMax = area.x + area.width + space,
        yMin = area.y - space,
        yMax = area.y + area.height + space;
        if(obj.x < xMin){ obj.x = xMin; }
        if(obj.x > xMax){ obj.x = xMax; }
        if(obj.y < yMin){ obj.y = yMin;}
        if(obj.y > yMax){ obj.y = yMax; }
    };
    // find out if an object is on edge or not with the given area and space values
    api.isOnEdge = function(obj, area, space){
        area = area || {x: 0, y: 0, width: 640, height: 480 };
        area = Object.assign({}, {x: area.x, y: area.y, width: area.width, height: area.height}, {x: 0, y: 0});
        space = space === undefined ? 0 : space;
        var xMin = area.x - space,
        xMax = area.x + area.width + space,
        yMin = area.y - space,
        yMax = area.y + area.height + space;
        if(obj.x === xMin){ return true; }
        if(obj.x === xMax){ return true; }
        if(obj.y === yMin){ return true; }
        if(obj.y === yMax){ return true; }
        return false;
    };
    // purge an object ( make it inactive and call the purge method for the pool )
    api.purge = function(obj, state){
        var pool = obj.pool;
        state = state || pool.game || {};
        obj.active = false;
        pool.purge.call(pool, obj, pool, state);
    };
    // get a collection of overlaying active objects from a pool, that overlap with the given object
    api.getOverlaping = function(obj, pool){
        var i = 0,
        obj2,
        overlap = [];
        len = pool.objects.length;
        if(obj.active){
            while(i < len){
                obj2 = pool.objects[i];
                if(obj != obj2 && obj2.active){
                    if(api.boundingBox(obj, obj2)){
                         overlap.push(obj2);
                    }
                }
                i += 1;
            }
        }
        return overlap;
    };
    // get the distance between the two given disp objects
    // or a given position depending on the number of arguments given
    api.distance = function(disp, a, b){
        var x2 = 0, y2 = 0;
        if(typeof a === 'object' && a != null){
            x2 = a.x;
            y2 = a.y;
        }
        if(b != undefined){
            x2 = a;
            y2 = b;
        }
        return utils.distance(disp.x, disp.y, x2, y2);
    };
    // get the angle from the given disp, to the given other disp or position
    api.getAngleTo = function(disp, a, b){
        var x2 = 0, y2 = 0;
        if(typeof a === 'object' && a != null){
            x2 = a.x;
            y2 = a.y;
        }
        if(b != undefined){
            x2 = a;
            y2 = b;
        }
        return Math.atan2(y2 - disp.y, x2 - disp.x);
    };
    // center the disp to the given areaObj, the areaObj can be a canvas
    api.centerDisp = function(obj, areaObj){
        areaObj = areaObj === undefined ? {width: 0, height: 0} : areaObj;
        obj.x = areaObj.width / 2;
        obj.y = areaObj.height / 2;
    };
    // return public method
    return api;
}
    ());