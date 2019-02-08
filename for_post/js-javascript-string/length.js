let str = 'foobar';
 
console.log(str.length); // 6
 
let arr = str.split('');
 
console.log(arr.constructor.name); // Array
console.log(arr); // [ 'f', 'o', 'o', 'b', 'a', 'r' ]
console.log(arr.length); // 6
 
let str2 = arr.join('');
 
console.log(str2.constructor.name); // String
console.log(str2); // 'foobar'