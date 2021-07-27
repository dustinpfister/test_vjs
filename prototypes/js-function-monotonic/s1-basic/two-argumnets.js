var threeArguments = function (x, min, max) {
    return min + (1 - 1 / (1 + x)) * max;
};
var monotonic = function (x) {
    var a = x % 3,
    b = Math.floor(x / 3) / 3 * 5,
    c = b + 5;
    return threeArguments(a, b, c);

};

var x = 0,
len = 9,
results = [];
while (x < len) {
    results.push({
        x: x,
        y: parseFloat(monotonic(x).toFixed(2))
    });
    x += 1;
}
console.log(JSON.stringify(results));
