// a string with many instances of 'foo'
let str = 'this string has a foo, as well as another foo, and yet another foo as well',

// two regex patterns one will match the first instance of 'foo'
// and another that will match all because of the 'g' flag
patt_foo = /foo/,
patt_foos = /foo/g,

// using string match to get results with 
// both patterns
oneFoo = str.match(patt_foo),
manyFoos = str.match(patt_foos);

// Both times String.match returns an Array
console.log(oneFoo.constructor.name); // 'Array';
console.log(manyFoos.constructor.name); // 'Array';

// but as expected the the /foo/ pattern just gets
// one instance while the /foo/g pattern gets them all
console.log(oneFoo.length); // 1
console.log(manyFoos.length); // 3

// the Array return by the String Match call that only gets
// one instance of the pattern has additional properties attached
// to it like index.
console.log(oneFoo.index); // 18
console.log(manyFoos.index); // undefined