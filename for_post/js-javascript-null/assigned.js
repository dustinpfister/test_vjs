var a,
obj = {},
func = function () {};

console.log(a); // undefined
console.log(obj.foo); // undefined
console.log(func()); // undefined

var b = null,
obj2 = {
    foo: null
},
func2 = function () {
    return null;
};

console.log(b); // null
console.log(obj2.foo); // null
console.log(func2()); // null
