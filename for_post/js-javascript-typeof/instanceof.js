let d = new Date();

let Foo = function(){};
let f = new Foo();

console.log(typeof d); // object
console.log(typeof f); // object

console.log(d instanceof Date); // true
console.log(f instanceof Foo); // true
console.log(f instanceof Date); // false