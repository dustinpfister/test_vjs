
// the value of number (a)
var a = 1000,
// The math log of (a) returns the power (p) 
// that will result in (a) when used with Math.pow where
// Math.E is the base
p = Math.log(a), 
b = Math.pow( Math.E, p);

console.log(a); // 1000
console.log(p); // 6.907755278982137
console.log(b); // 999.9999999999994
