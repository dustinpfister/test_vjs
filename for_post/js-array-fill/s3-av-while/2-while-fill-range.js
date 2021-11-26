// fill range method
var fillRange = function (arr, val, si, ei) {
    val = val === undefined ? 0 : val;
    si = si === undefined ? 0 : si;
    ei = ei === undefined ? arr.length : ei;
    var i = si;
    while (i < ei) {
        arr[i] = val;
        i += 1;
    }
    return arr;
};
// working okay
var a = [1, 7, 8, 8, 2, 3, 1];
fillRange(a, 'a', 1, 3);
console.log(a); // [ 1, 'a', 'a', 8, 2, 3, 1 ]