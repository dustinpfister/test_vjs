var n = 12345;

var a = parseInt(String(n).split('').map(function (n) {
        return Math.pow(2, n);
    }).join(''));

console.log(a); // 2481632
