
var obj = {
    a: 1,
    a1: 'foo',
    b: 2,
    b2: 'bar',
    c: 3,
    n: NaN
};

var sum = Object.values(obj).filter(function (el) {
        return typeof el === 'number' && String(el) != 'NaN';
    }).map(function (n) {
        return Math.pow(2, n);
    }).reduce(function (acc, n) {
        return acc + n
    });

console.log(sum); // 14
