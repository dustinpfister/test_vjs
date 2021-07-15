
var flatten = function (arr, depth) {
    var level = 0;
    depth = depth === undefined ? 1 : depth;
    var flattenLevel = function (arr) {
        var reducer = function (acc, val) {
            if (typeof val === 'object') {
                if (val.constructor.name === 'Array') {
                    level += 1;
                    //console.log(level, val);
                    if (level <= depth) {
                        return acc.concat(flattenLevel(val));
                    } else {
                        return acc.concat([val]);
                    }
                }
            }
            return acc.concat(val);
        };
        return arr.reduce(reducer, []);
    };

    return flattenLevel(arr);
};

let nums = [[1, 2, 3, [4, 5]], 6, 7];
// [ [ 1, 2, 3, [ 4, 5 ] ], 6, 7 ]

console.log(flatten(nums, 0));

console.log(flatten(nums, 1));
// [ 1, 2, 3, [ 4, 5 ], 6, 7 ]

console.log(flatten(nums, 2));
// [ 1, 2, 3, 4, 5, 6, 7 ]
