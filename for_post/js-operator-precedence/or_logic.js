
// right to left Associativity
var a = 0,
b = 1,
c = 42,
d = a || b || c;

console.log(d); // 1

var e = 5 * 0 || 3,
f = 5 * (0 || 3);

console.log(e); // 3
console.log(f); // 15