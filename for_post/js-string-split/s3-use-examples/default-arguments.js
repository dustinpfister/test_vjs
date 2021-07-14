
var foo = function (a, b, c, d) {
    var defaults = '2,4,5,10'.split(','),
    i = 0,
    len = foo.length,
    ar = arguments;
    while (i < len) {
        ar[i] = ar[i] === undefined ? defaults[i] : ar[i];
        i += 1;
    }
    return Math.pow(ar[0], ar[1]) + ar[2] * ar[3];
};

console.log( foo() ); // 66
console.log(foo(3, 2, 1, 1)); // 10
