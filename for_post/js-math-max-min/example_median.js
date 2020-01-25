var getMedian = function (nums) {
    var half = Math.floor(nums.length / 2);
    nums.sort(function (a, b) {
        return a - b;
    });
    return nums.length % 2 ? nums[half] : (nums[half - 1] + nums[half]) / 2;
};

var getSum = function (nums) {
    var i = nums.length,
    sum = 0;
    while (i--) {
        sum += nums[i];
    }
    return sum;
};

var getMean = function (nums) {
    return getSum(nums) / nums.length;
};

var getAverages = function (nums) {
    var avgs = {};
    avgs.min = Math.min.apply(null, nums);
    avgs.max = Math.max.apply(null, nums);
    avgs.range = avgs.max - avgs.min;
    avgs.median = getMedian(nums);
    avgs.sum = getSum(nums);
    avgs.mean = getMean(nums);
    return avgs;
};

var nums = [1, 2, 4, 7];

var avgs = getAverages(nums);

console.log(avgs.median); // 3
console.log(avgs.min, avgs.max); // 1 7
console.log(avgs.range); // 6
console.log(avgs.sum); // 14
console.log(avgs.mean); // 3.5
