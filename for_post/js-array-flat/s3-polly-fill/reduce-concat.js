// polly fill for old versions of node
Array.prototype.flat = function (depth) {
    var level = 0,
    arr = this;
    depth = depth === undefined ? 1 : depth;
    var flattenLevel = function (arr) {
        var reducer = function (acc, val) {
            if (typeof val === 'object') {
                if (val.constructor.name === 'Array') {
                    level += 1;
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

let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
let flat = nums.flat();
console.log(flat);
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
