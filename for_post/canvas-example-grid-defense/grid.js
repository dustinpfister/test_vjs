// GRID
var Grid = function (opt) {
    opt = opt || {};
    this.xOffset = opt.xOffset === undefined ? 5 : opt.xOffset;
    this.yOffset = opt.yOffset === undefined ? 5 : opt.yOffset;
    this.cellSize = opt.cellSize === undefined ? 32 : opt.cellSize;
    this.cellWidth = opt.cellWidth || 7;
    this.cellHeight = opt.cellHeight || 6;
    // set cells for the grid
    this.setCells();
};

Grid.prototype.getCell = function (x, y) {
    var insideX = x >= this.xOffset && x <= this.xOffset + this.cellSize * this.cellWidth,
    insideY = y >= this.yOffset && y <= this.yOffset + this.cellSize * this.cellHeight;
    if (insideX && insideY) {
        return true
    }
    return false;
};

// set cell objects for each cell in the grid
Grid.prototype.setCells = function (forCell) {
    this.cells = [];
    var ci = 0,
    cellObj,
    cLen = this.cellWidth * this.cellHeight;
    forCell = forCell || function () {};
    while (ci < cLen) {
        cellObj = {
            i: ci,
            y: Math.floor(ci / this.cellWidth),
            x: ci % this.cellWidth
        };
        forCell(cellObj);
        this.cells.push(cellObj);
        ci += 1;
    }
};
