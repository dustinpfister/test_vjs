// range method
var filledRandom = function (len, min, max, roundFunc) {
    len = len || 0;
    min = min === undefined ? 0 : min;
    max = max === undefined ? 1 : max;
    roundFunc = roundFunc || Math.round;
    var arr = [],
    i = 0;
    while (i < len) {
        arr[i] = roundFunc(min + (max - min) * Math.random());
        i += 1;
    }
    return arr;
};
// examples
console.log( filledRandom(8) );        // [ 0, 0, 1, 0, 1, 0, 1, 0 ]
console.log( filledRandom(8, -5, 5) ); // [ 4, 1, -3, 2, 4, -4, 2, 4 ]
console.log( filledRandom(8, 0, 10, (n)=>{ return parseFloat(n.toFixed(2));}) );
// [ 6.8, 5.55, 8.1, 1.94, 5.62, 3.32, 4.67, 0.11 ]