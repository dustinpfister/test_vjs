var obj = {
    foo: 'bar'
};

Object.defineProperty(obj, 'bar', {
    value: 'foobar',
    enumerable: true,
    configurable: false,
    writable: false
});

console.log(delete obj.foo); // true
console.log(delete obj.bar); // false

console.log(obj); // { bar: 'foobar' }
