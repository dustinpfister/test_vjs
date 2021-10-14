console.log( Math.round(-0.5) ); // -0

console.log( Object.is(0, Math.round(-0.5)) ); // false
console.log( Object.is(0, -0) ); // false
console.log( 0 === -0 ); // true

