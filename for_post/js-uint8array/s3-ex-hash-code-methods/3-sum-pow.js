// just sum all the char codes for a string
let sumCharCodes = (str) => {
    var n = 0,
    i = 0,
    len = str.length;
    while (i < len) {
        n += str[i].charCodeAt(0)
        i += 1;
    }
    return n;
};

let createSumBytes = (str, byteCount) => {
    let uint8 = new Uint8Array(byteCount === undefined ? 4 : byteCount),
    sum = sumCharCodes(str),
    i = 0,
    len = uint8.length;
    while (i < len) {
        uint8[i] = Math.floor(sum / Math.pow(256, i)) % 256;
        i += 1;
    }
    return uint8;
}

// can get a sum for some text
let bytes = createSumBytes('Hello World', 8);
console.log(bytes); // 8443
