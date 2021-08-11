(function (api) {

    api.create = function () {
        var grid = gridMod.create({
                xOffset: 32,
                yOffset: 32
            });
        // set some data for cells
        grid.cells.forEach(function (cell) {
            cell.data.fillStyle = 'lime';
        });
        return grid;
    };

}
    (this['gridPlantsMod'] = {}))
