let formatNumber = function (n) {
    let arr = String(n).split(''); ;
    return arr.join('');
};

console.log(formatNumber(1000.2));
