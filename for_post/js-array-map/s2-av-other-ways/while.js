var nums = [1, 2, 3];

var pows = [],
len = nums.length,
i = 0;
while (i < len) {
    pows.push(Math.pow(2, nums[i]));
    i += 1;
}

// also creates a new array of pows
console.log(pows); // [2,4,8]
// also does not mutate the source array
console.log(nums); // [1,2,3]
