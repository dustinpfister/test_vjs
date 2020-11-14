// the Boolean Constructor
console.log( Boolean(0) ); // false
console.log( Boolean(1) ); // true
console.log( Boolean('') ); // false
console.log( Boolean('foo') ); // true
console.log( Boolean(null) ); // false
console.log( Boolean(undefined) ); // false
console.log( Boolean(NaN) ); // false

// Double Not (!!) should give the same result
console.log( !!0); // false
console.log( !!1 ); // true
console.log( !!'' ); // false
console.log( !!'foo' ); // true
console.log( !!null ); // false
console.log( !!undefined ); // false
console.log( !!NaN ); // false

// Single Not (!) will invert
console.log( !0); // true
console.log( !1 ); // false
console.log( !'' ); // true
console.log( !'foo' ); // false
console.log( !null ); // true
console.log( !undefined ); // true
console.log( !NaN ); // true