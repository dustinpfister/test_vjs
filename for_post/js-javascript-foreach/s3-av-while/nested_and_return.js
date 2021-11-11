
let findInGrid = (grid, condition) => {
    var y = 0;
    while (y < grid.h) {
        var x = 0;
        while (x < grid.w) {
            var i = y * grid.h + x;
            if (condition(grid.cells[i], i, grid)) {
                return grid.cells[i];
            }
            x += 1;
        }
        y += 1;
    }
};

let grid = {
    w: 4,
    h: 3,
    cells: [0, 0, 0, 0, 0, null, 0, 0, 0, 0, 0, 0]
};

var a = findInGrid(grid, (n) => {
        return n != 0;
    });

console.log(a); // null
