// function expression AKA function literal
let foo = function (a, b) {
    return a + b;
};

// function statement AKA function declaration
function bar(a, b) {
    return a + b;
};

// Arrow Function
let baz = (a, b) => a + b;

// In many cases they all seem to work the same way.
console.log(foo(1, 1)); // 2
console.log(bar(1, 1)); // 2
console.log(baz(1, 1)); // 2
