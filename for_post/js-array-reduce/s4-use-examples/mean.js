let getArthMean = (nums) => {
    return nums.reduce((acc, n) => {
        return acc + n;
    }, 0) / nums.length;
};
let nums = [10, 5, 7, 10, 10, 8];
console.log(getArthMean(nums).toFixed(2)); // '8.33'
