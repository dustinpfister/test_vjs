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
// sort will also mutate the array in place and make each elements
// be in order based on the conditions in the sorter function
console.log(a); // [ 37, 12, 3, 3, 2, 0, 0, -7 ]


