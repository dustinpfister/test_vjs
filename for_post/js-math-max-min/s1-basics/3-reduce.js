var arr = [1, 7, 3, -2];
// using reduce to get min and max
var min = arr.reduce(function (acc, n) {
        if (n < acc) {
            return n
        }
        return acc;
    }, Infinity);
var max = arr.reduce(function (acc, n) {
        if (n > acc) {
            return n
        }
        return acc;
    }, -Infinity);
console.log(min, max); // -2, 7
