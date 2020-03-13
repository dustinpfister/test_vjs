var mod = function (x, m) {
    return (x % m + m) % m;
};

var normalizeHalf = function (arr, index) {
    var c = arr.length,
    h = c / 2;
    return mod(index + h, c) - h;
};

var findDir = function (arr, indexCurrent, indexTarget) {
    var z = indexCurrent - indexTarget;
    if (indexCurrent === indexTarget) {
        return 0;
    }
    if (normalizeHalf(z) < 0) {
        return 1;
    } else {
        return -1;
    }
};

var arr = [0, 1, 2, 3, 4];

console.log( findDir(arr, 1, 4) ); // -1
console.log( findDir(arr, 4, 1) ); // 1
