let foo = (bar) => {
    switch (bar) {
        case 'foo':
            return 'foobar';
        break;
        case 'answer':
            return 42;
        break;
    }
    return 'bar';
}
console.log(foo()); // 'bar'
console.log(foo('foo')); // 'foobar'
console.log(foo('answer')); // 42
