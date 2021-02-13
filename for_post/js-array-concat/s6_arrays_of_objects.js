
var a = [{x:0, y: 42},{x:50, y: 30},{x:75, y: 7}];
var b = [{x:20, y: 40},{x:8, y: 89},{x:63, y: 4}];

var c = a.concat(b);

// Array.concat does not mutate in place and
// returns a new array
console.log(a.length, b.length, c.length);
// 3 3 6

// however the objects will still be references to the same
// objects in memory. Mutating the value of a property in an 
// object in one of the arrays will effect the same object in
// other arrays

c[0].x=99;
c[0].y=99;
console.log(a[0], c[0]);
// { x: 99, y: 99 } { x: 99, y: 99 }