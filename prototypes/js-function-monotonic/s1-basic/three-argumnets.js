var threeArguments = function (x, min, max) {
    return min + (max - min) * (1 - (1 / (1 + x)));
};
var monotonic = function (x) {
    var a = x % 4,
    b = Math.floor(x / 4) * 5,
    c = b + 5;

    console.log(a, b, c);

    return threeArguments(a, b, c);

};

var x = 0,
len = 12,
results = [];
while (x < len) {
    results.push({
        x: x,
        y: parseFloat(monotonic(x).toFixed(2))
    });
    x += 1;
}
console.log(results.map((obj) => {
        return obj.y
    }));
//console.log(JSON.stringify(results));
