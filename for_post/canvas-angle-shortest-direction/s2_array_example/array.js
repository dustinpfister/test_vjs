var findDir = (function () {
    var mod = function (x, m) {
        return (x % m + m) % m;
    };
    return function (indexMax, indexCurrent, indexTarget) {
        var z = indexCurrent - indexTarget,
        h = indexMax / 2;
        if (indexCurrent === indexTarget) {
            return 0;
        }
        if (mod(z + h, indexMax) - h < 0) {
            return 1;
        } else {
            return -1;
        }
    };
}());

var arr = [0, 1, 2, 3, 4],
len = arr.length;

console.log(findDir(len, 1, 4)); // -1
console.log(findDir(len, 4, 0)); // 1
console.log(findDir(len, 2, 2)); // 0
