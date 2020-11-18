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

    api.get = function (grid, xi, y) {
        if (arguments.length === 2) {
            return grid.cells[xi];
        }
        if (arguments.length === 3) {
            return grid.cells[y * grid.w + xi];
        }
        return arguments.length
    };

    return api;

}
    ());

let grid = gridMod(3, 3);
gridMod.get(grid, 3).type = 'grass'
console.log(grid);
