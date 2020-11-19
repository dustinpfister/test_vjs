var n = (1 + (function () {
    var result = [],
    len = 10,
    i = 0;
    while (i < len) {
        result.push(Math.pow(2, i));
        i += 1;
    }
    return result.reduce(function (acc, n) {
        return acc + n;
    });
}
    ())) * 4;
console.log(n); // '4096'
