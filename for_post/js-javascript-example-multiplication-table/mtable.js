var mTable = (function () {

    var forN_default = function (cell) {
        return cell.x * cell.y;
    };

    var mkCells = function (w, h, forN) {
        var cells = [],
        len = w * h,
        i = 0,
        cell;
        while (i < len) {
            cell = {
                i: i,
                x: i % w + 1,
                y: Math.floor(i / w) + 1
            };
            cell.n = forN(cell);
            cells.push(cell);
            i += 1;
        }
        return cells;
    };

    // public API
    var api = function (w, h, forN) {
        w = w === undefined ? 10 : w;
        h = h === undefined ? 10 : h;
        forN = forN === undefined ? forN_default : forN;
        return mkCells(w, h, forN);
    };

    return api; ;

}
    ());

var table = mTable(5, 5);

console.log(table);