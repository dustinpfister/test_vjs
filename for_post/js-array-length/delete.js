// delete
let a = [1,2,3];

console.log(a.length); // 3

delete a[2];

console.log(a[2]); // undefined
console.log(a.length); // 3

// set undefined
let b = [1,2,3];

console.log(b.length); // 3

b[2] = undefined;

console.log(b[2]); // undefined
console.log(b.length); // 3

