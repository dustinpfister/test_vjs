// Array.from will work fine if making a shallow clone
var a = [1,2,3,4],
b = Array.from(a);

a[0] = 'a';
console.log(a);
// [ 'a', 2, 3, 4 ]
console.log(b);
// [ 1, 2, 3, 4 ]

// Array.from is only good for making a shallow copy
a = [{x:40},{x:50},{x:60}];
b = Array.from(a);
a[0].x = 0;
console.log(a);
// [ { x: 0 }, { x: 50 }, { x: 60 } ]
console.log(b);
// [ { x: 0 }, { x: 50 }, { x: 60 } ]