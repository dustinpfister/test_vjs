// range
var getRange = function(nums){
    var min = Math.min.apply(null, nums),
    max = Math.max.apply(null, nums);
    return max - min;
};

// median
var getMedian = function (nums) {
    var half = Math.floor(nums.length / 2);
    nums.sort(function (a, b) {
        return a - b;
    });
    return nums.length % 2 ? nums[half] : (nums[half - 1] + nums[half]) / 2;
};

// sum
var getSum = function (nums) {
    var i = nums.length,
    sum = 0;
    while (i--) {
        sum += nums[i];
    }
    return sum;
};

// mean
var getMean = function (nums) {
    return getSum(nums) / nums.length;
};

// get everything
var getEverything = function (nums) {
    var e = {};
    e.min = Math.min.apply(null, nums);
    e.max = Math.max.apply(null, nums);
    e.range = getRange(nums);
    e.median = getMedian(nums);
    e.sum = getSum(nums);
    e.mean = getMean(nums);
    return e;
};

var nums = [1, 2, 4, 7];

var e = getEverything(nums);

console.log(e.median); // 3
console.log(e.min, e.max); // 1 7
console.log(e.range); // 6
console.log(e.sum); // 14
console.log(e.mean); // 3.5
