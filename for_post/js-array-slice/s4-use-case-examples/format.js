let formatNumber = function (n) {
    let arr = String(n).split('');
    let fract = arr.slice(-2).join('');
    return fract;
};

console.log(formatNumber(1000.25));
