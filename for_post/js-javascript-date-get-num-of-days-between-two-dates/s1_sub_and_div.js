
var getDayDiff1 = function (d1, d2) {

    return ((d1 - d2) / 1000 / 60 / 60 / 24);

};

var days = getDayDiff1(new Date(), new Date(2017, 1, 2));

console.log(days);