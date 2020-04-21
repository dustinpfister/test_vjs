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
// [ { e: 1, b: 2, p: 2, log_p: 0.6931471805599453, log_p_b: 1 },
//   { e: 2, b: 2, p: 4, log_p: 1.3862943611198906, log_p_b: 2 },
//   { e: 3, b: 2, p: 8, log_p: 2.0794415416798357, log_p_b: 3 },
//   { e: 4, b: 2, p: 16, log_p: 2.772588722239781, log_p_b: 4 },
//   { e: 5, b: 2, p: 32, log_p: 3.4657359027997265, log_p_b: 5 },
//   { e: 6, b: 2, p: 64, log_p: 4.1588830833596715, log_p_b: 6 },
//   { e: 7, b: 2, p: 128, log_p: 4.852030263919617, log_p_b: 7 },
//   { e: 8, b: 2, p: 256, log_p: 5.545177444479562, log_p_b: 8 },
//   { e: 9, b: 2, p: 512, log_p: 6.238324625039508, log_p_b: 9 } ]
