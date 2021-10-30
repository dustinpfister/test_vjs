
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
    e = 0,
    oc = d / 255;

    //console.log('e: ' + e);
    //console.log('oc: ' + oc);
    if (d >= 256) {
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

let stringToCounts = (str) => {
    let counts = Uint8Array.of(0, 0, 0, 0, 0, 0);
    let ch,
    i = 0;
    while (ch = str[i]) {
        stepCountsForChar(counts, 0, ch);
        i += 1;
    }
    return counts;
};

let str = [9, 255].map((n) => {
    return String.fromCharCode(n);
}).join('');
console.log(stringToCounts(str));

console.log(stringToCounts('okay so then this might work okay, but I would still like to maybe make some tests. You see this thig should work when it comes to all possible values from 0 up to whatever the limit is, each return value should not match another. This is also somehting that shou,d work well with a fairly lengthy volume of text that might be up to and even beyond that of say five thousand words. I count just maybe keep adding additional bytes though, and that is one part of this that I think is workin gokay thus far. It is just that I should only have to do that when I really need to, and I will just need to look into this whole topic a whole lot more. I also can not help but think that there might be some kind of built in native method for this sort of thing, I am just not always sure where to go to look inot things like this more.'));
