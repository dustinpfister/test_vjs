const obj = {};

Object.defineProperty(obj, 'n', {
    value: 42,
    writable: false
});

obj.n = 40;
obj.a = 7;

console.log(obj.n); // 42
console.log(obj.a);
