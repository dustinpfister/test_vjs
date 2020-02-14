var mTable = require('./mtable.js');

var pad = function (n) {
    return String('0000' + n).slice(-4);
};

var renderTable = function (table) {
    var i = 0,
    line = '',
    len = table.length,
    cell;
    while (i < len) {

        cell = table[i];
        line += pad(cell.n) + '|';
        if (cell.x === table.w) {
            console.log(line);
            line = '';
        }
        i += 1;
    }
};

var t = mTable(20,100);

renderTable(t);
