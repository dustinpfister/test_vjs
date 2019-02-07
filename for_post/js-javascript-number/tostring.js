let n = 42;
 
console.log(typeof n); // number
 
console.log(typeof String(n)); // string
console.log(typeof (n + '')); // string
console.log(typeof n.toString(16)); // string

console.log( (42).toString(2) ); // '101010'