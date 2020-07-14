
var a = [1, 2, 3],
b = [4, 5, 6],
c = [];

[].push.apply(c, a);
[].push.apply(c, b);

console.log(a);
// [ 1, 2, 3 ]
console.log(b);
// [ 4, 5, 6 ]
console.log(c);
//[ 1, 2, 3, 4, 5, 6 ]
