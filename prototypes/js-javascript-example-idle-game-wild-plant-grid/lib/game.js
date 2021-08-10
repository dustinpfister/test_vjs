(function (api) {

    api.create = function () {
        var game = {};
        game.grid = gridMod.create({
                xOffset: 32,
                yOffset: 32
            });
        // set some data for cells
        game.grid.cells.forEach(function (cell) {
            cell.data.fillStyle = 'lime';
        });
        return game;
    };

}
    (this['gameMod'] = {}))
