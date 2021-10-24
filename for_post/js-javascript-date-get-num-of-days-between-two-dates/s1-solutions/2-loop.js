
var getDaysInMonth = function (y, m) {
    var d = new Date(y, m);
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
};

var getDayDiff2 = function (d1, d2) {
    var y = d2.getFullYear(),
    m = d2.getMonth(),
    d = d2.getDate(),
    days = getDaysInMonth(y, m);
    do {
        m = Number(m) + 1;
        if (m >= 12) {
            m = 0;
            y = Number(y) + 1;
        }
        days += getDaysInMonth(y, m);
    } while ((y + '.' + m != d1.getFullYear() + '.' + d1.getMonth()));
    return days - d2.getDate() - (getDaysInMonth(d1.getFullYear(), d1.getMonth()) - d1.getDate());
};

var d1 = new Date(2020, 0, 13),
d2 = new Date(2017, 1, 2);

var days = getDayDiff2(d1, d2);
console.log(days); // 1092
