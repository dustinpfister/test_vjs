let str = "AAAA";

let counts = Uint8Array.of(0, 0);

let stepCountsForChar = (counts, ci, ch) => {
    var n = typeof ch === 'string' ? ch.charCodeAt(0) : ch;
    var c = counts[ci],
    d = c + n,
    e = 0;
    if (d > 255) {
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
    var e = stepCountsForChar(counts, 0, ch);
    i += 1;
}
console.log(counts)
