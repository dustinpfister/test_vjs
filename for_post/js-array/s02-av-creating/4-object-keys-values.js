// the Object.keys method can be used to create an
// array of key names for a given object
var a = Object.keys({foo:1,'bar': 2});
console.log(a); // [ 'foo', 'bar' ]
// The Object.values method does the same as Object.keys
// only it will be an array of values rather than the key names
var b = Object.values({foo:1,'bar': 2});
console.log(b); // [ 1, 2 ]
