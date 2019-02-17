let foo = function (a, b) {
    return a + b;
};

function bar(a, b) {
    return a + b;
};

let baz = (a, b) => a + b;

console.log( foo(1,1) ); // 2
console.log( bar(1,1) ); // 2
console.log( baz(1,1) ); // 2