var gameMod = (function () {
    // the public api
    var api = {};
    // public create method
    api.create = function (opt) {
        opt = opt || {};
        var game = {
            sm: opt.sm || {}
        };
        game.units = unitsMod.create({
            game: game
        });
        // spawn all for starters
        poolMod.spawnAll(game.units, game, {});
        //console.log(poolMod.getActiveCount(game.units, true));
        //console.log(poolMod.getActiveCount(game.units, false));
        //console.log(poolMod.getActiveObjects(game.units, true));
        //console.log(poolMod.getActiveObjects(game.units, false));

        // testing distance method
        //var disp = game.units.objects[0],
        //disp2 = game.units.objects[1];
        //disp.x = 100;
        //disp.y = 50;
        //console.log( poolMod.distance(disp, 100, 100) ); // 50
        //disp2.x = 100; disp2.y = 50;
        //console.log( poolMod.distance(disp, disp2)); // 0

var areaObj = game.sm.canvas;
poolMod.getActiveObjects(game.units).forEach(function(disp){
    poolMod.centerDisp(disp, areaObj);
});

        return game;
    };
    // public update method
    api.update = function (game, secs) {
        // update units
        poolMod.update(game.units, secs, sm.game);
    };
    // return the public API
    return api;
}
    ());
