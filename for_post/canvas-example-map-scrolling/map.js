var g = {};

// CREATE A GRID OBJECT

// parse grid properties
g.parseGridProps = function (grid) {
    var a = {};
    a.width = grid.width || 64;
    a.height = grid.height || 16;
    a.cellSize = grid.cellSize || 32;
    a.xOffset = grid.xOffset === undefined ? 0 : grid.xOffset;
    a.yOffset = grid.yOffset === undefined ? 0 : grid.yOffset;
    a.bufferSize = grid.bufferSize === undefined ? 32 : grid.bufferSize;
    a.cells = [];
    return a;
};

// make and return a new grid object by just passing width and height values
g.createGridObject = function (w, h) {
    var a = g.parseGridProps({
            width: w,
            height: h
        });
    return g.createClearCellGrid(a);
};

// create a new grid object with blank cells by passing a given grid Object
g.createClearCellGrid = function (grid) {
    var a = g.parseGridProps(grid);
    // create clean cells
    var i = 0,
    x,
    y,
    len = a.width * a.height;
    while (i < len) {
        a.cells.push({
            i: i,
            x: i % a.width,
            y: Math.floor(i / a.width),
            type: 0, // type index (0 = sand , 1-5 = grass, 6-10 = wood),
            worth: 0
        });
        i += 1;
    }
    return a;
};

// BOUNDS

// return a set of clamped offset values for the given grid
g.clampedOffsets = function (grid, canvas) {
    canvas = canvas || {
        width: 320,
        height: 120
    };
    var w = grid.width * grid.cellSize,
    h = grid.height * grid.cellSize,
    bufferSize = grid.bufferSize,
    xMin = bufferSize,
    yMin = bufferSize,
    xMax = (w - canvas.width + bufferSize) * -1,
    yMax = (h - canvas.height + bufferSize) * -1,
    x = grid.xOffset,
    y = grid.yOffset;
    // rules
    x = x > xMin ? xMin : x;
    y = y > yMin ? yMin : y;
    x = x < xMax ? xMax : x;
    y = y < yMax ? yMax : y;
    // return offset values
    return {
        xOffset: x,
        yOffset: y
    };
};

// GET CELL

// get a cell from the given cell position
g.get = function (grid, x, y) {
    x = x < 0 ? 0 : x;
    y = y < 0 ? 0 : y;
    x = x >= grid.width - 1 ? grid.width - 1 : x;
    y = y >= grid.height - 1 ? grid.height - 1 : y;
    return grid.cells[y * grid.width + x];
};

// get a cell by way of a point on a canvas
g.getCellPositionFromCanvasPoint = function (grid, x, y) {
    return {
        x: Math.floor((x - grid.xOffset) / grid.cellSize),
        y: Math.floor((y - grid.yOffset) / grid.cellSize)
    };
};
