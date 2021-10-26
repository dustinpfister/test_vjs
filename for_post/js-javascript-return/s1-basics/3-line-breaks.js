var foo = function (a, b, c) {
    return
    (a + b) * c;
};

console.log(foo(1, 2, 3)); // undefined

var baz = function (a, b, c) {
    return (a + b)
     * c;
};

console.log(baz(1, 2, 3)); // 9
