
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

let sum = sumCharCodes('So then this is some text that can add up to a large number, by just adding up the char codes.');

console.log(sum); // 8443

// can break it down into some values like this:
let a = Math.floor(sum / 256),
b = sum % 256,
c = a * 256 + b;
console.log(a); // 32
console.log(b); // 251
console.log(c); // 8443