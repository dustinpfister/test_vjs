
var setTimeMidnight = function (d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
};

var getDayDiff3 = function (d1, d2) {
    // create new dates that do not make use of time
    d1 = setTimeMidnight(d1);
    d2 = setTimeMidnight(d2);
    return ((d2 - d1) / 1000 / 60 / 60 / 24);
};

var getDayDiff1 = function (d1, d2) {
    return ((d2 - d1) / 1000 / 60 / 60 / 24);
};

var d1 = new Date(2020, 0, 2, 20, 10),
d2 = new Date(2020, 0, 4, 1, 15);

// use of the getDayDiff1 method will give a fraction
console.log( getDayDiff1(d1, d2).toFixed(2) ); // '1.21'

// I can then get different results depending on how I round
console.log( Math.floor(getDayDiff1(d1, d2)) ); // 1
console.log( Math.round(getDayDiff1(d1, d2)) ); // 1
console.log( Math.ceil(getDayDiff1(d1, d2)) ); // 2

// with getDayDiff 3 I am setting time of dates to midnight
// in other words just cutting the time off, and setting to a
// uniform time for each date.
console.log( getDayDiff3(d1, d2) ); // 2

