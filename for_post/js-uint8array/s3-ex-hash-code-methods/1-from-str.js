let str = [255, 250, 32, 255].map((n) => {
    return String.fromCharCode(n);
}).join('');
console.log(str);

let counts = Uint8Array.of(0, 0, 0);

/*
let stepCounts = (counts, n, ci) => {
    ci = ci === undefined ? 0 : ci;
    var c = counts[ci], // the current count
    s = c + n, // the sum of current count + n
    oc = Math.floor(s / 256), // over count
    r = s % 256; // remainder
    console.log(c, s, oc, r);
};
stepCounts([0], 255)
*/

let stepCountsForChar = (counts, ci, ch) => {
    var n = typeof ch === 'string' ? ch.charCodeAt(0) : ch;
    var c = counts[ci],
    d = c + n,
    e = 0;
    if (d > 256) {
        e = d % 255;
        counts[ci] = 0;
    } else {
        counts[ci] = d;
    }
    if (e > 0) {
        ci += 1;
        ci %= counts.length;
        stepCountsForChar(counts, ci, e);
    }
};

let ch, i = 0;
while (ch = str[i]) {
    stepCountsForChar(counts, 0, ch);
    i += 1;
}
console.log(counts)
