var nums = [1, 2, 3];

var pows = nums.map(function (n) {
        return Math.pow(2, n);
    });

// creates a new array of pows
console.log(pows); // [2,4,8]
// does not mutate the source array
console.log(nums); // [1,2,3]
