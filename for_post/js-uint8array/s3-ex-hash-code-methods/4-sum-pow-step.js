let sumCharCodes = (str) => {
    var n = 0,
    i = 0,
    len = str.length;
    while (i < len) {
        n += str[i].charCodeAt(0) * (i + 1);
        i += 1;
    }
    return n;
};

let createSumBytes = (str, byteCount) => {
    let uint8 = new Uint8Array(byteCount === undefined ? 4 : byteCount),
    sum = sumCharCodes(str),
    i = 0,
    a,
    b,
    len = uint8.length;
    while (i < len) {
        a = Math.floor(sum / Math.pow(128, i)) % 128;
        //b = str.charCodeAt(i)//0; //Math.floor(a * 2 * i);
        uint8[i] = a; // + b;
        i += 1;
    }
    return uint8;
};

let getHash = (str, byteCount) => {
    return [].map.call(createSumBytes(str, byteCount), (n) => {
        return n.toString(16);
    }).join('')
};

let a = getHash('ab', 4),
b = getHash('ba', 4);
console.log(a === b); // false
