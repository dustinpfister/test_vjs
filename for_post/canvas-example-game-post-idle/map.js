var g = {};

// make grid object method
g.createGridObject = function (w, h) {
    var grid = {};
    grid.width = w || 64;
    grid.height = h || 16;
    grid.cells = [];
    return grid;
};
