var normalizeNums = function (nums) {
    var min = Math.min.apply(null, nums),
    max = Math.max.apply(null, nums),
    range = max - min;
    return nums.map(function (n) {
        return n / range;
    });
};


var nums = [-37, 5, 42, 30, 43, 120, -40, 160];
console.log( normalizeNums(nums) );
// [ -0.185, 0.025, 0.21, 0.15, 0.215, 0.6, -0.2, 0.8 ]
