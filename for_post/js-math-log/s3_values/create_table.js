var createValuesTable = function (base, eStart, eEnd) {

    base = base === undefined ? 2 : base;
    eStart = eStart === undefined ? 1 : eStart;
    eEnd = eEnd === undefined ? 10 : eEnd;

    var e = eStart,
    table = [],
    p;
    while (e < eEnd) {
        p = Math.pow(base, e);
        table.push({
            e: e,
            b: base,
            p: p,
            log_p: Math.log(p),
            log_p_b: Math.log(p) / Math.log(base)
        })
        e += 1;
    }
    return table;
};

var table = createValuesTable(2, 1, 10);
console.log(table);
