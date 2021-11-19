var foo = function (bar) {
    bar = bar === undefined ? 'foobar' : bar;
    return bar;
};

console.log( foo() ); // 'foobar'
console.log( foo(undefined) ); // 'foobar'
console.log( foo(null) ); // null