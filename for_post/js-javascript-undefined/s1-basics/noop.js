var noop = function () {};

var foo = function () {
    return 'bar';
};

console.log(noop()); // undefined
console.log(foo()); // 'bar'
