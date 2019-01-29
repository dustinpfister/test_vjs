var foo = function () {
    return 'bar';
};

// function expressions are a kind of object
// and they can be used as such
foo.bar = function () {
    return 'foobar';
};

console.log(foo()); // bar
console.log(foo.bar()); // foobar
