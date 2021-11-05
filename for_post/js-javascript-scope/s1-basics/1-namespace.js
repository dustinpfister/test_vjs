var n = 13;
 
var foo = function () {
    var n = 42;
    return n;
};
 
console.log(n); // 13
console.log(foo()); // 42