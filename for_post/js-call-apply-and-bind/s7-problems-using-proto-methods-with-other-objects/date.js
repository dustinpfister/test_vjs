var d = new Date();
// no pubic or private keys with date objects!?
console.log(Object.keys(d)); // []
console.log(Object.getOwnPropertyNames(d)); // []
// so how to I even?
try {
    var obj = {};
    console.log(Date.prototype.getFullYear.call(obj));
} catch (e) {
    console.log(e.message); // this is not a Date object.
}
 
// guess I just have to fine other ways, which is what I should do anyway
 
// From Numbers
console.log(new Date(1234567890123)); // 2009-02-13T23:31:30.123Z
var y = 2021, m = 1, d = 3;
console.log(new Date(y, m - 1, d)); // 2021-01-03T05:00:00.000Z
