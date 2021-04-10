var utils = {};

utils.GCD = function (a, b) {
    if (!b) {
        return a;
    }
    return utils.GCD(b, a % b);
};

utils.GCDFromArray = function (points) {
    var ai = 0,
    d,
    gd = 1,
    bi;
    while (ai < points.length) {
        if (points[ai] < 1) {
            ai += 1;
            continue;
        }
        bi = 0;
        while (bi < points.length) {
            if (bi === ai || points[bi] < 1) {
                bi += 1;
                continue;
            }
            d = utils.GCD(points[ai], points[bi]);
            if (points[ai] === points[bi]) {
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

// are all non-zero elements in the ratio equal to each other?
utils.allNonZeroEqual = function (array) {
    var a = 0;
    return array.filter(function (num) {
        return num > 0;
    }).every(function (num) {
        if (a === 0) {
            a = num;
            return true;
        }
        return num === a;
    });
};

// get the simple ratio from a set of points (or simplify a ratio)
// [0,0,14,2] => [0,0,7,1]
utils.getSimpleRatio = function (points) {
    // make sure pure, dual, triple, and quad
    // work they way they should
    if (utils.allNonZeroEqual(points)) {
        return points.map(function (el) {
            return el === 0 ? 0 : 1;
        });
    }
    // if we get this far use utils.GDCFromArray
    var gcd = utils.GCDFromArray(points);
    // get simple ratio by diving all points by gd
    return points.map(function (pt, i) {
        return pt / gcd;
    });
};

console.log(utils.allNonZeroEqual([2, 0, 0, 0])); // true
console.log(utils.allNonZeroEqual([2, 2, 0, 0])); // true
console.log(utils.allNonZeroEqual([2, 2, 2, 0])); // true
console.log(utils.allNonZeroEqual([2, 2, 2, 2])); // true

console.log(utils.allNonZeroEqual([2, 0, 1, 0])); // false
