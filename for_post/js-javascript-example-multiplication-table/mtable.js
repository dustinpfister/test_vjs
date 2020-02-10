var mTable = (function () {

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

    // public API
    var api = function (w, h, forN, wOffset, hOffset) {
        w = w === undefined ? 10 : w;
        h = h === undefined ? 10 : h;
        wOffset = wOffset === undefined ? 1 : wOffset;
        hOffset = hOffset === undefined ? 1 : hOffset;
        forN = forN === undefined ? forN_default : forN;
        return mkCells(w, h, forN, wOffset, hOffset);
    };

    return api; ;

}
    ());

var table = mTable(5, 5);

var htmlDiv = function (table, cellSize) {
    cellSize = cellSize || 32;
    var html = '<div style=\"position:absolute;\">';
    // cells
    html += table.map(function (cell) {
        var x = (cell.x - table.wOffset) * cellSize + cellSize,
        y = (cell.y - table.hOffset) * cellSize + cellSize;
        return '<div style=\"position:absolute;left:' + x + 'px;top:' + y + 'px;\">' + cell.n + '<\/div>';
    }).join('');
    return html + '<\/div>';
};

console.log(htmlDiv(table, 32));
