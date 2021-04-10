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
    var i = 0,
    len = array.length,
    el,
    n = 0;
    while (i < len) {
        el = array[i];
        if (el) {
            if (n === 0) {
                n = el;
            } else {
                if (n != el) {
                    return false;
                }
            }
        }
        i += 1;
    }
    return true;
};
