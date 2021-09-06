let formatNumber = function (n) {
    let integer = Math.floor(n);
    let arr = String((n % 1).toFixed(2)).split('');
    let fract = arr;
    return fract;
};

console.log(formatNumber(1000.25));

console.log(formatNumber(1000.1));
