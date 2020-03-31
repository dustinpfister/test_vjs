// A function of some kind like this can be used
// to create the gird
var createGrid = function (w, h, forCell) {
    var grid = [],
    y = 0,
    row,
    i = 0,
    x;
    w = w === undefined ? 3 : w;
    h = h === undefined ? 3 : h;
    forCell = forCell === undefined ? function (i) {
        return i;
    }
     : forCell;
    while (y < w) {
        x = 0;
        row = [];
        while (x < h) {
            row.push(forCell(i));
            i += 1;
            x += 1;
        }
        grid.push(row);
        y += 1;
    }
    return grid;
};

// I can then create the same grid like this
var grid = createGrid(4, 4, function (i) {
        return i.toString(16);
    });
var cell = grid[3][2];

console.log(cell); // 'e'
