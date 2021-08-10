(function (api) {

    api.create = function () {
        var game = {};
        game.grid = gridMod.create();
        return game;
    };

}
    (this['gameMod'] = {}))
