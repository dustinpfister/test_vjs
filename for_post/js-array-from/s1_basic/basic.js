
var arr = Array.from({
        0: 2,
        1: 4,
        2: 6,
        length: 3
    });

var str = arr.map(function (n) {
        return Math.pow(2, n);
    }).join(';');

console.log( str );
// 4;16;64
