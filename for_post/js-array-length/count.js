var a = [1,2,3];
a[-1] = 0;
a['foo'] = 'bar';
a[10] = 'baz';
 
// length is just one more that the highest
// index value
console.log(a.length); // 11
 
// get the actual count of elements
console.log(Object.keys(a).length); // 6
console.log(Object.values(a).length); // 6
 
// get a count of all keys, even the length property
console.log(Object.getOwnPropertyNames(a).length); // 7