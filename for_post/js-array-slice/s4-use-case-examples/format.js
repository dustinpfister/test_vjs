let formatCentValue = function (centValue) {
    var centsArray = String(centValue).split('').slice(-2);
    var dollars = String(Math.floor(centValue / 100)).split('');
    var i = dollars.length - 3;
    if (i > 0) {
        while (i > 0) {
            dollars.splice(i, 0, ',');
            i -= 3;
        }
    }
    return dollars.join('') + '.' + centsArray.join('');
};

console.log(formatCentValue(100000025)); // 1,000,000.25
