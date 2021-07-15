
var flatten = function (arr) {
    var level = 1;
    var flattenLevel = function (arr) {
        var reducer = function (acc, val) {
            if (typeof val === 'object') {
                if (val.constructor.name === 'Array') {
                    console.log(level);
                    console.log(val);
                    level += 1;
                    return acc.concat(flattenLevel(val));
                }
            }
            return acc.concat(val);
        };
        return arr.reduce(reducer, []);
    };

    return flattenLevel(arr);
};

let nums = [[1, 2, 3, [4, 5]], 6, 7];
let flat = flatten(nums);
console.log(flat);
// [ 1, 2, 3, 4, 5, 6, 7 ]
