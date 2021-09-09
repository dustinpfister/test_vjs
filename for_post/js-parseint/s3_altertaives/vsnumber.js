let str = '42.1234';
// number will parse to float if there
// is a fraction
console.log( Number(str) ); // 42.1234

// paser Int will not
console.log( parseInt(str) ); // 42

let str2 = '42abc';
// Number will result in NaN
// if there are non number chars
// in the end of a string
console.log( Number(str2) ); // NaN
// parseInt will not
console.log( parseInt(str2) ); // 42