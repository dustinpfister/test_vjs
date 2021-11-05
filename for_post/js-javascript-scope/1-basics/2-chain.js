var n = 1;
var mod = (function () {
    var n = 2;
    var foo = function (a) {
        var n = 3;
        return n + a;
    };
    return function (b) {
        return foo(n + b);
    };
}
    ());
 
console.log(mod(n)); // 6
