(function (api) {

    api.create = function () {
        var game = {};
        game.grid = gridMod.create({xOffset: 32, yOffset: 32});
        return game;
    };

}
    (this['gameMod'] = {}))
