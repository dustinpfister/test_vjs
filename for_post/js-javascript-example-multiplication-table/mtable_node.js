var forN_default = function (cell) {
    return cell.x * cell.y;
};

var mkCells = function (w, h, forN, wOffset, hOffset) {
    var cells = [],
    len = w * h,
    i = 0,
    cell;
    while (i < len) {
        cell = {
            i: i,
            x: i % w + wOffset,
            y: Math.floor(i / w) + hOffset
        };
        cell.n = forN(cell);
        cells.push(cell);
        i += 1;
    }
    cells.w = w;
    cells.h = h;
    cells.wOffset = wOffset;
    cells.hOffset = hOffset;
    return cells;
};

// public API is just a function
module.exports = function (w, h, forN, wOffset, hOffset) {
    w = w === undefined ? 10 : w;
    h = h === undefined ? 10 : h;
    wOffset = wOffset === undefined ? 1 : wOffset;
    hOffset = hOffset === undefined ? 1 : hOffset;
    forN = forN === undefined ? forN_default : forN;
    return mkCells(w, h, forN, wOffset, hOffset);
};
