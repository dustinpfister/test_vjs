
var flatten = function (arr) {
    var reducer = function (acc, val) {
        return acc.concat(val);
    };
    return arr.reduce(reducer, []);
};

var nums = [[1, 2, 3, [4, 5]], 6, 7];
var flat = flatten(nums);
console.log(flat);
// [ 1, 2, 3, [ 4, 5 ], 6, 7 ]
