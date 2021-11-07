// a global variable
var x = 0,
func = function () {
    // a local variable that makes
    // use of a global
    var y = Math.pow(2, x);
    console.log(x, y);
};
// loop
var loop = function () {
    if (x < 5) {
        setTimeout(loop, 100)
    }
    func();
    x += 1;
};
loop();
// 0 1
// 1 2
// 2 4
// 3 8
// 4 16
// 5 32