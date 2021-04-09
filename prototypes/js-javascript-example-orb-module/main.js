
var a = orbMod.create();
console.log(a.points); // [1, 0, 0, 0]

var b = orbMod.create({points:[1,2,0,3]})
console.log(b.points); // [1, 2, 0, 3]

var c = orbMod.fromOrbs([a, b]);
console.log(c.points); // [2, 2, 0, 3]