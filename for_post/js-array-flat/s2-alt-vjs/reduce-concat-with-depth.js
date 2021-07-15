
var flatten = function (arr, depth) {
    depth = depth === undefined ? 1 : depth;
    var flattenLevel = function (arr, level) {
        var reducer = function (acc, val) {
            if (typeof val === 'object') {
                if (val.constructor.name === 'Array') {
                    var nextLevel = level + 1;
                    if (nextLevel <= depth) {
                        return acc.concat(flattenLevel(val, nextLevel));
                    }
                    return acc.concat([val]);
                }
            }
            return acc.concat(val);
        };
        return arr.reduce(reducer, []);
    };
    return flattenLevel(arr, 0);
};

let nums = [[1, 2, 3, [4, 5]], 6, 7];
// [ [ 1, 2, 3, [ 4, 5 ] ], 6, 7 ]

console.log(flatten(nums, 0));

console.log(flatten(nums, 1));
// [ 1, 2, 3, [ 4, 5 ], 6, 7 ]

console.log(flatten(nums, 2));
// [ 1, 2, 3, 4, 5, 6, 7 ]
