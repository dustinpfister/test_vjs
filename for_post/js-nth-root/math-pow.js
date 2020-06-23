var nthRoot = function (n, degree) {
    return Math.pow(n, 1 / degree);
};

console.log(Math.sqrt(25)); // 5
console.log(nthRoot(25, 2)); // 5

var n = nthRoot(25, 3);
console.log(n); // 2.924017738212866
console.log(n * n * n); // 24.999999999999996
n = nthRoot(25, 4);
console.log(n); // 2.23606797749979
console.log(n * n * n * n); // 25.000000000000007
