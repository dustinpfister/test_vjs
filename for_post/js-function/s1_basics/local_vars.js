var func = function (x, y) {
    var a = x + y,
    b = Math.pow(x, y),
    c = Math.sqrt(a * b);
    return Math.round(c);
};

var d = func(2, 5);

console.log(d); // 15
try {
    console.log(x);
} catch (e) {
    console.log(e.message); // 'x is not defined'
}
