var g = {};

// create a new grid object with blank cells by passing a given grid Object
g.createClearCellGrid = function (grid) {
    var g = {};
    g.width = grid.width || 64;
    g.height = grid.height || 16;
    g.cells = [];

    // create clean cells
    var i = 0,
    len = g.width * g.height;
    while (i < len) {
        g.cells.push({});
        i += 1;
    }
    return g;
};

// make and return a new grid object by just passing width and height values
g.createGridObject = function (w, h) {
    var grid = {};
    grid.width = w || 64;
    grid.height = h || 16;
    grid.cells = [];
    return g.createClearCellGrid(grid);
};
