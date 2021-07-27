var pow = function (x) {
    return Math.pow(2, x);
};
var x = 0,
len = 5,
results = [];
while (x < len) {
    results.push({
        x: x,
        y: pow(x)
    });
    x += 1;
}
console.log(JSON.stringify(results));
//[{"x":0,"y":1},{"x":1,"y":2},{"x":2,"y":4},{"x":3,"y":8},{"x":4,"y":16}]
