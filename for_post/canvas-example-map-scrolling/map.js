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
    a.selectedCellIndex = grid.selectedCellIndex || -1;
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
    if (x < 0 || y < 0 || x >= grid.width || y >= grid.height) {
        return {};
    }
    return grid.cells[y * grid.width + x];
};

// get a cell position by way of a point on a canvas
g.getCellPositionFromCanvasPoint = function (grid, x, y) {
    return {
        x: Math.floor((x - grid.xOffset) / grid.cellSize),
        y: Math.floor((y - grid.yOffset) / grid.cellSize)
    };
};

// get a cell position by way of a point on a canvas
g.getCellFromCanvasPoint = function (grid, x, y) {
    var pos = g.getCellPositionFromCanvasPoint(grid, x, y);
    return g.get(grid, pos.x, pos.y);
};

// MAP MOVEMENT

g.getPointerMovementDeltas = function (grid, canvas, px, py) {

    //var bx = canvas.getBoundingClientRect(),
    //x = e.clientX - bx.left,
    //y = e.clientY - bx.top,
    var cx = canvas.width / 2,
    cy = canvas.height / 2,
    a = Math.atan2(py - cy, px - cx),
    d = Math.sqrt(Math.pow(px - cx, 2) + Math.pow(py - cy, 2)),
    per,
    delta

    d = d >= 80 ? 80 : d;
    per = d / 80;
    delta = (1 + per * 3) * -1;

    return {
        x : Math.cos(a) * delta,
        y : Math.sin(a) * delta
    };

};
