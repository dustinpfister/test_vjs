
var cb = function (n) {
    return n > 2 && n < 6;
};

var sorter = function (a, b) {
    if (a > b) {
        return -1
    }
    if (a < b) {
        return 1;
    }
    return 0;
};

// and array of numbers
var a = [3, 3, 0, 12, 0, -7, 37, 2];

// if I want to find the greatest number
var b = a.sort(sorter);
console.log(b[0]); // 37


