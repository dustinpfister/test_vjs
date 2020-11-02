
var setTimeMidnight = function (d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
};

var getDayDiff1 = function (d1, d2) {
    // create new dates that do not make use of time
    d1 = setTimeMidnight(d1);
    d2 = setTimeMidnight(d1);
    return ((d2 - d1) / 1000 / 60 / 60 / 24);
};

var d1 = new Date(2020, 0, 30),
d2 = new Date(2017, 1, 2);

var days = getDayDiff1(d1, d2);
console.log(days); // 1092
