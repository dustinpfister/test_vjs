var sum = (function () {
    var result = [],
    len = 10,
    i = 0;
    while (i < len) {
        result.push(i);
        i += 1;
    }
    return result;
}
    ()).map(function (i) {
    return Math.pow(2, i);
}).reduce(function (acc, n) {
    return acc + n;
});
console.log(sum); // 1023
