var nthRoot = function (n, degree) {
    return Math.pow(n, 1 / degree);
};

var getRate = function (times, years) {
    return nthRoot(times, years);
};

var getMoney = function (startAmount, rate, years) {
    return startAmount * Math.pow(rate, years);
};

var doubleRate = getRate(2, 7);
console.log(doubleRate); // 1.1040895136738123

console.log(getMoney(100, 1, 7)); // 100
console.log(getMoney(100, doubleRate, 7)); // 199.99999999999986
console.log(getMoney(100, 2, 7)); // 12800
