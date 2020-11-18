let gridMod = (function () {

    let createCellObj = (i, w) => {
        return {
            i: i,
            type: 'empty',
            x: i % w,
            y: Math.floor(i / w)
        };
    };

    let api = (w, h) => {
        let i = 0,
        len = w * h,
        cells = [];
        while (i < len) {
            cells.push(createCellObj(i, w));
            i += 1;
        }
        return {
            cells: cells,
            w: w
        }
    };

    api.get = function (grid, a, b) {
        // if two arguments (grid, a)
        if (arguments.length === 2) {
            // if number get by index (grid, index)
            if (typeof arguments[1] === 'number') {
                return grid.cells[arguments[1]];
            }
            // if string get by type (gird, type)
            if (typeof arguments[1] === 'string') {
                let str = arguments[1];
                return grid.cells.filter(function (cell) {
                    return cell.type === str;
                });
            }
        }
        // if three arguments
        if (arguments.length === 3) {
            return grid.cells[b * grid.w + a];
        }
        return false;
    };

    return api;

}
    ());

let grid = gridMod(3, 3);
gridMod.get(grid, 3).type = 'grass';
gridMod.get(grid, 2, 1).type = 'grass';
console.log(grid);
console.log(gridMod.get(grid, 'grass'));
