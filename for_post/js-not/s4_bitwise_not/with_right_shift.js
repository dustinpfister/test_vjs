var n = 255,
a = (n).toString(2),
b = (~n >>> 0).toString(2),
c = (~n).toString(2);

console.log(a); // '11111111'
console.log(b); // 11111111111111111111111100000000
console.log(c); // -100000000