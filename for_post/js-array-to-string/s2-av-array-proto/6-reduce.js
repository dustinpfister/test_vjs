var a = [1, 2, 3, 4];
// reduce
var str = a.reduce(function (acc, n) {
    return acc + n + '-';
}, 'nums=');
console.log(str); // 'nums=1-2-3-4-'
