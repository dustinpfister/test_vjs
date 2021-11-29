var get = function (grid, x, y) {
    return y * grid.w + x;
};
 
var grid = {
    w: 3,
    cells: [1, 2, 3, 4, 5, 6, 7, 8, 9]
};

console.log( get(grid, 2, 1) ); // 5
