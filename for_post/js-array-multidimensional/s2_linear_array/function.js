var createGrid = function (w, h, forCell) {
    w = w === undefined ? 3 : w;
    h = h === undefined ? 3 : h;
    forCell = forCell === undefined ? function (i) {
        return i;
    }
     : forCell;
    var cells = [],
    i = 0,
    len = w * h;
    while (i < len) {
        cells.push(forCell(i));
        i += 1;
    }
    return {
        w: w,
        h: h,
        cells: cells,
        get: function (x, y) {
            return this.cells[y * this.w + x];
        }
    };
};

var grid = createGrid(4, 4, function (i) {
        return i.toString(16);
    });

console.log(grid.get(2, 3)); // 'e'
