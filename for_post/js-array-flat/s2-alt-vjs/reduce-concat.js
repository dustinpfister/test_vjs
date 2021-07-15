// polly fill for old versions of node
var flatten = function(arr) {
    return arr.reduce((acc, val) => acc.concat(val), []);
};

let nums = [[1, 2, 3], 4, 5];
let flat = flatten(nums);
console.log(flat);
// [ 1, 2, 3, 4, 5 ]
