var a = [255,25,257];

var buff = Uint8Array.from(a);

console.log(buff); // [255,25,1]
console.log(buff.length); // 3
console.log(buff.byteLength); // 3

var buff = Uint16Array.from(a);

console.log(buff); // [255,25,257]
console.log(buff.length); // 3
console.log(buff.byteLength); // 6