var nums = [1, 2, 3];

var pows = [];
nums.forEach(function (n) {
    pows.push(Math.pow(2, n));
});

// also creates a new array of pows
console.log(pows); // [2,4,8]
// also does not mutate the source array
console.log(nums); // [1,2,3]
