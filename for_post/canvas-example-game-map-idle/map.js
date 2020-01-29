var map = {};

// CREATE A GRID OBJECT

// parse grid properties
map.parseGridProps = function (grid) {
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
    //a.mapMoveMode = false;
    //a.moveDistance = 0;
    //a.moveDelta = 0;
    //a.mapMoveStartPoint = {
    //    x: -1,
    //    y: -1
    //};
    //a.mapMoveDeltas = {
    //    x: 0,
    //    y: 0
    //};

    // game logic
    a.money = 0; // player money
    a.lastUpdate = new Date();
    a.tickTime = 3000;
    return a;
};

// make and return a new grid object by just passing width and height values
map.createGridObject = function (w, h) {
    var a = map.parseGridProps({
            width: w,
            height: h
        });
    return map.createClearCellGrid(a);
};

// create a new grid object with blank cells by passing a given grid Object
map.createClearCellGrid = function (grid) {
    var a = map.parseGridProps(grid);
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
map.setGridWorth = function (grid, x, y, b) {
    x = x === undefined ? 0 : x;
    y = y === undefined ? 0 : y;
    b = b === undefined ? 2 : b;
    var i = grid.cells.length,
    d,
    cell;
    while (i--) {
        cell = grid.cells[i];
        d = u.distance(cell.x, cell.y, x, y);
        cell.worth = 1 + Math.pow(b, d);
    }
};

// BUILDINGS

// create a building object at the given cell position
map.createBuilding = function (grid, x, y, index, buildOptions) {
    buildOptions = buildOptions || [{
                name: 'farm',
                moneyPerTick: 1
            }
        ];
    index = index === undefined ? 0 : index;
    var cell = map.get(grid, x, y);
    // should be an empty object if not building is there
    if (cell.building.index === undefined && cell.bought) {
        cell.building = Object.assign({
                index: index
            }, buildOptions[index]);
    }
};

// BOUNDS

// return a set of clamped offset values for the given grid
map.clampedOffsets = function (grid, canvas) {
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
map.get = function (grid, x, y) {
    if (x < 0 || y < 0 || x >= grid.width || y >= grid.height) {
        return {};
    }
    return grid.cells[y * grid.width + x];
};

// get a cell position by way of a point on a canvas
map.getCellPositionFromCanvasPoint = function (grid, x, y) {
    return {
        x: Math.floor((x - grid.xOffset) / grid.cellSize),
        y: Math.floor((y - grid.yOffset) / grid.cellSize)
    };
};

// get a cell position by way of a point on a canvas
map.getCellFromCanvasPoint = function (grid, x, y) {
    var pos = map.getCellPositionFromCanvasPoint(grid, x, y);
    return map.get(grid, pos.x, pos.y);
};

// MAP MOVEMENT

// get a set of deltas
/*
map.getPointerMovementDeltas = function (grid, canvas, px, py) {

    var cx = grid.mapMoveStartPoint.x,
    cy = grid.mapMoveStartPoint.y,
    a = Math.atan2(py - cy, px - cx),
    d = grid.moveDistance - 32,
    per,
    dMax = canvas.height / 2,
    delta;

    d = d >= dMax ? dMax : d;
    per = d / dMax;
    delta = per * 3;
    grid.moveDelta = delta >= 0 ? delta : 0;
    return {
        x: Math.cos(a) * delta  * -1,
        y: Math.sin(a) * delta  * -1
    };
};
*/

// UPDATE GRID

map.updateGrid = function (grid) {

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

    //if (grid.mapMoveMode) {

        //grid.xOffset += grid.mapMoveDeltas.x;
        //grid.yOffset += grid.mapMoveDeltas.y;
        //var offsets = map.clampedOffsets(grid, canvas);
        //grid.xOffset = offsets.xOffset;
        //grid.yOffset = offsets.yOffset;

    //}

};

