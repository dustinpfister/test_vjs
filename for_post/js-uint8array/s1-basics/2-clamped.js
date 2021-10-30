var clamped = new Uint8ClampedArray(3),
notClamped = new Uint8Array(3);
clamped[0] = 258;
notClamped[0] = 258;
console.log(clamped[0]); // 255
console.log(notClamped[0]); // 2