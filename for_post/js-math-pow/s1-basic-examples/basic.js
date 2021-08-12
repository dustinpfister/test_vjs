
var nums = [0, 1, 2, 3, 4];

nums = nums.map((n) => Math.pow(2, n));

console.log(nums.join(','));
// 1,2,4,8,16