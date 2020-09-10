// if a non number char is at the end of a string it will just
// be ignored
var str = '10!';
console.log( parseInt(str) ); // 10
console.log( parseInt(str, 16) ); // 16
// if a non number is at the start of a string though it will result in NaN
var str = '!10';
console.log( parseInt(str) ); // NaN
console.log( parseInt(str, 16) ); // NaN
