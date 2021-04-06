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
                    data: { // data to feed to game.create
                        enemyCount: 15,
                        releaseRate: 1
                    }
                }
            ]
        };
        return state;
    };

    // return public api
    return api;
}
    ());
