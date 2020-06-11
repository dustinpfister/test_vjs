let nums = [1, 2, 3],
pows = nums.map((n) => {
        return Math.pow(2, n);
    });

console.log(pows); // [2,4,8];
// does not mutate the source array
console.log(nums); // [1,2,3]
