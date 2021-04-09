
//var a = orbMod.create();
//console.log(a.points); // [1, 0, 0, 0]
//console.log(a.ratio); // [1, 0, 0, 0]
//console.log(a.type);

var b = orbMod.create({points:[0,0,2,2]})
console.log(b.points); // [1, 2, 0, 2]
console.log(b.ratio); // [1, 2, 0, 2]
console.log(b.type);

//var c = orbMod.fromOrbs([a, b]);
//console.log(c.points); // [2, 2, 0, 3]
//console.log(c.ratio); // [1, 0, 0, 0]
//console.log(c.type);