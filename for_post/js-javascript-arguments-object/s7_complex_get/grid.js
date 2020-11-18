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

    api.get = (grid, xi, y) => {
        if (arguments.length < 1) {
            return [];
        }
        if (arguments.length === 1) {
            return grid.cells[xi];
        } else
            return grid.cells[y * grid.w + xi];
    }
};

}
());
