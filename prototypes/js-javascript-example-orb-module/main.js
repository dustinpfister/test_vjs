
var a = orbMod.create();

console.log(a.points);

var b = orbMod.create({points:[1,2,0,0]})

console.log(b.points);

var c = orbMod.fromOrbs(orbMod.create(), [b, b]);

console.log(c.points);