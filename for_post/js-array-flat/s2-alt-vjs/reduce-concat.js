var flatten = function (arr) {
    var reducer = function (acc, val) {
        if (typeof val === 'object') {
            if (val.constructor.name === 'Array') {
                console.log(val)
                return acc.concat(flatten(val));
            }
        }
        return acc.concat(val);
    };
    return arr.reduce(reducer, []);
};

let nums = [[1, 2, 3, [4, 5]], 6, 7];
let flat = flatten(nums);
console.log(flat);
// [ 1, 2, 3, 4, 5, 6, 7 ]
