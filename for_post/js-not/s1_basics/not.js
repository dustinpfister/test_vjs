// The Boolean Constructor can be used
// to create A Boolean value from a value such
// as the number 0
console.log(Boolean(0)); // false

// The JS Not (!) operator can also be used to
// convert a number to a Boolean but it will also
// negate the truth value
let b = !0;
console.log(typeof b); // boolean
console.log(b); // true

// Double JS Not (!!) can fix this
let c = !!0;
console.log(typeof b); // boolean
console.log(b); // false
