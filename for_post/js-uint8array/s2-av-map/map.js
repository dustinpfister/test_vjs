let byts = Uint8Array.of(128, 32, 220, 8);

let invert = byts.map((byt) => {
        return byt + 128;
    });

console.log(invert);
