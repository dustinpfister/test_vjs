// Object.assign  will work fine if making a shallow clone
let a = [1,2,3,4],
b = Object.assign([], a);

a[0] = 'a';
console.log(a);
// [ 'a', 2, 3, 4 ]
console.log(b);
// [ 1, 2, 3, 4 ]

// However Object.assign will not work well for making a deep clone
a = [{x:40},{x:50},{x:60}];
b = Object.assign([], a);
a[0].x = 0;
console.log(a);
// [ { x: 0 }, { x: 50 }, { x: 60 } ]
console.log(b);
// [ { x: 0 }, { x: 50 }, { x: 60 } ]