var nums = [1, 2, 3];

// in order to chain you have to do something like ths
var sum = (function () {
    var pows = [];
    nums.forEach(function (n) {
        pows.push(Math.pow(2, n));
    });
    return pows;
}
    ()).reduce(function (acc, n) {
    return acc + n;
});

console.log(sum); // 14

// although that will work it is a little
// more complex than just using array map
var sum = nums.map(function (n) {
        return Math.pow(2, n)
    }).reduce(function (acc, n) {
        return acc + n;
    });

console.log(sum); // 14
