var g = {};

// CREATE A GRID OBJECT

// make and return a new grid object by just passing width and height values
g.createGridObject = function (w, h) {
    var grid = {};
    grid.width = w || 64;
    grid.height = h || 16;
    grid.cellSize = 32;
    g.xOffset = grid.xOffset === undefined ? 0 : grid.xOffset;
    g.yOffset = grid.yOffset === undefined ? 0 : grid.yOffset;
    grid.cells = [];
    return g.createClearCellGrid(grid);
};

// create a new grid object with blank cells by passing a given grid Object
g.createClearCellGrid = function (grid) {
    var g = {};
    g.width = grid.width || 64;
    g.height = grid.height || 16;
    g.cellSize = grid.cellSize || 32;
    g.xOffset = grid.xOffset === undefined ? 0 : grid.xOffset;
    g.yOffset = grid.yOffset === undefined ? 0 : grid.yOffset;
    g.cells = [];

    // create clean cells
    var i = 0,
    x,
    y,
    len = g.width * g.height;
    while (i < len) {
        g.cells.push({
            i: i,
            x: i % grid.width,
            y: Math.floor(i / grid.width),
            type: 0, // type index (0 = sand , 1-5 = grass, 6-10 = wood),
            worth: 0
        });
        i += 1;
    }
    return g;
};
