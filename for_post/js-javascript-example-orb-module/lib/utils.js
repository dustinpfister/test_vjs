var utils = {};

// Greatest Common Divisor
// https://en.wikipedia.org/wiki/Greatest_common_divisor
utils.GCD = function (a, b) {
    if (!b) {
        return a;
    }
    return utils.GCD(b, a % b);
};

// Greatest Common Divisor from array
// https://www.geeksforgeeks.org/gcd-two-array-numbers/
utils.GCDFromArray = function(arr, n){
    let result = arr[0];
    n = n === undefined ? arr.length: n;
    for (let i = 1; i < n; i++){
        result = utils.GCD(arr[i], result);
        if(result == 1){
            return 1;
        }
    }
    return result;
}

// Are all non-zero elements in the ratio equal to each other?
// utils.allNonZeroEqual([1,0,1,1]); // true
// utils.allNonZeroEqual([1,2,0,4]); // false
utils.allNonZeroEqual = function (array) {
    var a = 0;
    return array.every(function(num){
        if(num === 0){ // if 0 return true
            return true;
        }
        if (a === 0) { // if first non-zero value return true
            a = num;
            return true;
        }
        // if any additional non-zero value does not equal the 
        // first non zero value return false, else true
        return num === a;
    });
};

// get the simple ratio from a set of arr (or simplify a ratio)
// utils.getSimpleRatio([0,0,14,2]); // [0,0,7,1]
utils.getSimpleRatio = function (arr) {
    // make sure pure, dual, triple, and quad
    // work they way they should
    if (utils.allNonZeroEqual(arr)) {
        return arr.map(function (el) {
            return el === 0 ? 0 : 1;
        });
    }
    // if we get this far use utils.GDCFromArray
    var gcd = utils.GCDFromArray(arr);
    // get simple ratio by diving all arr by gd
    return arr.map(function (pt, i) {
        return pt / gcd;
    });
};

// is browser?
utils.isBrowser = (function(global){
    return function () {
        try {
            return global === window;
        } catch (e) {
            return false;
        }
    };
}(this));

// if nodejs, export utils
if (!utils.isBrowser()) {
    module.exports = utils;
}

