var mapMod = (function () {


    // pubic api
    var api = {};

    // create state
    api.create = function (opt) {
        var state = {
            maps: [
                {
                    x: 32, // location in map
                    y: 45,
                    r: 32, // radius of map button
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
