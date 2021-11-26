// range method
var range = function (len, nStart, nDelta) {
    len = len || 0;
    nStart = nStart || 0;
    nDelta = nDelta === undefined ? 1 : nDelta;
    var arr = [],
    i = 0;
    while (i < len) {
        arr[i] = nStart + nDelta * i;
        i += 1;
    }
    return arr;
};
// demos
console.log( range(10) );       // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
console.log( range(10, -5));    // [ -5, -4, -3, -2, -1, 0, 1, 2, 3, 4 ]
console.log( range(10, 5, -1)); // [ 5, 4, 3, 2, 1, 0, -1, -2, -3, -4 ]