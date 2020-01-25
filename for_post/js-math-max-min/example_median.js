var getMedian = function (nums) {
    var half = Math.floor(nums.length / 2);
    nums.sort(function (a, b) {
        return a - b;
    });
    return nums.length % 2 ? nums[half] : (nums[half - 1] + nums[half]) / 2;
};

var getAverages = function (nums) {
    var avgs = {};
    avgs.min = Math.min.apply(null, nums);
    avgs.max = Math.max.apply(null, nums);
    avgs.range = avgs.max - avgs.min;
    avgs.median = getMedian(nums);
    return avgs;
};

var nums = [1, 2, 4, 7];

var avgs = getAverages(nums);

console.log( avgs.median ); // 3
console.log( avgs.min, avgs.max); // 1 7
console.log( avgs.range ); // 6