var ref = {x:32,y:50},
// this makes a reference to the object,
// it does not copy it.
pt = ref;
// as such any change will effect the reference object
pt.x = 0;
console.log(ref.x); // 0;