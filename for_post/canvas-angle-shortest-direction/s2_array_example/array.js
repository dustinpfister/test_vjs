var mod = function (x, m) {
    return (x % m + m) % m;
};

var findDir = function (arr, indexCurrent, indexTarget) {
    var z = indexCurrent - indexTarget,
    c = arr.length,
    h = c / 2;
    if (indexCurrent === indexTarget) {
        return 0;
    }
    if (mod(z + h, c) - h < 0) {
        return 1;
    } else {
        return -1;
    }
};

var arr = [0, 1, 2, 3, 4];

console.log(findDir(arr, 1, 4)); // -1
console.log(findDir(arr, 4, 0)); // 1
console.log(findDir(arr, 2, 2)); // 0
