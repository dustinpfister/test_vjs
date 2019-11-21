// start out with a simple object
var obj = {x:32,y:50},
// this makes a reference to the object,
// it does not copy it.
pt = obj;
// as such any change will effect the reference object
// as it is just another reference to the same object
pt.x = 0;
console.log(obj.x); // 0;