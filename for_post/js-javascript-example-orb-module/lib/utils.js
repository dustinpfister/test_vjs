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
utils.GCDFromArray = function (arr) {
    var ai = 0,
    d,
    gd = 1,
    bi;
    while (ai < arr.length) {
        if (arr[ai] < 1) {
            ai += 1;
            continue;
        }
        bi = 0;
        while (bi < arr.length) {
            if (bi === ai || arr[bi] < 1) {
                bi += 1;
                continue;
            }
            d = utils.GCD(arr[ai], arr[bi]);
            if (arr[ai] === arr[bi]) {
                d = 1;
            }
            if (d > gd) {
                gd = d;
            }
            bi += 1;
        }
        ai += 1;
    }
    return gd;
};

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
