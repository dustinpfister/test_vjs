var grid = {
    w: 4,
    h: 4,
    cells: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],
    get: function (x, y) {
        return this.cells[y * this.w + x];
    }
};

console.log(grid.get(2, 3)); // 'e'
