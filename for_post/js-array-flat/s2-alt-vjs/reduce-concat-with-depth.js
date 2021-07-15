
var flatten = function (arr, depth) {
    var level = 1;
    depth = depth === undefined ? 1 : depth;
    var flattenLevel = function (arr) {
        var reducer = function (acc, val) {
            if (typeof val === 'object') {
                level += 1;
                if (val.constructor.name === 'Array') {
                    if (level <= depth) {
                        return acc.concat(flattenLevel(val));
                    }
                }
            }
            level += 1;
            return acc.concat(val);
        };
        return arr.reduce(reducer, []);
    };

    return flattenLevel(arr);
};

let nums = [[1, 2, 3, [4, 5]], 6, 7];
let flat = flatten(nums, 2);
console.log(flat);
// [ 1, 2, 3, 4, 5, 6, 7 ]
