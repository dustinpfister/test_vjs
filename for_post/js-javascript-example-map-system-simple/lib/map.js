var mapMod = (function () {

    var DIST_MIN = 50,
    DIST_MAX = 100,
    MAP_PPS_MAX = 256;


    // pubic api
    var api = {};

    // create a new map state object
    api.create = function (opt) {
        var map = {
            moveMap: {
                startPos: {x: 0, y: 0},
                curPos: {x:0, y:0 },
                dist: 0,
                moveing: false
            },
            yOffset: 0,
            yMax: 480,
            objects: []
        };
        return map;
    };

    // get an object in the map with the given canvas
    // relative position. In the event that there is no object
    // return false
    api.getObjectAt = function(map, x, y){
        var i = 0,
        obj,
        len = map.objects.length;
        while(i < len){
            obj = map.objects[i];
            if(utils.distance(x, y, obj.x, obj.y - map.yOffset) <= obj.r){
                return obj;
            }
            i += 1;
        }
        return false;
    };

    // update the map, this should be called in a state machine update method
    api.update = function(map, secs){
        var curPos = map.moveMap.curPos,
        startPos = map.moveMap.startPos,
        per,
        delta;
        if(map.moveMap.moving){
            per = (map.moveMap.dist - DIST_MIN) / (DIST_MAX - DIST_MIN);
            delta = MAP_PPS_MAX * per * secs;
            if(curPos.y > startPos.y){
                map.yOffset += delta
            }
            if(curPos.y < startPos.y){
                map.yOffset -= delta;
            }
            map.yOffset = map.yOffset > map.yMax ? map.yMax : map.yOffset;
            map.yOffset = map.yOffset < 0 ? 0 : map.yOffset;
        }
    };

    api.on = {
        start: function(map, x, y){
            map.moveMap.startPos.x = x;
            map.moveMap.startPos.y = y;
            map.moveMap.curPos.x = map.moveMap.startPos.x;
            map.moveMap.curPos.y = map.moveMap.startPos.y;
            map.moveMap.dist = 0;
            map.moveMap.moving = false;
        },
        move: function(map, x, y, down){
            var curPos = map.moveMap.curPos,
            startPos = map.moveMap.startPos;
            if(down){
                curPos.x = x;
                curPos.y = y;
                map.moveMap.dist = utils.distance(curPos.x, curPos.y, startPos.x, startPos.y);
                map.moveMap.moving = false;
                if(map.moveMap.dist >= DIST_MIN){
                    map.moveMap.moving = true;
                }
            }
        },
        end: function(map, x, y){
            map.moveMap.moving = false;
        }
    };

    // return public api
    return api;
}
    ());
