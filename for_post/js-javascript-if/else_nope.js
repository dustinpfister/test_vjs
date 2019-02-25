var isNeg = function (n) {
    // if type is number and less than zero
    if (typeof n === 'number' && n < 0) {
        // return true
        return true;
    }
    // if we get here return false
    return false;
};


console.log(isNeg(NaN)); // false
console.log(isNeg('foo')); // false
console.log(isNeg('-1')); // false
console.log(isNeg(42)); // false
console.log(isNeg(-1)); // true