
var str = '1-3-5-7-9';

powStr = str.match(/\d/g).map(function (n) {
        return Math.pow(n, 2)
    }).join(';');

console.log(powStr);
// 1;9;25;49;81
