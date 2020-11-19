// global variable
var global = 40;
(function (n) {
    // adding 2 to n will not effect global
    // because the value is a primitive which
    // is copied by value
    n += 2;
    console.log(n); // 42
    console.log(global); // 40
}
    (global));
