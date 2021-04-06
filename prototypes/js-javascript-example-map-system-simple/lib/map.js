var mapMod = (function () {


    // pubic api
    var api = {};

    // create state
    api.create = function (opt) {
        var state = {
            yOffset: 0,
            yMax: 960,
            objects: [
                {
                    x: 50, // location in map
                    y: 45,
                    r: 20, // radius of map button
                    gameOptions: { // data to feed to game.create
                        enemyCount: 15,
                        releaseRate: 1,
                        radiansPerSecond: Math.PI / 180 * 20,
                        fireRate: 1
                    }
                },
                {
                    x: 520, // location in map
                    y: 275,
                    r: 20, // radius of map button
                    gameOptions: { // data to feed to game.create
                        enemyCount: 15,
                        releaseRate: 1,
                        radiansPerSecond: Math.PI / 180 * 90,
                        fireRate: 0.25
                    }
                }
            ]
        };
        return state;
    };


    api.getObjectAt = function(map, x, y){
        var i = 0,
        obj,
        len = map.objects.length;
        while(i < len){
            obj = map.objects[i];
            if(utils.distance(x, y, obj.x, obj.y) <= obj.r){
                return obj;
            }
            i += 1;
        }
        return false;
    };

    // return public api
    return api;
}
    ());
