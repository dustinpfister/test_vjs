var g = {};

// UTILITYS

// distance
g.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

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

    // map movement
    a.mapMoveMode = false;
    a.moveDistance = 0;
    a.moveDelta = 0;
    a.mapMoveStartPoint = {
        x: -1,
        y: -1
    };
    a.mapMoveDeltas = {
        x: 0,
        y: 0
    };

    // build menus
    a.menuOpen = false;
    a.buildMenuYOffset = 0;
    a.buildOptions = [{
            name: 'farm',
            moneyPerTick: 1
        }
    ];

    // game logic
    a.money = 0; // player money
    a.lastUpdate = new Date();
    a.tickTime = 3000;
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
            type: 0, // type index (0 - 4 = sand, 5 - 9 = grass, 10 -14 = wood),
            worth: 0, // the value of the cell
            bought: true, // has the player bought the cell
            building: {}
            // the building object
        });
        i += 1;
    }
    return a;
};

// GRID WORTH

// set grid worth for all cells from a fixed point outwards
// using a base
g.setGridWorth = function (grid, x, y, b) {
    x = x === undefined ? 0 : x;
    y = y === undefined ? 0 : y;
    b = b === undefined ? 2 : b;
    var i = grid.cells.length,
    d,
    cell;
    while (i--) {
        cell = grid.cells[i];
        d = g.distance(cell.x, cell.y, x, y);
        cell.worth = 1 + Math.pow(b, d);
    }
};

// BUILDINGS

// create a building object at the given cell position
g.createBuilding = function (grid, x, y, index) {
    index = index === undefined ? 0 : index;
    var cell = g.get(grid, x, y);
    // should be an empty object if not building is there
    if (cell.building.index === undefined && cell.bought) {
        cell.building = Object.assign({
                index: index
            }, grid.buildOptions[index]);
    }
};

// BOUNDS

// return a set of clamped offset values for the given grid
g.clampedOffsets = function (grid, canvas, pxRatio) {
    canvas = canvas || {
        width: 320,
        height: 120
    };
    pxRatio = pxRatio || 1;
    var w = grid.width * grid.cellSize * pxRatio,
    h = grid.height * grid.cellSize * pxRatio,
    bufferSize = grid.bufferSize * pxRatio,
    xMin = bufferSize * pxRatio,
    yMin = bufferSize * pxRatio,
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

// get a set of deltas
g.getPointerMovementDeltas = function (grid, canvas, px, py, ratio) {

    ratio = ratio || 1;

    var cx = grid.mapMoveStartPoint.x,
    cy = grid.mapMoveStartPoint.y,
    a = Math.atan2(py - cy, px - cx),
    d = grid.moveDistance - 32,
    per,
    dMax = 32,
    delta;

    d = d >= dMax ? dMax : d;
    per = d / dMax;
    delta = per * 3;
    grid.moveDelta = delta >= 0 ? delta: 0;
    return {
        x: Math.cos(a) * delta * ratio * -1,
        y: Math.sin(a) * delta * ratio * -1
    };
};

// UPDATE GRID

g.updateGrid = function (grid, ratio) {

    ratio = ratio || 1;

    var now = new Date(),
    t = now - grid.lastUpdate,
    ticks = Math.floor(t / grid.tickTime),
    cell,
    i = grid.cells.length;

    if (ticks >= 1) {
        while (i--) {
            cell = grid.cells[i];
            if (cell.building.index >= 0) {
                //grid.money += cell.moneyPerTick * ticks;
                grid.money += cell.building.moneyPerTick * ticks;
            }
        }
        grid.lastUpdate = now;
    }

    if (grid.mapMoveMode) {

        grid.xOffset += grid.mapMoveDeltas.x;
        grid.yOffset += grid.mapMoveDeltas.y;
        var offsets = g.clampedOffsets(grid, canvas, ratio);
        grid.xOffset = offsets.xOffset;
        grid.yOffset = offsets.yOffset;

    }

};

// EVENTS

// user action start
g.userCanvasActionStart = function (grid, e, ratio) {

    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    x = e.clientX - bx.left,
    y = e.clientY - bx.top;

    e.preventDefault();

    grid.mapMoveStartPoint = {
        x: x,
        y: y
    };

};

g.userCanvasActionMove = function (grid, e, ratio) {
    ratio = ratio || 1;

    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    x = (e.clientX - bx.left) * ratio,
    y = (e.clientY - bx.top) * ratio,
    deltas = g.getPointerMovementDeltas(grid, canvas, x, y, ratio);

    grid.moveDistance = 0;
    if (grid.mapMoveStartPoint.x != -1 && grid.mapMoveStartPoint.y != -1) {
        grid.moveDistance = g.distance(x, y, grid.mapMoveStartPoint.x, grid.mapMoveStartPoint.y);
    }

    e.preventDefault();

    if (grid.moveDistance >= 32) {
        grid.mapMoveMode = true;
        grid.mapMoveDeltas.x = deltas.x;
        grid.mapMoveDeltas.y = deltas.y;
    } else {
        grid.mapMoveMode = false;
    }
};

g.userCanvasActionEnd = function (grid, e, ratio) {

    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    x = e.clientX - bx.left,
    y = e.clientY - bx.top;
    e.preventDefault();

    if (!grid.mapMoveMode) {
        var cell = g.getCellFromCanvasPoint(grid, x / ratio, y / ratio);
        if (cell.i === grid.selectedCellIndex) {
            grid.selectedCellIndex = -1;
        } else {
            if (cell.i >= 0) {
                grid.selectedCellIndex = cell.i;
            }
        }
    }

    grid.mapMoveMode = false;
    grid.mapMoveDeltas.x = 0;
    grid.mapMoveDeltas.y = 0;
    grid.mapMoveStartPoint = {
        x: -1,
        y: -1
    };
};
