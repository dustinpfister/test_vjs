// Argument is a primitive
var global = 40;
(function (n) {
    // adding 2 to n WILL NOT effect global
    // because the value is a primitive which
    // is copied by value
    n += 2;
    console.log(n); // 42
    console.log(global); // 40
}
    (global));

// Argument is an Object
var global = {
    n: 40
};
(function (obj) {
    // adding 2 to obj.n WILL effect global.n
    // because the value is a object which
    // is copied by reference
    obj.n += 2;
    console.log(obj.n); // 42
    console.log(global.n); // 42
}
    (global));
