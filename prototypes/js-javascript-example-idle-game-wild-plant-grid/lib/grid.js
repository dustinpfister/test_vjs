(function (api) {

    api.create = function (opt) {
        opt = opt || {};
        var grid = {
            cellSelected: null,
            cells: []
        };
        grid.cellSize = opt.cellSize === undefined ? 32 : opt.cellSize;
        grid.w = opt.w === undefined ? 8 : opt.w;
        grid.h = opt.h === undefined ? 8 : opt.h;
        grid.xOffset = opt.xOffset === undefined ? 0 : opt.xOffset;
        grid.yOffset = opt.yOffset === undefined ? 0 : opt.yOffset;
        var i = 0,
        cell,
        len = grid.w * grid.h;
        while (i < len) {
            cell = {
                i: i, // store index for this cell
                X: i % grid.w, // grid index pos values as uppercase X, and Y
                Y: Math.floor(i / grid.w),
                data: {}
                // user data object
            };
            // cell pixel pos values as lowercase x, and y
            cell.x = grid.xOffset + cell.X * grid.cellSize;
            cell.y = grid.yOffset + cell.Y * grid.cellSize;
            grid.cells.push(cell);
            i += 1;
        }
        return grid;
    };
    // get a cell by the given pixel position
    api.getCellByPixlePos = function (grid, x, y) {
        var i = 0,
        cell,
        len = grid.w * grid.h;
        while (i < len) {
            cell = grid.cells[i];
            if (utils.boundingBox(cell.x, cell.y, grid.cellSize, grid.cellSize, x, y, 1, 1)) {
                return cell;
            }
            i += 1;
        }
        return null;
    };

}
    (this['gridMod'] = {}))
