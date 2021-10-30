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

// can get a sum for some text
let sum = sumCharCodes('So then this is some text that can add up to a large number, by just adding up the char codes.');
console.log(sum); // 8443

// can break it down into some values like this:
let a = Math.floor(sum / 256),
b = sum % 256,
c = a * 256 + b;
console.log('\nBreak down values:');
console.log(a); // 32
console.log(b); // 251
console.log(c); // 8443

console.log('\nSome Additional values');
let forBytePow = (n, exp) => {
    return Math.log(n + 1) / Math.log( Math.pow(256, exp) );
};
console.log( forBytePow(sum, 1) );
console.log( forBytePow(sum, 2) );
console.log( forBytePow(sum, 3) );
console.log( forBytePow(sum, 4) );
console.log( forBytePow(sum, 5) );
