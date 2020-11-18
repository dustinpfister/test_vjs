let func1 = function (a, b) {
    if (arguments.length == 2) {
        return a + b;
    }
    return a;
};
console.log(func1(40,2)); // 42
console.log(func1(42)); // 42