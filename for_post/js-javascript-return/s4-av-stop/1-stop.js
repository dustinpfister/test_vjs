var foo = function (a,b) {
    if (a === b) {
        return a;
    }
    return a + b;
};

console.log(foo(5,5)); // 5
console.log(foo(5,6)); // 11
