
var flatten = function (arr) {
    var reducer = function (acc, val) {
        return acc.concat(val);
    };
    return arr.reduce(reducer, []);
};

let nums = [[1, 2, 3, [4, 5]], 6, 7];
let flat = flatten(nums);
console.log(flat);
// [ 1, 2, 3, [ 4, 5 ], 6, 7 ]
