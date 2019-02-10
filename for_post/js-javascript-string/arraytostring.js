let arr =[1,2,3,4],
str = arr.join('');

console.log(str); // '1234';
console.log(typeof str); // string

let b = str.split('');

console.log(b); // [1,2,3,4]
console.log(b.constructor.name); // Array