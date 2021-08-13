(function (api) {

    var PLANTS = [
        // 0 - none
        {
            desc: 'none',
            minFert: 0
        },
        // 1 - grass
        {
            desc: 'Grass',
            minFert: 1
        }
    ]

    api.create = function () {
        var grid = gridMod.create({
                xOffset: 32,
                yOffset: 32
            });
        // start with one fertPoint
        grid.fertPoints = 1;
        // set some data for cells
        grid.cells.forEach(function (cell) {
            // fill style
            cell.data.fillStyle = 'lime';
            cell.data.plantIndex = 0;
        });
        return grid;
    };

    var onCellSelect = function (cell) {
        cell.data.fillStyle = 'red';
    };
    var onCellUnSelect = function (cell) {
        cell.data.fillStyle = 'lime';
    };
    api.selectedCheck = function (grid, x, y) {
        gridMod.selectedCheck(sm.game.grid, x, y, onCellSelect, onCellUnSelect);
    };

}
    (this['gridPlantsMod'] = {}))
