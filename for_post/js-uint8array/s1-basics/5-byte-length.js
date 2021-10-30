// uinit8 and byteLength compared to length
var uint8 = Uint8Array.of(255, 128, 0, 128, 155);
console.log(uint8.length);     // 5
console.log(uint8.byteLength); // 5

// uint16 and byteLength compared to length
var uint16 = Uint16Array.of(255, 128, 0, 128, 155);
console.log(uint16.length);     // 5
console.log(uint16.byteLength); // 10