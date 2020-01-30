
var du = {};

du.getDaysInMonth = function (y, m) {
    var d = new Date(y, m);
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
};

du.getDayDiff1 = function (d1, d2) {
    return ((d1 - d2) / 1000 / 60 / 60 / 24);
};

du.getDayDiff2 = function (d1, d2) {
    var y = d2.getFullYear(),
    m = d2.getMonth(),
    d = d2.getDate(),
    days = du.getDaysInMonth(y, m);
    do {
        m = Number(m) + 1;
        if (m >= 12) {
            m = 0;
            y = Number(y) + 1;
        }
        days += du.getDaysInMonth(y, m);
    } while ((y + '.' + m != d1.getFullYear() + '.' + d1.getMonth()));
    return days - d2.getDate() - (du.getDaysInMonth(d1.getFullYear(), d1.getMonth()) - d1.getDate());
};

var d1 = new Date(2020, 0, 14),
d2 = new Date(2000, 1, 7);


console.log( du.getDayDiff1(d1,d2) );
console.log( du.getDayDiff2(d1,d2) );