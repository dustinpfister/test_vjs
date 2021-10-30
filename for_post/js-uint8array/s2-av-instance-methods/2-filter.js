let a = Uint8Array.of(128, 32, 220, 8);
let b = a.filter((byt) => {
        return byt >= 128;
    });
console.log(b.join('-')); // '128-220'

