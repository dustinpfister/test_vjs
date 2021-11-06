var nthRoot = function (n, degree) {
    return Math.pow(n, 1 / degree);
};

// get the base of a value if exp is known
var getBase = function (n, exp) {
    return nthRoot(n, exp);
};
// get exp of a value if the base is known
var getExp = function (n, base) {
    return Math.log(n) / Math.log(base);
};

// demos of getBase
console.log(getBase(Math.pow(7, 4), 4)); // 7
console.log(getBase(Math.pow(7, 5), 5)); // 7.000000000000001
console.log(getBase(Math.pow(7, 6), 6)); // 6.999999999999999

// demos of getExp
console.log(getExp(Math.pow(7, 4), 7)); // 7
console.log(getExp(Math.pow(7, 5), 7)); // 5.000000000000001
console.log(getExp(Math.pow(7, 6), 7)); // 6.000000000000001