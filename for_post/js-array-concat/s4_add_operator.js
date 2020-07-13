
var a = [1, 2, 3],
b = [4, 5, 6],
c = a + b;

console.log(c, c.constructor.name);
// 1,2,34,5,6 String

var d = String(a + ',' + b).split(',');
console.log(d, d.constructor.name);
// [ '1', '2', '3', '4', '5', '6' ] 'Array'