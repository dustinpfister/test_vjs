(function (api) {

    api.create = function () {
        var game = {};
        game.grid = gridPlantsMod.create({
                xOffset: 32,
                yOffset: 32
            });

        return game;
    };

}
    (this['gameMod'] = {}))
