var getAverages = function (nums) {

    var avgs = {};

    avgs.min = Math.min.apply(null, nums);
    avgs.max = Math.max.apply(null, nums);

    avgs.range = agvs.max - avgs.min;
    avgs.sorted = nums.sort();

    return avgs;

};
