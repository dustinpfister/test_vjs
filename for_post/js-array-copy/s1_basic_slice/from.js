
// Array.from is only good for making a shallow copy
var a = [{x:40},{x:50},{x:60}],
b = Array.from(a);
a[0].x = 0;
console.log(a);
// [ { x: 0 }, { x: 50 }, { x: 60 } ]
console.log(b);
// [ { x: 0 }, { x: 50 }, { x: 60 } ]