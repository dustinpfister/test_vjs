let formatCentValue = function (centValue) {
    var centsArray = String(centValue).split('').slice(-2);
    var dollars = String(Math.floor(centValue / 100));
    return dollars + '.' + centsArray.join('');
};

console.log(formatCentValue(100025)); // 1000.25
