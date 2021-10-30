let a = Uint8Array.of(128, 0, 255);
console.log(a.join()); // '128,220'
console.log(a.join('-')); // '128-220'
console.log(a.join('')); // '128220'

