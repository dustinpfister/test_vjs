
var createGrid = function () {
    var grid = [],
    y = 0,
    row,
    i = 0,
    x;
    while (y < 4) {
        x = 0;
        row = [];
        while (x < 4) {
            row.push(i.toString(16));
            i += 1;
            x += 1;
        }
        grid.push(row);
        y += 1;
    }
    return grid;
};

var grid = createGrid();

// elements can then be accessed like this
var cell = grid[3][2];

console.log(cell); // 'e'
