// polly fill for old versions of node
Array.prototype.flat = function() {
    let arr = this;
    return arr.reduce((acc, val) => acc.concat(val), []);
};

let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
let flat = nums.flat();
console.log(flat);
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
