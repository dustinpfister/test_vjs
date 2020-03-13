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
}
    ());

// works with arrays
var arr = [0, 1, 2, 3, 4],
len = arr.length;
console.log(findDir(len, 1, 4)); // -1
console.log(findDir(len, 4, 0)); // 1
console.log(findDir(len, 2, 2)); // 0

// works with an object of index/degree/number values
var state = {
    iMax: 32,
    iCurrent: 16,
    iTarget: 3
};
console.log(findDir(state.iMax, state.iCurrent, state.iTarget)); // -1

// index/degree/number values that can be converted to radians
console.log( Math.PI * 2 / state.iMax * state.iCurrent ); // 3.14159...
