let str = '7',
n = 7;
 
// so the ==  (equality) operator will preform type conversion
 console.log(n == str); // true
 
// however the === (identity) operator will not preform type conversion
console.log(n === str); // false
 
console.log(n === 7); // true
 
console.log(n === Number(str)); // true