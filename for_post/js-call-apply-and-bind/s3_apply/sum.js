// a sum methods that adds up all the arguments given
var sum = function () {
    return [].reduce.call(arguments, function (acc, n) {
        return acc + n;
    }, 0)
};
// using apply for this
var nums = [1, 2, 3, 4, 5];
console.log( sum.apply(null, nums) ); // 15